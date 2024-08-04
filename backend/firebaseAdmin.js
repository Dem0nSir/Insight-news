const admin = require('firebase-admin');
const firebaseConfig = require('../services/firebase');

admin.initializeApp({
  credential: admin.credential.cert(require('./insightFirebase.json')),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
});

module.exports = admin;