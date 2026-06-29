import { ENV } from './config/base';
import express from 'express';
import registerConnectChatToMCPServer from './app/controllers/chat.controller';
import registerSwagger from './app/services/swagger.service';

const app = express();
app.use(express.json());

registerSwagger(app);
registerConnectChatToMCPServer(app);

const host = new URL(ENV.LOCAL_SERVER_URL_NO_PORT).hostname;

app.listen(ENV.PORT_APP, host, () => {
  console.log(
    `Node.js сервер успешно запущен на ${ENV.LOCAL_SERVER_URL_NO_PORT}:${ENV.PORT_APP}`,
  );
});
