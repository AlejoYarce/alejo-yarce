#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <Update.h>

//////////////////////// LIBS
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include "esp_adc_cal.h"
//////////////////////// LIBS

const char* host = "esp32";

//////////////////////// CODE
//#define SSID "XXXXX"
//#define PASS "XXXXX"
HTTPClient http;

float output_value;
int flechas_moisture_in = 34;
int flechas_moisture_on = 5;
int flechas_water_on = 13;

int temp_in = 35;
int temp_raw = 0;
float temp_voltage = 0;
float temp_c = 0;

int ldr_in = 32;
int ldr_val = 32;

String ip = "";
String query = "";
//////////////////////// CODE

WebServer server(80);

/* Login page */
const char* loginIndex = 
 "<form name='loginForm'>"
    "<table width='20%' bgcolor='A09F9F' align='center'>"
        "<tr>"
            "<td colspan=2>"
                "<center><font size=4><b>ESP32 Login Page</b></font></center>"
                "<br>"
            "</td>"
            "<br>"
            "<br>"
        "</tr>"
        "<td>Username:</td>"
        "<td><input type='text' size=25 name='userid'><br></td>"
        "</tr>"
        "<br>"
        "<br>"
        "<tr>"
            "<td>Password:</td>"
            "<td><input type='Password' size=25 name='pwd'><br></td>"
            "<br>"
            "<br>"
        "</tr>"
        "<tr>"
            "<td><input type='submit' onclick='check(this.form)' value='Login'></td>"
        "</tr>"
    "</table>"
"</form>"
"<script>"
    "function check(form)"
    "{"
    "if(form.userid.value=='admin' && form.pwd.value=='admin')"
    "{"
    "window.open('/serverIndex')"
    "}"
    "else"
    "{"
    " alert('Error Password or Username')/*displays error message*/"
    "}"
    "}"
"</script>";
 
/* Server Index Page */
const char* serverIndex = 
"<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>"
"<form method='POST' action='#' enctype='multipart/form-data' id='upload_form'>"
   "<input type='file' name='update'>"
        "<input type='submit' value='Update'>"
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
 "</script>";

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
  /*return index page which is stored in serverIndex */
  server.on("/", HTTP_GET, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", loginIndex);
  });
  server.on("/serverIndex", HTTP_GET, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/html", serverIndex);
  });
  /*handling uploading firmware file */
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
      /* flashing firmware to ESP*/
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
  pinMode(2, OUTPUT);
  pinMode(flechas_moisture_in, INPUT);
  pinMode(flechas_moisture_on, OUTPUT);
  pinMode(flechas_water_on, OUTPUT);

  digitalWrite(flechas_moisture_on, LOW);
  digitalWrite(flechas_water_on, LOW);

  confirmationLigth();
  //////////////////////// CODE
}

void loop() {
  server.handleClient();
  delay(1);

  //////////////////////// CODE
  getTemp();
  getLDR();
//  getGardenMoisture();
//  validateWatering();

    Serial.print("ip -- ");
    Serial.println(ip);
    Serial.print("query -- ");
    Serial.println(query);

  publishData();
  delay(60000 * 20);


  digitalWrite(2, HIGH);
  digitalWrite(flechas_water_on, HIGH);
  delay(3000);
  digitalWrite(flechas_water_on, LOW);
  digitalWrite(2, LOW);

  query = "";
  //////////////////////// CODE
}

//////////////////////// CODE
void confirmationLigth() {
  digitalWrite(2, HIGH);
  delay(100);
  digitalWrite(2, LOW);
  delay(100);
  digitalWrite(2, HIGH);
  delay(100);
  digitalWrite(2, LOW);
  delay(100);
}

void getTemp() {
  temp_raw = analogRead(temp_in);
  temp_voltage = (temp_raw / 2048.0) * 3300; // 5000 to get millivots
  temp_c = temp_voltage * 0.1;

  query += "temp=";
  query += temp_c;
}

void getLDR() {
  ldr_val = analogRead(ldr_in);
  ldr_val = map(ldr_val,0,4095,0,100);

  query += "&daylight=";
  query += ldr_val;
}

void getGardenMoisture() {
  digitalWrite(flechas_moisture_on, HIGH);
  delay(500);

  output_value = analogRead(flechas_moisture_in);
  query += "&output_value=";
  query += output_value;

  output_value= map(output_value,4095,1400,0,100);
  query += "&output_value_2=";
  query += output_value;

  digitalWrite(flechas_moisture_on, LOW);
}

void validateWatering() {
  output_value = analogRead(flechas_moisture_in);
  boolean waterOn = false;

  if (output_value >= 2500) {
    digitalWrite(flechas_water_on, HIGH);
    delay(5000);
    digitalWrite(flechas_water_on, LOW);

    waterOn = true;
  }

  query += "&water_on=";
  query += waterOn;
}

void publishData() {
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(2, HIGH);
    http.begin("https://alejoyarce.com/api/set-now");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    query += "&ip=";
    query += ip;

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
    }

    http.end();
    digitalWrite(2, LOW);
  } else {
    Serial.println("Error in WiFi connection");
  }
}
//////////////////////// CODE
