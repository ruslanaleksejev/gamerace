1. Kuidas see mängijale paistab? (Klient)
Mängija avab veebilehe, sisestab oma nime ja alustab sõitu.

Liikumine: Sa juhid tegelast (alguses on see kont 🦴, hiljem auto 🚗 või rakett 🚀), kes liigub mööda teed. Pead vajutama üles-alla nooli, et mitte sõita vastu takistusi.

Ajarännak: Mida kauem sa sõidad, seda kõrgemaks muutub sinu tase. Mäng muudab maailma: Kiviaeg asendub Vana-Egiptusega, siis tuleb Keskaeg ja lõpuks Tulevik. Iga ajastuga läheb mängu kiirus suuremaks.

2. Kuidas see "kapoti all" töötab? (Kood)
Projekt koosneb kahest osast, mis omavahel pidevalt "suhtlevad":

Frontend (Brauser): Siin jookseb JavaScripti kood. See joonistab ekraanile kõike, mida sa näed (60 korda sekundis nagu multifilmi). See kontrollib ka, kas sa põrkasid kokku kaktuse või robotiga, ning loeb punkte.

Backend (Server): See on programm (Node.js), mis jookseb arvutis (serveris). Selle peamine ülesanne on mälu. Kui sa sisestad nime või teed uue rekordi, saadab brauser need andmed serverile.

3. Kus andmeid hoitakse?
Keerulise andmebaasi asemel kasutab projekt lihtsat tekstifaili (mangijad.json).

Kui sa mängu sisse logid, vaatab server sellesse faili, leiab sinu nime ja ütleb brauserile: "See mängija on 3. tasemel ja tema rekord on 5000 punkti".

Kui mäng läbi saab, kirjutab server sinu uue tulemuse sinna faili tagasi.
