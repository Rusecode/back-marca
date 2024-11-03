// src/services/UserLoginService.ts

import { PrismaClient } from '@prisma/client'; // Ajuste conforme seu modelo
import { User } from '../models/User'; // Ajuste conforme seu modelo de usuário
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserLoginService {
  async login(email: string, password: string) {
    // Verifica se o usuário existe usando Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Email não cadastrado');
    }

    // Compara a senha fornecida com a senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    // Cria o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return {
      message: 'Login bem-sucedido',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export default new UserLoginService();
