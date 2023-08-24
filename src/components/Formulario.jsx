import { useState, useEffect } from 'react'
import Error from './Error';

/*
useEffect(() => {
  console.log('El componente esta listo');
}, []) */

// cliente contiene el valor del estado
// setCliente modifica el valor del estado
/* const [cliente, setCliente] = useState([]);
   const [total, setTotal] = useState(0);
   const [modal, setModal] = useState(false);*/


const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (pacientes.length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(17).substring(2);
    const fecha = Date.now().toString(17);
    return random + fecha
  } // ? Genera un id totalmente random y unico para cada formulario

  const handleSubmit = (e) => {

    e.preventDefault();
    //Validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay al menos un campo vacio');
      setError(true);
      return;
    }
    setError(false);

    // Objeto paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id: generarId()
    }

    if(paciente.id){
      // Editando Registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id ===
        paciente.id ? objetoPaciente : pacienteState)
        setPacientes(pacientesActualizados)
    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])
    }

    // setPacientes([...pacientes, objetoPaciente])
    // De esta manera se puede pasar un objeto para que no reescriba el que se mando, sino, haga una copia y lo mande

    // * Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        class="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

        {error && <Error mensaje="Todos los campos son obligatorios" />}
        <div className="mt-2">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Fecha de alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          <textarea
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md p-2 resize-none"
            id="sintomas" rows="8"
            placeholder="Describe los sintomas..."
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 rounded-md text-white cursor-pointer uppercase font-bold
        hover:bg-indigo-700 transition-colors mt-5"
          value={paciente.id ? 'Editar Paciente' : 'Agregar paciente'}
        />
      </form>
    </div>
  )
}

export default Formulario