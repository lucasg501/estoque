const Database = require('../utils/database');
const banco = new Database();

class produtoModel{

    #idProduto;
    #nomeProduto;
    #descricao;
    #precoCusto;
    #precoVenda;
    #estoqueAtual;
    #unidade;
    #idCategoria;

    get idProduto(){return this.#idProduto} set idProduto(idProduto){this.#idProduto = idProduto};
    get nomeProduto(){return this.#nomeProduto} set nomeProduto(nomeProduto){this.#nomeProduto = nomeProduto};
    get descricao(){return this.#descricao} set descricao(descricao){this.#descricao = descricao};
    get precoCusto(){return this.#precoCusto} set precoCusto(precoCusto){this.#precoCusto = precoCusto};
    get precoVenda(){return this.#precoVenda} set precoVenda(precoVenda){this.#precoVenda = precoVenda};
    get estoqueAtual(){return this.#estoqueAtual} set estoqueAtual(estoqueAtual){this.#estoqueAtual = estoqueAtual};
    get unidade(){return this.#unidade} set unidade(unidade){this.#unidade = unidade};
    get idCategoria(){return this.#idCategoria} set idCategoria(idCategoria){this.#idCategoria = idCategoria};

    constructor(idProduto,nomeProduto,descricao,precoCusto,precoVenda,estoqueAtual,unidade,idCategoria){
        this.#idProduto = idProduto;
        this.#nomeProduto = nomeProduto;
        this.#descricao = descricao;
        this.#precoCusto = precoCusto;
        this.#precoVenda = precoVenda;
        this.#estoqueAtual = estoqueAtual;
        this.#unidade = unidade;
        this.#idCategoria = idCategoria;
    }

    toJSON(){
        return{
            'idProduto': this.#idProduto,
            'nomeProduto': this.#nomeProduto,
            'descricao': this.#descricao,
            'precoCusto': this.#precoCusto,
            'precoVenda': this.#precoVenda,
            'estoqueAtual': this.#estoqueAtual,
            'unidade': this.#unidade,
            'idCategoria': this.#idCategoria
        }
    }

    async gravar(){
        if(this.#idProduto == 0){
            let sql = "insert into produtos (nomeProduto,descricao,precoCusto,precoVenda,estoqueAtual,unidade,idCategoria) values(?,?,?,?,?,?,?)";
            let valores = [this.#nomeProduto,this.#descricao,this.#precoCusto,this.#precoVenda,this.#estoqueAtual,this.#unidade,this.#idCategoria];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }else{
            let sql = "update produtos set nomeProduto = ?, descricao = ?, precoCusto = ?, precoVenda = ?, estoqueAtual = ?, unidade = ?, idCategoria = ? where idProduto = ?";
            let valores = [this.#nomeProduto,this.#descricao,this.#precoCusto,this.#precoVenda,this.#estoqueAtual,this.#unidade,this.#idCategoria,this.#idProduto];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }
    }

    async listar(){
        let sql = "select * from produtos";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i=0; i<rows.length; i++){
            lista.push(new produtoModel(rows[i]['idProduto'], rows[i]['nomeProduto'], rows[i]['descricao'], rows[i]['precoCusto'], rows[i]['precoVenda'], rows[i]['estoqueAtual'], rows[i]['unidade'], rows[i]['idCategoria']));
        }
        return lista;
    }

    async obter(idProduto){
        let sql = "select * from produtos where idProduto = ?";
        let valores = [idProduto];
        let rows = await banco.ExecutaComando(sql,valores);
        if(rows.length > 0){
            let produto = new produtoModel(rows[0]['idProduto'], rows[0]['nomeProduto'], rows[0]['descricao'], rows[0]['precoCusto'], rows[0]['precoVenda'], rows[0]['estoqueAtual'], rows[0]['unidade'], rows[0]['idCategoria']);
            return produto;
        }
        return null;
    }

    async exlcuir(idProduto){
        try{
            let sql = "delete from produtos where idProduto = ?";
            let valores = [idProduto];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }catch(e){
            console.log(e);
            return false;
        }
    }

}

module.exports = produtoModel;