import { PrismaClient } from '@prisma/client'; // Ajuste conforme seu modelo
import bcrypt from 'bcrypt'; // Para hash de senhas

const prisma = new PrismaClient();

class UserService {
  // Criar um novo usuário
  async createUser(data: { name: string; email: string; password: string }) {
    // Verificar se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email já cadastrado.');
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar e retornar o novo usuário
    const user = await prisma.user.create({
      data: {
        name: data.name, // Incluindo o nome do usuário
        email: data.email,
        password: hashedPassword,
      },
    });

    return user;
  }

  // Implementar outros métodos como loginUser, deleteUser, etc.
}

export default new UserService();
