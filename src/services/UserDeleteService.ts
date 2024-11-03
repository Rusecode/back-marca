import { PrismaClient } from '@prisma/client'; // Ajuste conforme seu modelo
import { User } from '../models/User'; // Ajuste conforme seu modelo de usuário
const prisma = new PrismaClient();

class UserDeleteService {
  async deleteUser(userId: string) {
    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Deleta o usuário
    await user.destroy();

    return { message: 'Conta de usuário deletada com sucesso' };
  }
}

export default new UserDeleteService();
