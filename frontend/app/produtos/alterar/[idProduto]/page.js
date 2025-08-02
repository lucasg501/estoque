'use client'
import ProdutosForm from "@/app/components/produtosForm";
import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react";

export default function AlterarProduto({ params }) {

    const { idProduto } = use(params);

    const [produtos, setProdutos] = useState(null);

    function listarProduto(){
        let status = 0;
        httpClient.get(`/produtos/obter/${idProduto}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setProdutos(r);
            }else{
                alert('Deu merda');
            }
        })
    }

    useEffect(() => {
        listarProduto();
    }, [])

    return (
        <div>
            {produtos != null ? <ProdutosForm produto={produtos}></ProdutosForm> : <div>Carregando...</div>}
        </div>
    )

}