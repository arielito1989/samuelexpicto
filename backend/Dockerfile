# Usar una imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de definición de paquetes e instalar dependencias
# Se copian por separado para aprovechar el cache de Docker
COPY package*.json ./

RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "run", "start" ]
