import { Router } from 'express';
import UserController from '../controllers/UserController'; // Ajuste o caminho conforme necessário
import CartController from '../controllers/CartController'; // Ajuste o caminho conforme necessário
import OrderController from '../controllers/OrderController'; // Ajuste o caminho conforme necessário
import PurchaseHistoryController from '../controllers/PurchaseHistoryController'; // Importando o controller de histórico de compras
import authenticateToken from '../middleware/auth'; // Ajuste o caminho conforme necessário

const router = Router();

// Rotas para usuários
router.post('/users', UserController.createUser); // Criar usuário
router.post('/users/login', UserController.loginUser); // Login de usuário
router.delete('/users/:id', authenticateToken, UserController.deleteUser); // Deletar conta do usuário
router.get('/users/:id', authenticateToken, UserController.getUserData); // Obter dados do usuário
router.put('/users/:id', authenticateToken, UserController.updateUserData); // Editar dados do usuário

// Rotas para o carrinho e histórico de compras
router.get('/cart/:userId', authenticateToken, CartController.getUserCart); // Exibir carrinho do usuário
router.get('/orders/:userId/history', authenticateToken, PurchaseHistoryController.getUserOrderHistory); // Exibir histórico de compras
router.get('/orders/:userId/pending', authenticateToken, OrderController.getPendingOrders); // Exibir compras não finalizadas

export default router;



