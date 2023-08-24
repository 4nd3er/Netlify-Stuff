function Header() {

    return (
        <h1 className="font-black text-5xl text-center mx-auto md:w-2/3">
            {/* "w-1/2" es la mitad del espacio de texto */}
            {/* md sirve para hacer un media query, que sea responsive */}
            Seguimiento de pacientes {" "}
            <span className="text-indigo-600 ">Veterinaria</span>
        </h1>
    )

}

export default Header