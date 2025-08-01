let MovimentacaoModel = require('../model/movimentacaoModel');

class MovimentacaoController {

    async listar(req, res) {
        let movimentacoes = new MovimentacaoModel();
        let lista = await movimentacoes.listar();
        let listaRetorno = [];
        for (let i = 0; i < lista.length; i++) {
            listaRetorno.push(lista[i].toJSON());
        }
        res.status(200).json(listaRetorno);
    }

    async obter(req, res) {
        if (req.params.idMov != null) {
            let movimentacao = new MovimentacaoModel();
            movimentacao = await movimentacao.obter(req.params.idMov);
            if (movimentacao != null) {
                res.status(200).json(movimentacao.toJSON());
            } else {
                res.status(404).json({ msg: "Movimentacao nao encontrada!" });
            }
        } else {
            res.status(400).json({ msg: "Parametros invalidos!" });
        }
    }

    async obterProd(req, res) {
        if (req.params.idProduto != null) {
            let movimentacao = new MovimentacaoModel();
            movimentacao = await movimentacao.obterPorProd(req.params.idProduto);
            if (movimentacao != null) {
                res.status(200).json(movimentacao.toJSON());
            } else {
                res.status(404).json({ msg: "Movimentacao nao encontrada!" });
            }
        } else {
            res.status(400).json({ msg: "Parametros invalidos!" });
        }
    }

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let movimentacao = new MovimentacaoModel();
            
            movimentacao.idMov = 0;
            movimentacao.idProduto = req.body.idProduto;
            movimentacao.quantidade = req.body.quantidade;
            movimentacao.observacao = req.body.observacao;
            movimentacao.tipoMov = req.body.tipoMov;
            movimentacao.dataMov = req.body.dataMov;
            let ok = await movimentacao.gravar();
            if(ok){
                res.status(200).json({msg: "Movimentacao gravada com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao gravar movimentacao!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let movimentacao = new MovimentacaoModel();
            
            movimentacao.idMov = req.body.idMov;
            movimentacao.idProduto = req.body.idProduto;
            movimentacao.quantidade = req.body.quantidade;
            movimentacao.observacao = req.body.observacao;
            movimentacao.tipoMov = req.body.tipoMov;
            movimentacao.dataMov = req.body.dataMov;
            let ok = await movimentacao.gravar();
            if(ok){
                res.status(200).json({msg: "Movimentacao alterada com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao alterar movimentacao!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }

    async excluir(req,res){
        if(req.params.idMov != null){
            let movimentacao = new MovimentacaoModel();
            let ok = await movimentacao.exlcuir(req.params.idMov);
            if(ok){
                res.status(200).json({msg: "Movimentacao excluida com sucesso!"});
            }else{
                res.status(500).json({msg: "Erro ao excluir movimentacao!"});
            }
        }else{
            res.status(400).json({msg: "Parametros invalidos!"});
        }
    }
}

module.exports = MovimentacaoController;