import React, { useContext, useState } from 'react';
import { ModalContext } from './context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({


    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 500,
        display: 'block'
        },
        header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
        },
        content: {
        padding: "12px 0",
        overflow: 'scroll'
        }

}));

const Receta = ({receta}) => {

    // Material UI - configuraciones
    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const clases = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const { guardarIdReceta, recetaBebida, guardarReceta } = useContext(ModalContext);


    //Muestra los ingredientes
    const mostrarIngredientes = (info) => {
        let ingredientes = [];
        for( let i = 1; i < 15; i++ ) {
            if( info[`strIngredient${i}`] ) {
                ingredientes.push(
                <li>{info[`strIngredient${i}`]} {info[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Img de ${receta.strDrink}`}/>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={()=>{
                            guardarIdReceta(receta.idDrink)
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={clases.paper}>
                            <h2>{recetaBebida.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {recetaBebida.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={recetaBebida.strDrinkThumb} />
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(recetaBebida)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Receta;