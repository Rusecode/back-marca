import { Request, Response } from 'express';
import UserService from '../services/UserService'; // Serviço para criação de usuários
import UserLoginService from '../services/UserLoginService'; // Serviço para login de usuários
import UserDeleteService from '../services/UserDeleteService'; // Serviço para deletar conta de usuários
import UserProfileService from '../services/UserProfileService'; // Serviço para buscar dados do usuário
import UserUpdateService from '../services/UserUpdateService'; // Serviço para editar dados do usuário
import jwt from 'jsonwebtoken';

class UserController {
  // Criar um novo usuário
  async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json({ message: 'Usuário criado com sucesso', user });
    } catch (error: any) { // Tipando o erro
      res.status(400).json({ message: error.message });
    }
  }

  // Login de usuário
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserLoginService.login(email, password); // Usando UserLoginService

      // Criar o token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

      res.json({ message: 'Login bem-sucedido', token, user });
    } catch (error: any) { // Tipando o erro
      res.status(401).json({ message: error.message });
    }
  }

  // Deletar conta do usuário
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UserDeleteService.deleteUser(id); // Usando UserDeleteService
      res.status(204).send(); // No Content
    } catch (error: any) { // Tipando o erro
      res.status(400).json({ message: error.message });
    }
  }

  // Obter dados do usuário
  async getUserData(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserProfileService.getUserData(id); // Usando UserProfileService
      res.json(user);
    } catch (error: any) { // Tipando o erro
      res.status(404).json({ message: error.message });
    }
  }

  // Editar dados do usuário
  async updateUserData(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedUser = await UserUpdateService.updateUserData(id, req.body); // Usando UserUpdateService
      res.json({ message: 'Dados do usuário atualizados', updatedUser });
    } catch (error: any) { // Tipando o erro
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();

