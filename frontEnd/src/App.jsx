import { useEffect, useState } from "react";
import {
  login,
  getProfile,
  API_BASE_URL,
  register,
  fetchProducts,
} from "./api";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(email, password);
      setToken(data.token);
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await register({ name, email, password });
      setToken(data.token);
      setUser(data.user);
      setShowRegister(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoadProfile = async () => {
    setError(null);
    try {
      const data = await getProfile(token);
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadProducts = async () => {
    try {
      setProductsError(null);
      setProductsLoading(true);
      const items = await fetchProducts();
      setProducts(items);
    } catch (err) {
      setProductsError(err.message);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container">
      <h1>Login Test</h1>
      <p className="hint">Backend: {API_BASE_URL}</p>

      {!token ? (
        <form className="card" onSubmit={showRegister ? handleRegister : handleSubmit}>
          <div className="actions" style={{ justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setShowRegister((v) => !v)}>
              {showRegister ? "Tengo cuenta" : "Crear cuenta"}
            </button>
          </div>
          {showRegister && (
            <label>
              Nombre
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />
          </label>
          <button type="submit">{showRegister ? "Registrarme" : "Ingresar"}</button>
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <div className="card">
          <p>
            Login exitoso. Token guardado.
          </p>
          {user && (
            <pre className="pre">
              {JSON.stringify(user, null, 2)}
            </pre>
          )}
          <div className="actions">
            <button onClick={handleLoadProfile}>Cargar perfil</button>
            <button onClick={() => { setToken(null); setUser(null); }}>Salir</button>
          </div>
        </div>
      )}

      <section className="products">
        <div className="products-header">
          <h2>Productos</h2>
          <button onClick={loadProducts}>Actualizar</button>
        </div>
        {productsLoading && <p>Cargando productos...</p>}
        {productsError && <p className="error">{productsError}</p>}
        {!productsLoading && !productsError && (
          <ul className="product-list">
            {products.length === 0 && <li>No hay productos disponibles.</li>}
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <h3>{product.name}</h3>
                <p>{product.description || "Sin descripción"}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
