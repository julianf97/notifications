# Usa una imagen base que ya trae Node.js 22
FROM node:22-alpine

# Define la carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copia primero los archivos de dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

#Copia todo el codigo del backend
COPY . .

# Compila el proyecto NestJS
RUN npm run build

# Indica que la aplicacion usa el puerto 3000
EXPOSE 3000

# Ejecuta la aplicacion compilada 
CMD ["npm", "run", "start:prod"]


