class Autorizacao {

    validarToken(req, res, next){
        if(req.headers.chaveapi == null ||
            req.headers.chaveapi != "token123") {
                res.status(401).json({msg: "Credenciais inválidas!"})
            }
            else{
               next(); 
            }
    }
}

module.exports = Autorizacao;