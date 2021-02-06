import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  const [buscar, setBuscar] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const {ciudad, pais} = buscar;

    useEffect(() => {

      const consultarAPI = async () => {

        if(consultar) {
          const appId = 'Aquí va tu appid';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          setResultado(resultado);

          setConsultar(false);

          // Revisa si hay error de consulta

          if(resultado.cod === "404") {
            setError(true);
          } else {
            setError(false);
          }
        }

      } 
        consultarAPI();

        // Esto para error de dependencias solo si es necesario
      // eslint-disable-next-line
    }, [consultar])

    // Carga condicional de componentes
    let componente;
    if(error) {
      componente = <Error mensaje="No hay resultados" />
    } else {
      componente = <Clima 
                    resultado={resultado}
                  />
    }

  return (
    <Fragment>
        <Header
          titulo="Clima React App"
        />

        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                <Formulario 
                  buscar={buscar}
                  setBuscar={setBuscar}
                  setConsultar={setConsultar}
                />
              </div>
              <div className="col m6 s12">
                {componente}
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
