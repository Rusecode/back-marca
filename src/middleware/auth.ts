import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'sua-chave-secreta';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Captura o token do cabeçalho Authorization

  if (!token) return res.sendStatus(401); // Se não houver token, retorna 401 Unauthorized

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Se o token não for válido, retorna 403 Forbidden
    req.user = user; // Armazena o usuário decodificado na requisição
    next(); // Passa para a próxima função de middleware
  });
};

export default authenticateToken; // Exportação padrão
