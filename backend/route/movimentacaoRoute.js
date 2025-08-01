const express = require('express');
const movimentacaoController = require('../controller/movimentacaoController');
const router = express.Router();

const ctrl = new movimentacaoController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Movimentacoes']
    // #swagger.summary = 'Lista as movimentacoes cadastradas'

    ctrl.listar(req,res);
});


router.get('/obter/:idMovimentacao', (req,res) =>{
    // #swagger.tags = ['Movimentacoes']
    // #swagger.summary = 'Obtem uma movimentacao cadastrada'

    ctrl.obter(req,res);
});


router.get('/obterProd/:idProduto', (req,res) =>{
    // #swagger.tags = ['Movimentacoes']
    // #swagger.summary = 'Obtem uma movimentacao cadastrada'

    ctrl.obterProd(req,res);
});


router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['Movimentacoes']
    // #swagger.summary = 'Adiciona uma nova movimentacao'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/movimentacao" }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});


router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Movimentacoes']
    // #swagger.summary = 'Altera uma movimentacao cadastrada'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/movimentacao" }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});


router.delete('/excluir/:idMovimentacao', (req,res) =>{
    // #swagger.tags = ['Movimentacoes']
    // #swagger.summary = 'Exclui uma movimentacao cadastrada'

    ctrl.excluir(req,res);
})

module.exports = router;