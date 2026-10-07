import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as clienteService from '../services/clienteService.js';
export const login = async (req, res) => {
    const {cpf, senha } = req.body;
    try {
        const clientes = await clienteService.findAll(cpf);
        const cliente=clientes[0];

        if (!cliente){
            return res.status(401).json({ message: "ceredenciais invalidas"});
         }

         const senhavalida = await bcrypt.compare (senha, clientes.senha);
         if (!senhavalida) {
            return res.status(401).json({message: "credenciais ivalidas" });
        }

        const payload = {cpf: cliente.cpf, email: cliente.email};
        const token = jwt.sign(payload, process.env.jWT_SECRET,{expiresIn: '1h'});

        res.json({message: "login bem-sucedido!", token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "erro interno no servidor."});
    }
};
