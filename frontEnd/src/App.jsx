import { useEffect, useState } from "react";
import {
  login,
  getProfile,
  API_BASE_URL,
  register,
  fetchProducts,
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
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
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartError, setCartError] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(null);

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

  const loadCart = async (authToken = token) => {
    if (!authToken) {
      setCartItems([]);
      setCartTotal(0);
      return;
    }
    try {
      setCartError(null);
      setCartSuccess(null);
      setCartLoading(true);
      const data = await fetchCart(authToken);
      setCartItems(data?.cart?.items || []);
      setCartTotal(data?.total || 0);
    } catch (err) {
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (token) {
      loadCart(token);
    } else {
      setCartItems([]);
      setCartTotal(0);
    }
  }, [token]);

  const withCartReload = async (fn) => {
    if (!token) {
      setCartError("Debes iniciar sesion para usar el carrito");
      return;
    }
    try {
      setCartError(null);
      setCartSuccess(null);
      setCartLoading(true);
      await fn();
      await loadCart();
      setCartSuccess("Carrito actualizado");
    } catch (err) {
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToCart = (productId) =>
    withCartReload(() => addCartItem({ token, productId, quantity: 1 }));

  const handleIncrease = (item) =>
    withCartReload(() =>
      updateCartItem({ token, itemId: item.id, quantity: item.quantity + 1 })
    );

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      return withCartReload(() => removeCartItem({ token, itemId: item.id }));
    }
    return withCartReload(() =>
      updateCartItem({ token, itemId: item.id, quantity: item.quantity - 1 })
    );
  };

  const handleRemove = (itemId) =>
    withCartReload(() => removeCartItem({ token, itemId }));

  const handleClear = () => withCartReload(() => clearCart({ token }));

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
                <div className="product-actions">
                  <span className="price">${Number(product.price || 0).toFixed(2)}</span>
                  <button onClick={() => handleAddToCart(product.id)} disabled={!token || cartLoading}>
                    Agregar al carrito
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="cart">
        <div className="cart-header">
          <h2>Carrito</h2>
          <button onClick={() => loadCart()} disabled={!token || cartLoading}>
            Refrescar
          </button>
        </div>
        {!token && <p>Inicia sesion para ver tu carrito.</p>}
        {cartError && <p className="error">{cartError}</p>}
        {cartSuccess && <p className="success">{cartSuccess}</p>}
        {cartLoading && <p>Cargando carrito...</p>}
        {token && !cartLoading && cartItems.length === 0 && !cartError && (
          <p>El carrito esta vacio.</p>
        )}
        {token && cartItems.length > 0 && (
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const name = item.product?.name || "Producto";
                  const price = Number(item.unitPrice);
                  const subtotal = price * item.quantity;
                  return (
                    <tr key={item.id}>
                      <td>{name}</td>
                      <td className="quantity-cell">
                        <button onClick={() => handleDecrease(item)} disabled={cartLoading}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncrease(item)} disabled={cartLoading}>
                          +
                        </button>
                      </td>
                      <td>${price.toFixed(2)}</td>
                      <td>${subtotal.toFixed(2)}</td>
                      <td>
                        <button onClick={() => handleRemove(item.id)} disabled={cartLoading}>
                          Quitar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total</td>
                  <td colSpan="2">${Number(cartTotal).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            <div className="cart-actions">
              <button onClick={handleClear} disabled={cartLoading}>
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
