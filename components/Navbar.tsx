"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import type { auth } from "../lib/auth";

type Session = typeof auth.$Infer.Session;

export default function Navigation({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <nav className="w-screen bg-white shadow">
      <div className="flex justify-between items-center px-5 py-3 border-b border-lime-600 text-xs text-gray-600 md:px-25 ">
        <div className="flex items-center gap-4 ">
          <a
            href="tel:+554837212132"
            className="flex items-center gap-1 hover:text-green-600"
          >
            <Phone size={12} /> +55 48 3721-2132
          </a>
          <span>|</span>
          <a
            href="mailto:contato@rema.ufsc.br"
            className="flex items-center gap-1 hover:text-green-600"
          >
            <Mail size={12} /> contato@rema.ufsc.br
          </a>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Link href="mailto:contato@rema.ufsc.br">
            <Mail size={16} />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between px-25 py-3">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo Rema"
            width={250}
            height={100}
            className="hover:shadow-2xl duration-300 "
          />
        </Link>

        <div className="flex items-center gap-6 text-lg font-normal tracking-widest">
          <Link href="/" className="text-gray-700 hover:text-lime-700 ">
            Início
          </Link>

          <Link
            href="/calculadora"
            className="text-gray-700 hover:text-lime-700 "
          >
            calculadora
          </Link>
          <Link
            href="https://rema.ufsc.br/quem-somos"
            className="text-gray-700 hover:text-lime-700 "
          >
            Quem somos
          </Link>

          {session ? (
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-lime-700  "
            >
              Perfil
            </Link>
          ) : (
            <Link
              href="/auth"
              className="px-3 py-1 border-2 border-green-800 rounded-lg text-gray-800 hover:text-lime-600 hover:shadow-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
