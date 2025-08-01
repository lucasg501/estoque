const Database = require('../utils/database');
const banco = new Database();

class MovimentacaoModel{
    #idMov;
    #quantidade;
    #dataMov;
    #observacao;
    #tipoMov;
    #idProduto;

    get idMov(){return this.#idMov} set idMov(idMov){this.#idMov = idMov}
    get quantidade(){return this.#quantidade} set quantidade(quantidade){this.#quantidade = quantidade}
    get dataMov(){return this.#dataMov} set dataMov(dataMov){this.#dataMov = dataMov}
    get observacao(){return this.#observacao} set observacao(observacao){this.#observacao = observacao}
    get tipoMov(){return this.#tipoMov} set tipoMov(tipoMov){this.#tipoMov = tipoMov}
    get idProduto(){return this.#idProduto} set idProduto(idProduto){this.#idProduto = idProduto}

    constructor(idMov, quantidade, dataMov, observacao, tipoMov, idProduto) {
        this.#idMov = idMov;
        this.#quantidade = quantidade;
        this.#dataMov = dataMov;
        this.#observacao = observacao;
        this.#tipoMov = tipoMov;
        this.#idProduto = idProduto;
    }

    toJSON(){
        return{
            'idMov': this.#idMov,
            'quantidade': this.#quantidade,
            'dataMov': this.#dataMov,
            'observacao': this.#observacao,
            'tipoMov': this.#tipoMov,
            'idProduto': this.#idProduto
        }
    }

    async listar(){
        let sql = "select * from movimentacoes";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i=0; i<rows.length; i++){
            lista.push(new MovimentacaoModel(rows[i]['idMov'], rows[i]['quantidade'], rows[i]['dataMov'], rows[i]['observacao'], rows[i]['tipoMov'], rows[i]['idProduto']));
        }
        return lista;
    }

    async obter(idMov){
        let sql = "select * from movimentacoes where idMov = ?";
        let valores = [idMov];
        let rows = await banco.ExecutaComando(sql,valores);
        if(rows.length > 0){
            let movimentacao = new MovimentacaoModel(rows[0]['idMov'], rows[0]['quantidade'], rows[0]['dataMov'], rows[0]['observacao'], rows[0]['tipoMov'], rows[0]['idProduto']);
            return movimentacao;
        }
        return null;
    }

    async obterPorProd(idProduto){
        let sql = "select * from movimentacoes where idProduto = ?";
        let valores = [idProduto];
        let rows = await banco.ExecutaComando(sql,valores);
        if(rows.length > 0){
            let movimentacao = new MovimentacaoModel(rows[0]['idMov'], rows[0]['quantidade'], rows[0]['dataMov'], rows[0]['observacao'], rows[0]['tipoMov'], rows[0]['idProduto']);
            return movimentacao;
        }
        return null;
    }

    async gravar(){
        if(this.#idMov == 0){
            let sql = "insert into movimentacoes (quantidade, dataMov, observacao, tipoMov, idProduto) values(?,?,?,?,?)";
            let valores = [this.#quantidade, this.#dataMov, this.#observacao, this.#tipoMov, this.#idProduto];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }else{
            let sql = "update movimentacoes set quantidade = ?, dataMov = ?, observacao = ?, tipoMov = ?, idProduto = ? where idMov = ?";
            let valores = [this.#quantidade, this.#dataMov, this.#observacao, this.#tipoMov, this.#idProduto, this.#idMov];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }
    }

    async excluir(idMov){
        let sql = "delete from movimentacoes where idMov = ?";
        let valores = [idMov];
        let ok = await banco.ExecutaComandoNonQuery(sql,valores);
        return ok;
    }

}

module.exports = MovimentacaoModel;