import { useState } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa";

import Container from "../components/Container/Container";
import Button from "../components/Button/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

          <h1 className="mb-2 text-center text-3xl font-bold">
            Welcome to WorkDev
          </h1>

          <p className="mb-8 text-center text-gray-600">
            Login ke akun WorkDev.
          </p>

          <form className="space-y-5">

            <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <Button>
              Login
            </Button>

            <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300"></div>

            <span className="text-sm text-gray-500">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium transition hover:bg-gray-100"
          >
            <FaGoogle
          className="text-red-500" />
            Continue with Google
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium transition hover:bg-gray-100"
          >
            <FaGithub
          className="text-black" />
            Continue with GitHub
          </button>

          </form>

          <p className="mt-6 text-center text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </section>
    </Container>
  );
}

export default LoginPage;