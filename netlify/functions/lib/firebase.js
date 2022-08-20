/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require('firebase-admin')

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}

const app = !admin.apps.length
  ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  : admin.app()

exports.getDocument = async (collectionName, id) => {
  const firestore = app.firestore()
  const ref = firestore.collection(collectionName).doc(id)
  const doc = await ref.get()

  return doc.exists ? { id: doc.id, ...doc.data() } : null
}

exports.updateDocument = async (collectionName, id, data) => {
  const firestore = app.firestore()
  const ref = firestore.collection(collectionName).doc(id)

  await ref.update(data)
}
