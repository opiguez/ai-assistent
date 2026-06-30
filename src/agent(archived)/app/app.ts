// import express from 'express';
// import registerSwagger from './services/swagger.service';
// import registerConnectChatToMCPServer from './controllers/chat.controller';
// import { ENV } from '../../config/base';

// const app = express();
// app.use(express.json());

// registerSwagger(app);
// registerConnectChatToMCPServer(app);

// const host = new URL(ENV.LOCAL_SERVER_URL_NO_PORT).hostname;

// app.listen(ENV.PORT_APP, host, () => {
//   console.log(
//     `Node.js сервер успешно запущен на ${ENV.LOCAL_SERVER_URL_NO_PORT}:${ENV.PORT_APP}`,
//   );
// });
