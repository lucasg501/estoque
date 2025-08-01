let ProdutoModel = require('../model/produtoModel');

class ProdutoController{

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let produto = new ProdutoModel();

            produto.idProduto = 0;
            produto.nomeProduto = req.body.nomeProduto;
            produto.descricao = req.body.descricao;
            produto.precoCusto = req.body.precoCusto;
            produto.precoVenda = req.body.precoVenda;
            produto.estoqueAtual = req.body.estoqueAtual;
            produto.unidade = req.body.unidade;
            produto.idCategoria = req.body.idCategoria;
            let ok = await produto.gravar();
            if(ok){
                res.status(200).json({msg: "Produto gravado com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao gravar produto!"});
            }
        }else{
            res.status(400).json({msg: "Parâmetros inválidos!"});
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let produto = new ProdutoModel();

            produto.idProduto = req.body.idProduto;
            produto.nomeProduto = req.body.nomeProduto;
            produto.descricao = req.body.descricao;
            produto.precoCusto = req.body.precoCusto;
            produto.precoVenda = req.body.precoVenda;
            produto.estoqueAtual = req.body.estoqueAtual;
            produto.unidade = req.body.unidade;
            produto.idCategoria = req.body.idCategoria;
            let ok = await produto.gravar();
            if(ok){
                res.status(200).json({msg: "Produto alterado com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao alterar produto!"});
            }
        }else{
            res.status(400).json({msg: "Parâmetros inválidos!"});
       }
    }

    async listar(req,res){
        let produtos = new ProdutoModel();
        let lista = await produtos.listar();
        let listaRetorno = [];
        for(let i=0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req,res){
        if(req.params.idProduto != null){
            let produto = new ProdutoModel();
            produto = await produto.obter(req.params.idProduto);
            if(produto != null){
                res.status(200).json(produto.toJSON());
            }else{
                res.status(404).json({msg: "Produto não encontrado!"});
            }
        }else{
            res.status(400).json({msg: "Parâmetros inválidos!"});
        }
    }

    async excluir(req,res){
        if(req.params.idProduto != null){
            let produto = new ProdutoModel();
            let ok = await produto.exlcuir(req.params.idProduto);
            if(ok){
                res.status(200).json({msg: "Produto excluido com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao excluir produto!"});
            }
        }else{
            res.status(400).json({msg: "Parâmetros inválidos!"});
        }
    }

}

module.exports = ProdutoController;