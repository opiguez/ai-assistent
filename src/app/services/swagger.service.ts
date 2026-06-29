import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ENV } from '../../config/base';

export default async function registerSwagger(app: Express) {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API агента для low-code системы',
        version: '1.0.0',
        description: 'Документация API чат-бота с поддержкой Function Calling',
      },
      servers: [
        {
          url: `${ENV.LOCAL_SERVER_URL_NO_PORT}:${ENV.PORT_APP}`,
          description: 'Локальный сервер',
        },
      ],
    },
    apis: ['./src/**/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
