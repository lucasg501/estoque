const express = require('express');
const swaggerJson = require('./outputSwagger.json');
const swaggerUi = require('swagger-ui-express');
const produtosRoute = require('./route/produtoRoute');
const categoriaRoute = require('./route/categoriaRoute');
const movimentacaoRoute = require('./route/movimentacaoRoute');
const usuarioRoute = require('./route/usuarioRoute');

const cors = require('cors');

const app = express();
const porta = 4000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(express.json());
app.use(cors({origin:'http://localhost:3000', credentials: true}));
app.use('/produtos', produtosRoute);
app.use('/categorias', categoriaRoute);
app.use('/movimentacoes', movimentacaoRoute);
app.use('/usuarios', usuarioRoute);

app.listen(porta, () =>{
    console.log(`Servidor rodando na porta ${porta}`);
    console.log(`Consultar documentação em http://localhost:${porta}/docs\n`);
});