import React, {Fragment, useEffect, useState} from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';
import Error from './componentes/Error';
function App() {
  
  const [busqueda, guardarBusqueda] = useState({
      ciudad: '',
      pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
 

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      if(consultar){
        const appId = 'cc12b041def8d0e584309c3ca1e1cf9f';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        guardarResultado(resultado);
        guardarConsultar(false);

        if(resultado.cod === "404"){
          guardarError(true);
        }else{
          guardarError(false);
        }
      }
    }
    consultarApi();
  }, [consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="no se ha encontrado la ciudad"/>
  }else{
    componente = <Clima
      resultado={resultado}
    />
  }  
  return (
    <Fragment>
      <Header
        titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12"> 
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
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
