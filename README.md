
# 📡 IoT Power Monitoring Dashboard

Sistem monitoring daya listrik **berbasis ESP8266**, **MQTT**, dan **dashboard web responsif** menggunakan **Chart.js**, **Node.js**, dan **MySQL**. Data realtime dari sensor arus (ACS712) dan tegangan (ZMPT101B) dikirim via MQTT ke server dan divisualisasikan dalam bentuk grafik & tabel historis.

---

## 🚀 Fitur Utama

- 📶 Realtime Monitoring (tegangan, arus, daya, energi, biaya)
- 📊 Grafik Dinamis dengan Chart.js
- 💾 Dashboard Historis + Export CSV/PDF
- 🔥 MQTT (via Mosquitto) sebagai perantara data dari ESP8266
- 🌐 API REST untuk integrasi data & frontend
- ⚙️ Docker: Semua layanan (web, API, DB, MQTT) dalam 1 stack

---

## 📁 Struktur Folder

```
📦 xampp-docker/
├── web/            # Frontend Chart.js + EJS
├── api/            # Backend Express API + CSV Export
├── mosquitto/      # MQTT broker config (optional)
├── db/             # MySQL volume
├── docker-compose.yml
```

---

## 📌 Endpoint API

| Endpoint         | Method | Deskripsi                     |
|------------------|--------|-------------------------------|
| `/api/data`      | GET    | Ambil semua data monitoring   |
| `/api/clear`     | POST   | Hapus semua data              |
| `/api/export`    | GET    | Export data dalam format CSV  |

---

## 📦 Cara Deploy (Docker)

```bash
git clone https://github.com/edoz/iot-mqtt-dashboard.git
cd iot-mqtt-dashboard
docker-compose up -d
```

Akses:
- 🌍 Dashboard Web: http://localhost:3000
- 🧠 phpMyAdmin: http://localhost:8080
- 🔄 MQTT Broker: localhost:1883

---

## 🧪 Tes MQTT (Local Broker)

```bash
mosquitto_pub -h localhost -t sensor/data -m '{"v": 220, "i": 0.5}'
```

---

## 🧠 Teknologi

- ESP8266 + Arduino
- MQTT (Mosquitto)
- Node.js + Express
- Chart.js + EJS
- MySQL + phpMyAdmin
- Docker + Docker Compose

---

## 🛠️ GitHub Actions (CI/CD)

Tambahkan file: `.github/workflows/deploy.yml`

```yaml
name: Deploy IoT Dashboard

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker Image
        run: docker-compose build
```

---

## 🏷️ Badges

![GitHub last commit](https://img.shields.io/github/last-commit/edoz/iot-mqtt-dashboard)
![GitHub repo size](https://img.shields.io/github/repo-size/edoz/iot-mqtt-dashboard)
![Docker](https://img.shields.io/badge/docker-ready-blue)

---

## 📌 Lisensi

MIT License © Edo Z
