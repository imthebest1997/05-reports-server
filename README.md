<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Reports Server
## Ejecutar en Dev

1. Clonar el repositorio.
2. Instalar dependencias `npm install`.
3. Levantar la base de datos `docker compose up -d`.
4. Clonar `.env.template` y renombrar a `.env` y completar las variables de entorno.
5. Generar el Prisma Client `npx prisma generate`.
6. Ejecutar el proyecto `npm run start:dev`.
