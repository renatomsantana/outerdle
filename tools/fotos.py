#!/usr/bin/env python3
"""Gera os níveis de borrão do modo Foto.

Entrada:  src/fotos/<id>.jpg|png   (id = mesmo id do local em src/dados.js; não vai pro site)
Saída:    assets/fotos/<hash>/0.jpg ... 5.jpg   (0 = mais borrada, 5 = nítida)

O nome da pasta é um hash do id, então o caminho da imagem não entrega a resposta.
Depois rode: node tools/build.js  (ele marca os locais que têm foto).
"""
import hashlib, os, sys
from PIL import Image, ImageFilter

ROOT = os.path.join(os.path.dirname(__file__), "..")
SRC = os.path.join(ROOT, "src", "fotos")
OUT = os.path.join(ROOT, "assets", "fotos")
KEY = "vinte-e-dois-minutos-ate-a-supernova"   # mesma chave de tools/build.js
RAIOS = [40, 26, 16, 9, 4, 0]                    # borrão por nível
LARGURA = 960

def hash_id(id_):
    return hashlib.sha1((id_ + KEY).encode("utf-8")).hexdigest()[:12]

def gerar(caminho):
    id_ = os.path.splitext(os.path.basename(caminho))[0]
    pasta = os.path.join(OUT, hash_id(id_))
    os.makedirs(pasta, exist_ok=True)
    img = Image.open(caminho).convert("RGB")
    if img.width > LARGURA:
        img = img.resize((LARGURA, round(img.height * LARGURA / img.width)), Image.LANCZOS)
    for nivel, raio in enumerate(RAIOS):
        saida = img.filter(ImageFilter.GaussianBlur(raio)) if raio else img
        saida.save(os.path.join(pasta, f"{nivel}.jpg"), "JPEG", quality=78, optimize=True)
    return id_

if __name__ == "__main__":
    if not os.path.isdir(SRC):
        print("Crie src/fotos/ e coloque as imagens como <id>.jpg"); sys.exit(1)
    feitos = [gerar(os.path.join(SRC, f)) for f in sorted(os.listdir(SRC)) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
    print(f"{len(feitos)} foto(s): {', '.join(feitos)}")
