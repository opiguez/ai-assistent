import express from 'express';
import dotenv from 'dotenv';
import registerConnectChatToMCPServer from './app/controllers/chat.controller';
import registerSwagger from './app/services/swagger.service';

dotenv.config({ path: '.env.dev' });

const app = express();
app.use(express.json());

registerSwagger(app);
registerConnectChatToMCPServer(app);

// app.get('/api/rabis-data', async (_, res) => {
//   try {
//     const result = await rabisClient.chain.query
//       .module({ id: '/modules/Calculator' })
//       .get({
//         id: true,
//         name: true,
//         description: true,
//         editView: true,
//         status: true,
//       });

//     return res.json({ success: true, module: result });
//   } catch (error) {
//     console.error('Ошибка запроса к системе РАБИС:', error);
//     res.status(500).json({ success: false, error: String(error) });
//   }
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Node.js сервер успешно запущен на http://localhost:${PORT}`);
});

//TODO: .env обновить для secure инфо
