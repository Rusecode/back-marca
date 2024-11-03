// src/services/UserUpdateService.ts

import { PrismaClient } from '@prisma/client'; // Ajuste conforme seu modelo
import { User } from '../models/User'; // Ajuste conforme seu modelo de usuário
const prisma = new PrismaClient();


class UserUpdateService {
  async updateUserData(userId: number, updateData: Partial<Omit<User, 'id' | 'password'>>) {
    // Busca o usuário pelo ID usando Prisma
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Atualiza os dados do usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Retorna os dados atualizados do usuário, excluindo a senha
    const { password, ...userData } = updatedUser;
    return userData;
  }
}

export default new UserUpdateService();
