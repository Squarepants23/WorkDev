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

export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/login", data);
  return response.data;
}