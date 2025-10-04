import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 


const ListaUsuarios = ({ usuarios, mostrarDetalles }) => (
  <ul className="list-group">
    {usuarios.map((usuario, i) => (
      <li
        key={usuario.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
         <div>
          {i}. {usuario.name}
        </div>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => mostrarDetalles(usuario)}
        >
          Ver Detalles
        </button>
      </li>
    ))}
  </ul>
);

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [indexEliminar, setIndexEliminar] = useState("");
  

  const cargarUsuarios = async () => {
    try {
      const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
      const datos = await respuesta.json();
      setUsuarios(datos);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const mostrarDetalles = (usuario) => {
    const { name, email, address } = usuario;
    const { city } = address;
    alert(`Nombre: ${name}\nEmail: ${email}\nCiudad: ${city}`);
  };

  const eliminarPorIndice = () => {
    const idx = parseInt(indexEliminar);
    if (!isNaN(idx) && idx >= 0 && idx < usuarios.length) {
      setUsuarios((prev) => prev.filter((_, i) => i !== idx));
      setIndexEliminar("");
    } else {
      alert("Índice inválido");
    }
  };

  return (
    <>
     <div className="position-absolute top-50 start-50 translate-middle">
      <h2 className="mb-3">Usuarios App</h2>

      <div className="mb-3 d-flex gap-2 flex-wrap">

        <button className="btn btn-primary" onClick={cargarUsuarios}>
          Recargar Usuarios
        </button>
        <input
          type="number"
          className="form-control"
          placeholder="Índice a eliminar"
          style={{ maxWidth: "150px" }}
          value={indexEliminar}
          onChange={(e) => setIndexEliminar(e.target.value)}
        />
        <button className="btn btn-danger" onClick={eliminarPorIndice}>
          Eliminar
        </button>
      </div>

      <ListaUsuarios usuarios={usuarios} mostrarDetalles={mostrarDetalles} />
    </div>
    </>
    
  );
};

export default App;








ListaUsuarios.propTypes = {
  usuarios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
    })
  ).isRequired,
  mostrarDetalles: PropTypes.func.isRequired,
};
