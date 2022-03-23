import express from 'express';
import { router } from './routes';
const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.json({ msg: 'Ola Mundo!' });
});

app.listen(3030, () => {
  console.log('Servidor rodando em http://localhost:3030');
});
