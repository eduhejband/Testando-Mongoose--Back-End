const express = require('express');
const Carrinho = require('./carrinho');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/minha_loja', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexão estabelecida com sucesso!');
}).catch((err) => {
  console.log(`Erro ao conectar com o banco de dados: ${err.message}`);
});

app.use(express.json());

// cria um novo produto no carrinho
app.post('/carrinhos', async (req, res) => {
  const { id, name, price } = req.body;

  const novoProduto = new Carrinho({ id, name, price });

  try {
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// retorna todos os produtos no carrinho
app.get('/carrinhos', async (req, res) => {
  try {
    const carrinhos = await Carrinho.find();
    res.json(carrinhos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// retorna um produto específico no carrinho pelo ID
app.get('/carrinhos/:id', async (req, res) => {
  try {
    const carrinho = await Carrinho.findById(req.params.id);
    res.json(carrinho);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// atualiza um produto no carrinho pelo ID
app.patch('/carrinhos/:id', async (req, res) => {
  try {
    const carrinho = await Carrinho.findById(req.params.id);

    if (req.body.id != null) {
      carrinho.id = req.body.id;
    }

    if (req.body.name != null) {
      carrinho.name = req.body.name;
    }

    if (req.body.price != null) {
      carrinho.price = req.body.price;
    }

    await carrinho.save();
    res.json(carrinho);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// remove um produto no carrinho pelo ID
app.delete('/carrinhos/:id', async (req, res) => {
  try {
    const carrinho = await Carrinho.findByIdAndDelete(req.params.id);

    if (!carrinho) {
      return res.status(404).json({ message: 'Produto não encontrado no carrinho' });
    }

    res.json({ message: 'Produto removido do carrinho' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});
