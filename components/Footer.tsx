import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-lime-600 py-15 flex flex-col items-center justify-center">
      <div className="flex flex-row justify-arround ">
        <div>
          <p className="text-white">
            REMA Núcleo Ressacada de Pesquisa em Meio Ambiente
          </p>
        </div>
        <div className="mx-4">
          <div className="flex flex-row">
            <p className="text-white font-bold">|</p>
            <p className="text-white"> Menu</p>
          </div>
          <Link
            href={"/"}
            className="border-b border-white text-white hover:text-gray-200 transition-colors duration-300"
          >
            {" "}
            <p className="text-white">Início</p>
          </Link>
          <Link
            href={"/calculadora"}
            className="text-white hover:text-gray-200 transition-colors duration-300"
          >
            {" "}
            <p>Calculadora de Risco</p>{" "}
          </Link>
        </div>
      </div>
      <p className="text-white text-center text-sm mt-10">
        © REMA - Núcleo Ressacada de Pesquisa em Meio Ambiente
      </p>
    </div>
  );
}

export default Footer;
