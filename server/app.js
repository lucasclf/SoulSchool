/* Importação dos módulos */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

/* Configurando as constantes */
const app = express();
const port = 4242
const students_router = require('./studentController')

/* Definindo como os arquivos se comportarão */
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

/* Configurando o mongoose */
mongoose.connect(
    "mongodb+srv://lucas_cqn:goldship666@cluster0.xn84s.mongodb.net/soulschool?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

/* Configurando rotas */
app.use('/students', students_router)

/* Configurando escuta */
app.listen(port, () => {
    console.log("Servidor rodando na porta ", port);
});