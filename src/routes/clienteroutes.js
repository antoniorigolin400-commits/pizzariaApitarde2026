// src/routes/clienteRoutes.env
import express from 'express';
import * as clientecontrollers from '../controllers/clientecontrollers.js';
import validate from '../middlewares/validate.js';
import { clienteCreateSchema, clienteUpdateSchema } from '../controllers/clientecontrollers.js';

// // 1. Importa o middleware de login. Descomentar para carregar
import authMiddleware from '../middlewares/authMiddlewares.js';

const router = express.Router();

// A rota de criação de cliente (registro) continua pública
router.post('/', validate(clienteCreateSchema), clientecontrollers.adicionarCliente);// Rota final: POST /api/clientes

// 2. Aplica o proteção do login em todas as rotas abaixo desta linha
//router.use(authMiddleware);

// O caminho base '/api/clientes' já foi definido no index.js
// Agora definimos apenas as partes relativas: '/', etc.
router.get('/', clientecontrollers.listarClientes); // Rota final: GET /api/clientes

router.put('/:cpf', validate(clienteUpdateSchema), clientecontrollers.atualizarCliente); // Rota final: PUT /api/clientes/:cpf

router.delete('/:cpf', clientecontrollers.deletarCliente); // Rota final: DELETE /api/clientes/:cpf
export default router;