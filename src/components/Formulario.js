import React, { useContext, useState } from 'react';
import { CategoriasContext } from './context/CategoriasContext';
import { RecetasContext } from './context/RecetasContext';

const Formulario = () => {

    const [ busqueda, guardarBusqueda ]  = useState({
        nombre: '',
        categoria: ''
    });

    //Extraigo los parametros del objeto
    const { categorias } = useContext(CategoriasContext);
    //Extraigo lo que necesite de RecetasContext
    const { buscarRecetas, guardarConsulta } = useContext(RecetasContext);

    //Función para leer los contenidos
    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }
    return ( 
        <form 
            className="col-12"
            onSubmit={e=>{
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsulta(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o ingredientes</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        type="text"
                        className="form-control"
                        placeholder="Busca por ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">Selecciona Categoría</option>
                        { categorias.map(categoria => (
                            <option 
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        )) }
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Recetas"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;