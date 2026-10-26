//src/clienteController.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as produtoService from '../services/produtoservice.js';
import Joi from 'joi';

//Usando 'export const' para criar e exportar a função
//Criação dos Schemas que o validate irá usar para validar dados do usuário
export const produtoCreateSchema = Joi.object({
  nome_produto: Joi.string().required().max(100),
  descrição: Joi.string().max(100).allow(''),
  tipo: Joi.string().max(30).allow(''),
  valor: Joi.string().required(),
  imagem: Joi.string().required(),
});

export const produtoUpdateSchema = Joi.object({
  nome_produto: Joi.string().max(100),
  descrição: Joi.string().max(100).allow(''),
  tipo: Joi.string().max(30).allow(''),
  valor: Joi.string(),
  imagem: Joi.string()
}).min(1);

export const listarproduto = async (req, res) => {
    try {
      // Capturamos os parâmetros de consulta da URL
      // ex: ?cpf=01234567890 / ?nome=sandro / ?email=sandro@senac.br
      const { valormin, valormax, tipo, nome_produto, id_produto } = req.query;
      // Passamos todos os filtros para o serviço
      const produto = await produtoService.findAll(valormin, valormax, tipo, nome_produto, id_produto);
    // Lista vazia é uma resposta válida: 200 com []
      res.json(produto);
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


export const adicionarCliente = async (req, res) => {
  try {
    const novoproduto = await produtoService.create(req.body);
    res.status(201).json({ message: 'produto adicionado com sucesso', data: novoproduto });
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'produtos já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
};

export const atualizarproduto = async (req, res) => {
  try {
    const { id_produto } = req.params;
    const updated = await produtoService.update(id_produto, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'produto não encontrado' });
    }
    res.status(200).json({ message: 'produto atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const deletarproduto = async (req, res) => {
  try {
    const { id_produto } = req.params;
    const deleted = await produtoService.remove(id_produto);
    if (!deleted) {
      return res.status(404).json({ error: 'produto não encontrado' });
    }
    res.status(200).json({ message: 'produto deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};