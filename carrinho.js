const mongoose = require('mongoose');

const carrinhoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Carrinho = mongoose.model('Carrinho', carrinhoSchema);

module.exports = Carrinho;
