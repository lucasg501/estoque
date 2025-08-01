const Database = require('../utils/database');
const banco = new Database();

class UsuarioModel{
    #idUsu;
    #nomeUsu;
    #login;
    #senha;

    get idUsu(){return this.#idUsu} set idUsu(idUsu){this.#idUsu = idUsu};
    get nomeUsu(){return this.#nomeUsu} set nomeUsu(nomeUsu){this.#nomeUsu = nomeUsu};
    get login(){return this.#login} set login(login){this.#login = login};
    get senha(){return this.#senha} set senha(senha){this.#senha = senha};

    constructor(idUsu,nomeUsu,login,senha) {
        this.#idUsu = idUsu;
        this.#nomeUsu = nomeUsu;
        this.#login = login;
        this.#senha = senha;
    }

    toJSON(){
        return{
            'idUsu': this.#idUsu,
            'nomeUsu': this.#nomeUsu,
            'login': this.#login,
            'senha': this.#senha
        }
    }

    async listar(){
        let sql = "select * from usuarios";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i=0; i<rows.length; i++){
            lista.push(new UsuarioModel(rows[i]['idUsu'],rows[i]['nomeUsu'],rows[i]['login'],rows[i]['senha']));
        }
        return lista;
    }

    async obter(idUsu){
        let sql = "select * from usuarios where idUsu = ?";
        let valores = [idUsu];
        let rows = await banco.ExecutaComando(sql,valores);
        if(rows.length > 0){
            let usuario = new UsuarioModel(rows[0]['idUsu'],rows[0]['nomeUsu'],rows[0]['login'],rows[0]['senha']);
            return usuario;
        }
        return null;
    }

    async autenticar(login, senha){
        let sql = "select * from usuarios where login = ? and senha = ?";
        let valores = [login, senha];
        let rows = await banco.ExecutaComando(sql, valores);
        if(rows.length > 0){
            let usuario = new UsuarioModel(rows[0]['idUsu'],rows[0]['nomeUsu'],rows[0]['login'],rows[0]['senha']);
            return usuario;
        }
        return null;
    }

    async gravar(){
        if(this.#idUsu == 0){
            let sql = "insert into usuarios (nomeUsu,login,senha) values(?,?,?)";
            let valores = [this.#nomeUsu, this.#login, this.#senha];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }else{
            let sql = "update usuarios set nomeUsu = ?, login = ?, senha = ? where idUsu = ?";
            let valores = [this.#nomeUsu, this.#login, this.#senha, this.#idUsu];
            let ok = await banco.ExecutaComandoNonQuery(sql,valores);
            return ok;
        }
    }

    async excluir(idUsu){
        let sql = "delete from usuarios where idUsu = ?";
        let valores = [idUsu];
        let ok = await banco.ExecutaComandoNonQuery(sql,valores);
        return ok;
    }

}

module.exports = UsuarioModel;