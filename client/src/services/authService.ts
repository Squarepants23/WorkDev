import api from "../api/axios";
import axios from "axios";

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

export async function forgotPassword(email: string) {
  const response = await fetch(
    "http://localhost:5000/api/auth/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function resetPassword(
  token: string,
  password: string,
) {
  const response = await fetch(
    `http://localhost:5000/api/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
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
  developerRole: string;
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

export async function uploadAvatar(file: File) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("avatar", file);

  const response = await axios.post(
    "http://localhost:5000/api/auth/avatar",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
