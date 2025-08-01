const express = require('express');
const categoriaController = require('../controller/categoriaController');
const router = express.Router();

const ctrl = new categoriaController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Categorias']
    // #swagger.summary = 'Lista as categorias cadastradas'

    ctrl.listar(req,res);
});


router.get('/obter/:idCategoria', (req,res) =>{
    // #swagger.tags = ['Categorias']
    // #swagger.summary = 'Obtem uma categoria cadastrada'

    ctrl.obter(req,res);
});


router.post('/gravar', (req,res) =>{
       // #swagger.tags = ['Categorias']
    // #swagger.summary = 'Adiciona uma nova categoria'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/categoria"
                    }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});


router.put('/alterar', (req,res) =>{
       // #swagger.tags = ['Categorias']
    // #swagger.summary = 'Adiciona uma nova categoria'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/categoria"
                    }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});


router.delete('/excluir/:idCategoria', (req,res) =>{
    // #swagger.tags = ['Categorias']
    // #swagger.summary = 'Exclui uma categoria cadastrada'

    ctrl.excluir(req,res);
})

module.exports = router;