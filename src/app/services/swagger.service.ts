import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export default async function registerSwagger(app: Express) {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Подбора инверторов Форпост',
        version: '1.0.0',
        description: 'Документация API чат-бота с поддержкой Function Calling',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
          description: 'Локальный сервер',
        },
      ],
    },
    apis: ['./src/**/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
