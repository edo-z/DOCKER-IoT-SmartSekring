const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const { Parser } = require('json2csv');

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Koneksi database
const db = mysql.createConnection({
  host: 'mysql',
  user: 'espuser',
  password: 'esppass',
  database: 'espdata'
});

// Halaman utama
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/export', (req, res) => {
  const query = `
    SELECT waktu, tegangan, arus, daya, kwh, biaya
    FROM monitoring
    ORDER BY waktu DESC
    LIMIT 500
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Gagal ambil data');

    const fields = ['waktu', 'tegangan', 'arus', 'daya', 'kwh', 'biaya'];
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(results);

    res.header('Content-Type', 'text/csv');
    res.attachment(`laporan_${Date.now()}.csv`);
    res.send(csv);
  });
});

app.get('/laporan', (req, res) => {
  const query = `
    SELECT DATE_FORMAT(waktu, '%Y-%m') AS bulan,
           COUNT(*) AS jumlah_data,
           ROUND(SUM(daya), 2) AS total_daya,
           ROUND(SUM(kwh), 4) AS total_kwh,
           ROUND(SUM(biaya), 2) AS total_biaya
    FROM monitoring
    GROUP BY bulan
    ORDER BY bulan DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Gagal ambil laporan");
    res.render('laporan', { data: results });
  });
});

app.post('/api/clear', (req, res) => {
  db.query('TRUNCATE TABLE monitoring', (err) => {
    if (err) return res.status(500).send("Gagal hapus data");
    // res.send("Data berhasil dihapus");
  });
});


// API GET data dengan filter tanggal
app.get('/api/data', (req, res) => {
  let { start, end } = req.query;

  // Default: 1 hari terakhir
  if (!start || !end) {
    end = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    start = yesterday.toISOString().split('T')[0];
  }

  db.query(
    `SELECT waktu, tegangan, arus, daya, kwh, biaya 
     FROM monitoring 
     WHERE DATE(waktu) BETWEEN ? AND ? 
     ORDER BY waktu DESC LIMIT 20`,
    [start, end],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});
app.listen(port, () => console.log(`Dashboard: http://localhost:${port}`));

