// app/login/page.tsx
"use client"; // WAJIB! Untuk menggunakan state dan event handler

import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook untuk navigasi
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Credential statis sesuai requirement
    const validUsername = "user";
    const validPassword = "password123";
    const initialUserName = "Fery Andika"; // Nama default user

    if (username === validUsername && password === validPassword) {
      // Simpan data user ke localStorage
      const userData = { name: initialUserName };
      localStorage.setItem("user-data", JSON.stringify(userData));

      // Arahkan ke halaman dashboard
      router.push("/dashboard");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={200}
            className="h-20 w-20"
          />
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="user"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="password123"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 hover:cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
