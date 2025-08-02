'use client'
import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react"
import CategoriaForm from "@/app/components/categoriasForm"

export default function AlterarCategoria({ params }) {

    const {idCategoria} = use(params);

    const [categoria, setCategoria] = useState(null);

    function listarCategorias(){
        let status = 0;
        httpClient.get(`/categorias/obter/${idCategoria}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setCategoria(r);
            }else{
                alert('Erro ao carregar as categorias!');
            }        
        })
    }

    useEffect(()=>{
        listarCategorias();
    },[])

    return (
        <div>
            {categoria != null ? <CategoriaForm categoria={categoria}></CategoriaForm> : <div>Carregando...</div>}
        </div>
    )
}