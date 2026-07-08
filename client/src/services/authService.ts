import api from "../api/axios";

export async function register(data: {
  fullName: string;
  username: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function login(data: { email: string; password: string }) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function getMe() {
  const token = localStorage.getItem("token");

  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateProfile(data: {
  fullName: string;
  username: string;
  bio: string;
  location: string;
  github: string;
  linkedin: string;
  linktree: string;
  portfolio: string;
}) {
  const token = localStorage.getItem("token");

  const response = await api.put("/auth/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
