const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const ANDMETE_FAIL = path.join(__dirname, 'mangijad.json');

// Loo andmefail, kui seda pole
if (!fs.existsSync(ANDMETE_FAIL)) fs.writeFileSync(ANDMETE_FAIL, JSON.stringify({}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Sisselogimine ja andmete laadimine
app.post('/api/logi-sisse', (req, res) => {
    const { nimi } = req.body;
    const andmed = JSON.parse(fs.readFileSync(ANDMETE_FAIL));
    if (!andmed[nimi]) {
        andmed[nimi] = { tase: 1, parimSkoor: 0 };
        fs.writeFileSync(ANDMETE_FAIL, JSON.stringify(andmed, null, 2));
    }
    res.json({ nimi, ...andmed[nimi] });
});

// Progressi salvestamine
app.post('/api/salvesta', (req, res) => {
    const { nimi, tase, skoor } = req.body;
    const andmed = JSON.parse(fs.readFileSync(ANDMETE_FAIL));
    if (andmed[nimi]) {
        andmed[nimi].tase = tase;
        if (skoor > andmed[nimi].parimSkoor) andmed[nimi].parimSkoor = skoor;
        fs.writeFileSync(ANDMETE_FAIL, JSON.stringify(andmed, null, 2));
        res.json({ edu: true });
    } else {
        res.status(404).send('Viga');
    }
});

// Edetabeli väljastamine
app.get('/api/edetabel', (req, res) => {
    const andmed = JSON.parse(fs.readFileSync(ANDMETE_FAIL));
    const sorteeritud = Object.entries(andmed)
        .map(([nimi, stats]) => ({ nimi, skoor: stats.parimSkoor }))
        .sort((a, b) => b.skoor - a.skoor).slice(0, 5);
    res.json(sorteeritud);
});

app.listen(3000, () => console.log('Server käivitati: http://localhost:3000'));