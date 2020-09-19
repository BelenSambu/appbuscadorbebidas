import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [ recetas, guardarRecetas ] = useState([]);
    const [ busqueda, buscarRecetas ] = useState({
        nombre: '',
        categoria: ''
    });

    const { nombre, categoria } = busqueda;
    const [ consultar, guardarConsulta ] = useState(false);
    const [ error, guardarError ] = useState(false);


    useEffect(()=>{
        if(consultar){
            const obtenerRecetas = async () => {
                var url = ``;
                nombre === '' ? url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}` : url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}`
                if( nombre !== '' && categoria !== '' ) {
                    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                }
                    
                const resultado = await axios.get(url);
                if( resultado.data !== '' ) {
                    guardarRecetas(resultado.data.drinks);
                    guardarError(false);
                }else {
                    guardarError(true);
                } 
            }
            obtenerRecetas();
        }
       
    }, [ busqueda ]);

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsulta,
                error
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;