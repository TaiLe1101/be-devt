import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { ErrorMiddleware } from 'src/middlewares/error/error.middleware';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = errors.map((error) => {
                    return `${error.property}: ${Object.values(error.constraints || []).join(', ')}`;
                });
                return new BadRequestException(messages.join('; '));
            },
        }),
    );

    app.use(new ErrorMiddleware().use);

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(process.env.PORT ?? 3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
