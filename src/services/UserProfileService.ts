// src/services/UserProfileService.ts

import { PrismaClient } from '@prisma/client'; // Ajuste conforme seu modelo
const prisma = new PrismaClient();



class UserProfileService {
  async getUserData(userId: string) {
    // Busca o usuário pelo ID usando Prisma
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Retorna os dados do usuário, excluindo a senha
    const { password, ...userData } = user; // O Prisma retorna diretamente o objeto do usuário
    return userData; // Retorna os dados do usuário
  }
}

export default new UserProfileService();

