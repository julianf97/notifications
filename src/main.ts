import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Función principal que inicia la aplicación
async function bootstrap() {

  // Crea la aplicación de NestJS usando AppModule
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({

      // Elimina del body las propiedades que no estén definidas en el DTO
      whitelist: true,

      // Transforma automáticamente los datos recibidos al tipo del DTO correspondiente
      transform: true,
    }),
  );


  // Habilita CORS para permitir peticiones desde el frontend
  app.enableCors({

    // Permite peticiones solo desde el frontend local
    origin: 'http://localhost:5173',
  });

  // Inicia el servidor en PORT o usa 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);
}

// Ejecuta la función que inicia la aplicación
bootstrap();