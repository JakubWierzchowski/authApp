# Używamy obrazu bazowego Node.js
FROM node:16-alpine

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę kodu aplikacji
COPY . .

# Eksponujemy port (jeśli Express działa na porcie 3000)
EXPOSE 3000

# Komenda uruchamiająca aplikację
CMD ["npm", "start"]
