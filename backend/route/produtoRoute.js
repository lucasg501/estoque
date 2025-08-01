const express = require('express');
const produtoController = require('../controller/produtoController');
const router = express.Router();

const ctrl = new produtoController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Lista os produtos cadastrados'

    ctrl.listar(req,res);
});


router.get('/obter/:idProduto', (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Obtem um produto cadastrado'

    ctrl.obter(req,res);
});


router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Adiciona um novo produto'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/produtos"
                    }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Altera um produto cadastrado'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/produtos"
                    }
                }
            }
        }
    */

    ctrl.alterar(req,res);
});

router.delete('/excluir/:idProduto', (req,res) =>{
    // #swagger.tags = ['Produtos']
    // #swagger.summary = 'Exclui um produto cadastrado'

    ctrl.excluir(req,res);
})

module.exports = router;