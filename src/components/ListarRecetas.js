import React, { useContext, Fragment } from 'react';
import Receta from './Receta';
import { RecetasContext } from './context/RecetasContext';
import './ListarRecetas.css';


const ListarRecetas = () => {

    //recetas
    const { recetas, error } = useContext(RecetasContext);

    return ( 
        <Fragment>
            { error ? 
                <p className="alert-danger text-center p-2 _labelAlertNotFound">No pudimos encontrar tu búsqueda! Prueba con otro ingrediente o categoría</p> : 
                <div className="row mt-5">
                {recetas.map(receta=>(
                    <Receta 
                        key={receta.idDrink}
                        receta={receta}
                    />
                ))}
                </div>
            }

        </Fragment>
     );
}
 
export default ListarRecetas;