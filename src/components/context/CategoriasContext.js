import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//Crear un Context
export const CategoriasContext = createContext(); 

//Provider donde se encuentran las funciones y states
const CategoriasProvider = (props) => {
    
    //Crear state del Context
    const [ categorias, guardarCategorias ] = useState([]);

    //Ejecutar el llamado a la API
    useEffect(()=>{
        const ObtenerCategorias = async() => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

            const categorias = await axios.get(url);
            guardarCategorias(categorias.data.drinks);
        }
        ObtenerCategorias();
    },[ ])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;