function Login(){
    return(<div className="container">
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
    </div>
  );
}