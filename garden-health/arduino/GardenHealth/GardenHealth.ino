//////////////////////// LIBS
#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <Update.h>

#include <HTTPClient.h>
#include "esp_adc_cal.h"
//////////////////////// LIBS

//////////////////////// CODE
//#define SSID "XXXXX"
//#define PASS "XXXXX"

HTTPClient http;
const char* host = "esp32";
WebServer server(80);

float plantValue;
int lirio_moisture_in = 34;
int lirio_moisture_on = 13;
int lirio_water_on = 12;

int temp_in = 35;
int temp_raw = 0;
float temp_voltage = 0;
float temp_c = 0;

// int ldr_in = 32;
// int ldr_val = 32;

String ip = "";
String query = "";
unsigned long previousMillis = 0;
int attempts = 1;

//////////////////////// CODE
String SendHTML(bool showData) {
  String ptr = "<!DOCTYPE html> <html>\n";
  ptr += "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n";
  ptr += "<title>Garden Data</title>\n";
  ptr += "<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}\n";
  ptr += "body{margin-top: 50px;} h1 {color: #444444;margin: 50px auto 30px;} h3 {color: #444444;margin-bottom: 50px;}\n";
  ptr += ".button {display: block;width: 130px;background-color: #3498db;border: none;color: white;padding: 13px 30px;text-decoration: none;font-size: 25px;margin: 0px auto 20px;cursor: pointer;border-radius: 4px;}\n";
  ptr += ".button-on {background-color: #3498db;}\n";
  ptr += ".button-on:active {background-color: #2980b9;}\n";
  ptr += ".button-off {background-color: #34495e;}\n";
  ptr += ".button-off:active {background-color: #2c3e50;}\n";
  ptr += "p {font-size: 14px;color: #888;margin-bottom: 10px;}\n";
  ptr += "</style>\n";
  ptr += "</head>\n";
  ptr += "<body>\n";

  ptr += "<h1>Garden Data</h1>\n";

  if (showData) {
    ptr += "<a class=\"button button-off\" href=\"/\">HOME</a>\n";
    float moisture = getGardenMoisture("lirio");
    ptr += "<p>Lirio: ";
    ptr += moisture;
    ptr += "</p>\n";
  } else {
    ptr += "<a class=\"button button-on\" href=\"/data\">GET DATA</a>\n";
  }

  ptr += "</body>\n";
  ptr += "</html>\n";
  return ptr;
}


/* OTA Page */
const char* ota =
  "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>"
  "<form method='POST' action='#' enctype='multipart/form-data' id='upload_form'>"
  "<input type='file' name='update'>"
  "<input type='submit' value='Update' class=\"button button-on\">"
  "</form>"
  "<div id='prg'>progress: 0%</div>"
  "<script>"
  "$('form').submit(function(e){"
  "e.preventDefault();"
  "var form = $('#upload_form')[0];"
  "var data = new FormData(form);"
  " $.ajax({"
  "url: '/update',"
  "type: 'POST',"
  "data: data,"
  "contentType: false,"
  "processData:false,"
  "xhr: function() {"
  "var xhr = new window.XMLHttpRequest();"
  "xhr.upload.addEventListener('progress', function(evt) {"
  "if (evt.lengthComputable) {"
  "var per = evt.loaded / evt.total;"
  "$('#prg').html('progress: ' + Math.round(per*100) + '%');"
  "}"
  "}, false);"
  "return xhr;"
  "},"
  "success:function(d, s) {"
  "console.log('success!')"
  "},"
  "error: function (a, b, c) {"
  "}"
  "});"
  "});"
  "</script>"
  "<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}"
  "body{margin-top: 50px;color: #444444;}"
  ".button {display: block;width: 130px;background-color: #3498db;border: none;color: white;padding: 13px 30px;text-decoration: none;font-size: 25px;margin: 20px auto;cursor: pointer;border-radius: 4px;}"
  ".button-on {background-color: #3498db;}"
  ".button-on:active {background-color: #2980b9;}"
  "p {font-size: 14px;color: #888;margin-bottom: 10px;}"
  "</style>";

