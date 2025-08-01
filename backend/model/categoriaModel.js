const Database = require('../utils/database');
const banco = new Database();

class CategoriaModel{

    #idCategoria;
    #nomeCategoria;

    get idCategoria(){return this.#idCategoria} set idCategoria(idCategoria){this.#idCategoria = idCategoria}
    get nomeCategoria(){return this.#nomeCategoria} set nomeCategoria(nomeCategoria){this.#nomeCategoria = nomeCategoria}

    constructor(idCategoria,nomeCategoria){
        this.#idCategoria = idCategoria;
        this.#nomeCategoria = nomeCategoria;
    }

    toJSON(){
        return{
            'idCategoria': this.#idCategoria,
            'nomeCategoria': this.#nomeCategoria
        }
    }

    async listar(){
        let sql = "select * from categoria";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i=0; i<rows.length; i++){
            lista.push(new CategoriaModel(rows[i]['idCategoria'], rows[i]['nomeCategoria']));
        }
        return lista;
    }

    async obter(idCategoria){
        let sql = "select * from categoria where idCategoria = ?";
        let valores = [idCategoria];
        let rows = await banco.ExecutaComando(sql,valores);
        if(rows.length > 0){
            let categoria = new CategoriaModel(rows[0]['idCategoria'], rows[0]['nomeCategoria']);
            return categoria;
        }
        return null;
    }

    async gravar(){
        if(this.#idCategoria == 0){
            let sql = "insert into categoria (nomeCategoria) values(?)";
            let valores = [this.#nomeCategoria];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }else{
            let sql = "update categoria set nomeCategoria = ? where idCategoria = ?";
            let valores = [this.#nomeCategoria,this.#idCategoria];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }
    }

    async exlcuir(idCategoria){
        let sql = "delete from categoria where idCategoria = ?";
        let valores = [idCategoria];
        let ok = await banco.ExecutaComandoNonQuery(sql,valores);
        return ok;
    }
}

module.exports = CategoriaModel;