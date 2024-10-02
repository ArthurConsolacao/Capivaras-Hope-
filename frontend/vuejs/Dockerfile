# Use uma imagem Node.js para buildar o frontend
FROM node:20 as build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o contêiner
COPY . .

# Execute o build de produção do Vue.js
RUN npm run build

# Use o Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos buildados para o diretório de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta em que o frontend será servido (por exemplo, 80)
EXPOSE 80

# O Nginx será iniciado automaticamente
