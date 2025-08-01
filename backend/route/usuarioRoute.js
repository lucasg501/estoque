const express = require('express');
const usuarioController = require('../controller/usuarioController');
const router = express.Router();

const ctrl = new usuarioController();

router.get('/listar', (req,res) =>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Lista os usuarios cadastrados'

    ctrl.listar(req,res);
});

router.get('/autenticar/:login/:senha', (req,res) =>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Autentica um usuario cadastrado'

    ctrl.autenticar(req,res);
});

router.get('/obter/:idUsu', (req,res) =>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Obtem um usuario cadastrado'

    ctrl.obter(req,res);    
});

router.post('/gravar', (req,res) =>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Adiciona um novo usuario'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/usuario" }
                }
            }
        }
    */
    ctrl.gravar(req,res);
});


router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Altera um usuario cadastrado'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/usuario" }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});


router.delete('/excluir/:idUsuario', (req,res) =>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Exclui um usuario cadastrado'

    ctrl.excluir(req,res);
})

module.exports = router;