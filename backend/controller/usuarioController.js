const usuarioModel = require('../model/usuarioModel');

class UsuarioController{
    async listar(req,res){
        let usuario = new usuarioModel();
        let lista = await usuario.listar();
        let listaRetorno = [];
        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req,res){
        if(req.params.idUsu != null){
            let usuario = new usuarioModel();
            usuario = await usuario.obter(req.params.idUsu);
            if(usuario != null){
                res.status(200).json(usuario.toJSON());
            }else{
                res.status(404).json({msg: "Usuario nao encontrado!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }

    async autenticar(req,res){
        let usuario = new usuarioModel();
        let login = req.params.login;
        let senha = req.params.senha;
        let autenticado = await usuario.autenticar(login,senha);
        if(autenticado != null){
            res.status(200).json(autenticado);
        }else{
            res.status(500).json({msg: "Erro ao autenticar usuario!"});
        }
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let usuario = new usuarioModel();
            
            usuario.idUsu = 0;
            usuario.login = req.body.login;
            usuario.senha = req.body.senha;
            usuario.nomeUsu = req.body.nomeUsu;
            let ok = await usuario.gravar();
            if(ok){
                res.status(200).json({msg: "Usuario gravado com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao gravar usuario!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let usuario = new usuarioModel();
            
            usuario.idUsu = req.body.idUsu;
            usuario.login = req.body.login;
            usuario.senha = req.body.senha;
            usuario.nomeUsu = req.body.nomeUsu;
            let ok = await usuario.gravar();
            if(ok){
                res.status(200).json({msg: "Usuario alterado com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao alterar usuario!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }

    async excluir(req,res){
        if(req.params.idUsuario != null){
            let usuario = new usuarioModel();
            let ok = await usuario.excluir(req.params.idUsuario);
            if(ok){
                res.status(200).json({msg: "Usuario excluido com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao excluir usuario!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }
}

module.exports = UsuarioController;