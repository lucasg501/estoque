let categoriaModel = require('../model/categoriaModel');

class categoriaController{
    
    async listar(req,res){
        let categorias = new categoriaModel();
        let lista = await categorias.listar();
        let listaRetorno = [];
        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req,res){
        if(req.params.idCategoria != null){
            let categoria = new categoriaModel();
            categoria = await categoria.obter(req.params.idCategoria);
            if(categoria != null){
                res.status(200).json(categoria.toJSON());
            }else{
                res.status(404).json({msg: "Categoria nao encontrada!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let categoria = new categoriaModel();
            
            categoria.idCategoria = 0;
            categoria.nomeCategoria = req.body.nomeCategoria;
            let ok = await categoria.gravar();
            if(ok){
                res.status(200).json({msg: "Categoria gravada com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao gravar categoria!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let categoria = new categoriaModel();
            
            categoria.idCategoria = req.body.idCategoria;
            categoria.nomeCategoria = req.body.nomeCategoria;
            let ok = await categoria.gravar();
            if(ok){
                res.status(200).json({msg: "Categoria alterada com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao alterar categoria!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }

    async excluir(req,res){
        if(req.params.idCategoria != null){
            let categoria = new categoriaModel();
            let ok = await categoria.exlcuir(req.params.idCategoria);
            if(ok){
                res.status(200).json({msg: "Categoria excluida com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao excluir categoria!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }
}

module.exports = categoriaController;