import { useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import { resetPassword } from "../services/authService";

function ResetPasswordPage() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password tidak sama.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(token!, password);

      alert("Password berhasil diubah.");
    } catch (error) {
      console.error(error);

      alert("Reset password gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-center text-3xl font-bold">
            Reset Password
          </h1>

          <p className="mb-8 text-center text-gray-600">
            Masukkan password baru.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="password"
              placeholder="Password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

            <input
              type="password"
              placeholder="Konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Password"}
            </Button>
          </form>
        </div>
      </section>
    </Container>
  );
}

export default ResetPasswordPage;
