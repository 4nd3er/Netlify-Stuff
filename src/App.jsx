import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/formulario";
import ListadoPacientes from "./components/ListadoPacientes";

// Props - propiedades -> pasar variables o funciones de otros componentes
// 

function App() {
  const [pacientes, setPacientes] = useState(() =>
    JSON.parse(localStorage.getItem('pacientes')) || []);
  const [paciente, setPaciente] = useState({});

  // useEffect(() => {
  //   const obtenerLS = () => {
  //     const pacientesLS = JSON.stringify(localStorage.getItem('pacientes')) ?? [];

  //     console.log(pacientesLS);
  //   }
  //   obtenerLS();
  // },[])

  // useEffect(() => {
  //   const pacientesLS = JSON.parse(localStorage.getItem('pacientes'));
  //   pacientesLS?.length > 0 && setPacientes(pacientesLS)
  // }, [pacientes]);

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);
  // ? De esta manera se ejecuta el useEffect cada vez que haya un cambio en la lista de pacientes

  const eliminarPaciente = (id) => {
    console.log('Eliminando paciente ', id);
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados);
    // ? Lo que hace es, filtrar todos los datos registrados que son diferentes al id del que se dio click en el boton de eliminar
    // ? Despues de ello, actualiza la lista de pacientes por la que se filtro
  }
  return (
    <div className="container mx-auto mt-20">
      <div>
        {/* * <h1>{'Hola mundo'.toUpperCase()}</h1> */}
        {/* <h1>{edad}</h1> */}
        {/* De esta manera se puede poner codigo JS en un template */}

        <Header />
        <div className="mt-12 md:flex">
          <Formulario
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
          />

          <ListadoPacientes
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
          />
        </div>
        {/* Asi mismo como se escribe el archivo, tambien, la funcion tiene que ir con mayuscula */}
      </div>
    </div>
  )
}

export default App
