# Mahkeme Gecesi

Arkadaslarla eglence icin yapilan mini mahkeme oyunu.

## Ozellikler
- Baslangic menusu
- Ses ac/kapat
- Oyuncular icin otomatik rol dagitimi
- Herkesin suc yazdigi dava havuzu
- Rastgele dava secimi
- Itiraz Et / Karari Destekle butonlari
- Karar aciklama metni
- Tur yenileme ve oyun bitirme

## Lokal Calistirma
```bash
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
python app.py
```

Tarayicida: http://127.0.0.1:5000

## Railway Deploy
1. Bu `mahkeme-oyunu` klasorunu yeni bir GitHub reposuna koy.
2. Railway'de **New Project -> Deploy from GitHub Repo** sec.
3. Repo secildiginde Railway otomatik `requirements.txt` yukler.
4. Start command olarak `gunicorn app:app` calisir (Procfile sayesinde).
5. Deploy bitince verilen URL ile oyunu ac.

Not: Port ayari Railway tarafindan `PORT` env ile otomatik verilir.