void setup() {
  Serial.begin(115200);

  // Connect to WiFi network
  WiFi.begin(SSID, PASS);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting...");
  }

  ip = WiFi.localIP().toString();
  Serial.print("Connected - ");
  Serial.println(WiFi.localIP());
  // Connect to WiFi network

  /*use mdns for host name resolution*/
  if (!MDNS.begin(host)) { //http://esp32.local
    Serial.println("Error setting up MDNS responder!");
    while (1) {
      delay(1000);
    }
  }
  Serial.println("mDNS responder started");

  server.on("/", HTTP_GET, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", SendHTML(false));
  });
  server.on("/data", HTTP_GET, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", SendHTML(true));
  });
  server.on("/ota", HTTP_GET, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", ota);
  });
  server.on("/update", HTTP_POST, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/plain", (Update.hasError()) ? "FAIL" : "OK");
    ESP.restart();
  }, []() {
    HTTPUpload& upload = server.upload();
    if (upload.status == UPLOAD_FILE_START) {
      Serial.printf("Update: %s\n", upload.filename.c_str());
      if (!Update.begin(UPDATE_SIZE_UNKNOWN)) { //start with max available size
        Update.printError(Serial);
      }
    } else if (upload.status == UPLOAD_FILE_WRITE) {
      if (Update.write(upload.buf, upload.currentSize) != upload.currentSize) {
        Update.printError(Serial);
      }
    } else if (upload.status == UPLOAD_FILE_END) {
      if (Update.end(true)) { //true to set the size to the current progress
        Serial.printf("Update Success: %u\nRebooting...\n", upload.totalSize);
      } else {
        Update.printError(Serial);
      }
    }
  });

  server.begin();

  //////////////////////// CODE
  pinMode(LED_BUILTIN, OUTPUT); // 2
  pinMode(lirio_moisture_in, INPUT);
  pinMode(lirio_moisture_on, OUTPUT);
  pinMode(lirio_water_on, OUTPUT);

  digitalWrite(lirio_moisture_on, LOW);
  digitalWrite(lirio_water_on, LOW);

  confirmationLigth();
  //////////////////////// CODE
}

void loop() {
  server.handleClient();
  delay(1);

  //////////////////////// CODE
  unsigned long currentMillis = millis();
  if ((unsigned long)(currentMillis - previousMillis) >= (60000 * 30)) {
    query = "{";

    // getTemp();
    // getLDR();
    getGardenMoisture("lirio");
    query += ", ";

    // validateWatering();
    // digitalWrite(LED_BUILTIN, outputState)

    previousMillis = currentMillis;
    publishData();

    query = "";
  }
  //////////////////////// CODE
}

//////////////////////// CODE
void confirmationLigth() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(100);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(100);
}

void getTemp() {
  temp_raw = analogRead(temp_in);
  temp_voltage = (temp_raw / 2048.0) * 3300; // 5000 to get millivots
  temp_c = temp_voltage * 0.1;

  query += "temp=";
  query += temp_c;
}

//void getLDR() {
//  ldr_val = analogRead(ldr_in);
//  ldr_val = map(ldr_val, 0, 4095, 0, 100);
//
//  query += "&daylight=";
//  query += ldr_val;
//}

float getGardenMoisture(String plantName) {
  digitalWrite(LED_BUILTIN, HIGH);
  digitalWrite(lirio_moisture_on, HIGH);
  delay(500);

  plantValue = analogRead(lirio_moisture_in);
  query += "\"lirio_analog_value\": ";
  query += "\"";
  query += plantValue;
  query += "\",";

  plantValue = map(plantValue, 4095, 1400, 0, 100);
  query += "\"plantName\": ";
  query += "\"";
  query += plantName;
  query += "\",";
  query += "\"plantValue\": ";
  query += "\"";
  query += plantValue;
  query += "\"";

  Serial.print("query -- ");
  Serial.println(query);

  digitalWrite(lirio_moisture_on, LOW);
  digitalWrite(LED_BUILTIN, LOW);

  return plantValue;
}

void validateWatering() {
  plantValue = analogRead(lirio_moisture_in);
  boolean waterOn = false;

  if (plantValue >= 2500) {
    digitalWrite(lirio_water_on, HIGH);
    delay(5000);
    digitalWrite(lirio_water_on, LOW);

    waterOn = true;
  }

  query += "&water_on=";
  query += waterOn;
}

void publishData() {
  if (WiFi.status() == WL_CONNECTED) {
    bool error = false;

    digitalWrite(2, HIGH);
    String server = "https://alejoyarce.com/api/set-now";
    http.begin(server);
    http.addHeader("Content-Type", "application/json");

    query += "\"ip\": \"";
    query += ip;
    query += "\" }";

    Serial.print("query -- ");
    Serial.println(query);

    int httpResponseCode = http.POST(query);
    if (httpResponseCode > 0) {
      String response = http.getString();

      Serial.print(httpResponseCode);
      Serial.print(" - ");
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
      error = true;
    }

    http.end();
    digitalWrite(2, LOW);

    if (error == true && attempts < 3) {
      attempts = attempts + 1;
      publishData();
    } else {
      attempts = 0;
    }
  } else {
    Serial.println("Error in WiFi connection");
  }
}
//////////////////////// CODE
