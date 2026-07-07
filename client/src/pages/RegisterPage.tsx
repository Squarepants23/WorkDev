import { useState } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

import Container from "../components/Container/Container";
import Button from "../components/Button/Button";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!fullName.trim()) {
    alert("Full Name wajib diisi.");
    return;
  }

  if (!username.trim()) {
    alert("Username wajib diisi.");
    return;
  }

  if (!email.trim()) {
    alert("Email wajib diisi.");
    return;
  }

  if (password.length < 8) {
    alert("Password minimal 8 karakter.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Konfirmasi password tidak sama.");
    return;
  }

  if (!agreeTerms) {
    alert("Silakan setujui Terms & Privacy Policy.");
    return;
  }

  alert("Register berhasil (sementara, backend belum dibuat).");
}

  return (
    <Container>
      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

          <h1 className="mb-2 text-center text-3xl font-bold">
            Create Your WorkDev Account
          </h1>

          <p className="mb-8 text-center text-gray-600">
            Bergabung dengan komunitas developer WorkDev.
          </p>

          <form 
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Full Name */}
            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Username */}
            <div>
              <label className="mb-2 block font-medium">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Password */}
        <div>
          <label className="mb-2 block font-medium">
            Password
          </label>

         <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-600"
           />

           <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
           >
             {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
           </button>
         </div>
       </div>

            {/* Confirm Password */}
        <div>
          <label className="mb-2 block font-medium">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-600"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
           >
              {showConfirmPassword ? (
                <HiEyeOff size={20} />
              ) : (
                <HiEye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Terms & Privacy */}
        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-1" />

          <p className="text-gray-600">
            I agree to the{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Terms
            </button>{" "}
            &{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>

        <Button type="submit">
          Create Account
        </Button>

      </form>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>

        </div>
      </section>
    </Container>
  );
}

export default RegisterPage;