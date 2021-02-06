import React, {useState} from 'react';
import Error from './Error';
import ProPTypes from 'prop-types'

const Formulario = ({buscar, setBuscar, setConsultar}) => {

    const handleChange = e => {
        setBuscar({
            ...buscar,
            [e.target.name] : e.target.value
        });
    }
    const [error, setError] = useState(false);  

    const handleSubmit = e => {
        e.preventDefault();

        if(ciudad.trim() === '' || pais.trim() === '') return setError(true);

        setError(false);

        setConsultar(true);
    }


    
    const {ciudad, pais} = buscar;
    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Ambos campos son obligatorios"/> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un país</option>
                    <option value="US">Estados Unidos</option>
                    <option value="NI">Nicaragua</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col s12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                >Buscar Clima</button>
            </div>
        </form>
     );
}

Formulario.propTypes = {
    buscar: ProPTypes.object.isRequired,
    setBuscar: ProPTypes.func.isRequired,
    setConsultar: ProPTypes.func.isRequired
}
 
export default Formulario;