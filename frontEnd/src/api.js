export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Error de autenticación");
  }
  return data;
}

export async function getProfile(token) {
  const res = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Error al obtener perfil");
  }
  return data;
}

export async function register({ name, email, password }) {
  const res = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Error al registrar usuario");
  }
  return data;
}

export async function fetchProducts({ limit = 200 } = {}) {
  const url = new URL(`${API_BASE_URL}/products`);
  url.searchParams.set("limit", limit);
  url.searchParams.set("includeCategory", "true");
  url.searchParams.set("includeSubcategory", "true");

  const res = await fetch(url.toString());
  const payload = await res.json();
  if (!res.ok) {
    throw new Error(payload?.error || "Error al obtener productos");
  }

  return payload.data || [];
}