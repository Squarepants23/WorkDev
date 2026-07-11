import { useState } from "react";
import { Link } from "react-router-dom";

import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import { forgotPassword } from "../services/authService";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      alert("Email wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);

      alert("Silakan cek email kamu untuk reset password.");
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim email reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-center text-3xl font-bold">
            Forgot Password
          </h1>

          <p className="mb-8 text-center text-gray-600">
            Masukkan email akun WorkDev kamu.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <p className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </section>
    </Container>
  );
}

export default ForgotPasswordPage;
