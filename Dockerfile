# Menggunakan image dasar Node.js
FROM node:18

# Set working directory di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin semua file aplikasi ke dalam container
COPY . .

# Expose port 8080 di container
EXPOSE 8080

# Jalankan aplikasi
CMD ["npm", "start"]
