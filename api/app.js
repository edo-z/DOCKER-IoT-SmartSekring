const mqtt = require('mqtt');
const mysql = require('mysql2');

// Koneksi ke database MySQL (gunakan nama service "mysql")
const db = mysql.createConnection({
  host: 'mysql',
  user: 'espuser',
  password: 'esppass',
  database: 'espdata'
});

// Koneksi ke MQTT (gunakan nama service "mosquitto")
const client = mqtt.connect('mqtt://mosquitto:1883');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('esp/data');
});

client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const { tegangan, arus, daya, kwh, biaya } = data;

    db.query('INSERT INTO monitoring (tegangan, arus, daya, kwh, biaya) VALUES (?, ?, ?, ?, ?)',
      [tegangan, arus, daya, kwh, biaya],
      (err) => {
        if (err) {
          console.error('DB Insert Error:', err);
        } else {
          console.log('Data berhasil disimpan:', data);
        }
      });
  } catch (e) {
    console.error('Parsing/Insert Error:', e);
  }
});

