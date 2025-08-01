const swaggerAutogen = require('swagger-autogen')({openapi: "3.0.0"});
const produtosModel = require('./model/produtoModel');
const categoriaModel = require('./model/categoriaModel');
const movimentacaoModel = require('./model/movimentacaoModel');
const usuarioModel = require('./model/usuarioModel');

const doc = {
    info:{

    },
    host: 'localhost:4000',
    securityDefinitions:{
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'apiKey',
            description: 'chave para autenticacao da api'
        }
    },
    components:{
        schemas:{
            produtos: new produtosModel(0, 'Batata', 'Batata pringles de churrasco', 4.00, 12.50, 5, 'un', 2).toJSON(),
            categoria: new categoriaModel(0, 'Batata').toJSON(),
            movimentacao: new movimentacaoModel(0,2,'2025-08-01', 'Foi uma venda pra um mendigo', 'S', 3).toJSON(),
            usuario: new usuarioModel(0, 'Clodoaldo', 'clodoaldo69', 'fofinho123').toJSON()
        }
    }
}

let outputJson = "./outputSwagger.json";
let endpoins = ["./server.js"];

swaggerAutogen(outputJson, endpoins, doc)
.then(r=>{
    require('./server.js');
});