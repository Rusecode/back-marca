import express from 'express';
import routes from './routes/index'; // Ajuste o caminho conforme necessário

const app = express();

// Middleware
app.use(express.json());

// Usando as rotas
app.use('/api', routes); // Todas as rotas serão prefixadas com /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
