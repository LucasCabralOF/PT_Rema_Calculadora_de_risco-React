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
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className=" p-2 shadow-green-900 shadow w-screen bg-white border-b-1 border-lime-600">
      <div className="">
        <div className=" border-b border-lime-600 mb-3 ">
          <div className="mx-15 flex flex-row p-1">
            <a
              href="tel:+554839998877"
              className="flex items-center gap-1 hover:text-green-600 transition-colors duration-300"
            >
              <Phone size={18} /> +55 (48) 3999-8877
            </a>
            <span className="mx-2">|</span>
            <a
              href="mailto:contato@rema.ufsc.br"
              className="flex items-center gap-1 hover:text-green-600 transition-colors duration-300"
            >
              <Mail size={18} /> contato@rema.ufsc.br
            </a>
          </div>
        </div>
        <div className=" mx-15 flex flex-row items-center">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="Logo Rema"
              width={250}
              height={100}
              className="hover:shadow-2xl duration-300"
            />
          </Link>
          <div className="">
            <Link
              href={"/calculadora"}
              className="hover:text-lime-700 text-gray-700 px-4 font-medium transition-colors duration-300 tracking-wider"
            >
              Calculadora de Risco
            </Link>
          </div>
          {session && (
            <div className="ml-auto mb-1 ">
              <Link
                href="/dashboard"
                className="text-gray-800 hover:text-lime-600 px-3 py-1  transition-colors border-green-800 border-2 rounded-lg mb-1 hover:shadow-5xl"
              >
                Dashboard
              </Link>
            </div>
          )}

          {!session && (
            <div className="ml-auto mb-1 ">
              <Link
                href="/auth"
                className="text-gray-800 hover:text-lime-600 px-3 py-1  transition-colors border-green-800 border-2 rounded-lg mb-1 hover:shadow-5xl"
              >
                login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
