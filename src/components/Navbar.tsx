// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import { getUser } from "@/lib/auth";
import { ArrowDownIcon, LogoutIcon, ProfileIcon } from "./Icons";

export default function Navbar() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cek localStorage hanya di sisi client
    const userData = getUser();
    if (userData) {
      setUser(userData);
    } else {
      // Jika tidak ada data user dan tidak di halaman login, paksa ke login
      if (pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [pathname, router]); // Dijalankan saat path berubah

  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user-data");
    setUser(null);
    router.push("/login");
  };

  // Jangan tampilkan Navbar di halaman login
  if (pathname === "/login") {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={200}
              className="h-10 w-10"
            />
            <span className="font-bold text-xl text-[#3871c1] cursor-default hidden sm:block">
              Task Manager
            </span>
          </div>
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all hover:cursor-pointer"
                >
                  <span>{user.name}</span>
                  <ArrowDownIcon />
                </button>
                {/* Dropdown Menu (murni Tailwind) */}
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ProfileIcon />
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                    >
                      <LogoutIcon />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
