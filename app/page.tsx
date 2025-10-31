import {Divider} from "antd";


export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-t from-white to-lime-100 flex flex-col py-10 px-4">
      <div className="bg-white rounded-lg shadow p-6  sm:w-3/4 lg:w-1/2 mx-auto">
        <h1 className="text-center text-gray-800 text-3xl font-bold mb-8">
          Sobre a Calculadora de Risco
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Esta ferramenta tem como objetivo avaliar o{" "}
          <strong>risco não-cancerígeno</strong> à saúde humana decorrente da
          exposição a contaminantes.
        </p>
        <Divider></Divider>
        <p className="text-gray-700 mb-6">
          O processo de cálculo é dividido em duas etapas principais.
        </p>

        <div className="mb-6 p-5 bg-gray-50 rounded-lg ">
          <h2 className="text-2xl font-semibold text-lime-700 mb-3">
            Passo 1: Cálculo da Ingestão (I)
          </h2>
          <p className="text-gray-700 mb-4">
            Primeiro, estimamos o valor da Ingestão (I), que representa a
            quantidade de um contaminante absorvida por uma pessoa. A fórmula
            utilizada é:
          </p>
          <div className="text-center bg-gray-50 p-4 rounded-md my-4 overflow-x-auto">
            <code className="text-lg text-gray-800 font-mono">
              I = C * (IR * EF * ED) / (BW * AT)
            </code>
          </div>
          <p className="text-gray-700 mb-2">
            Para este cálculo, a calculadora solicita que o usuário insira os
            seguintes parâmetros:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
            <li>
              <strong>C:</strong> Concentração do contaminante no meio
            </li>
            <li>
              <strong>IR:</strong> Taxa de ingestão ou contato
            </li>
            <li>
              <strong>EF:</strong> Frequência da exposição
            </li>
            <li>
              <strong>ED:</strong> Duração da exposição
            </li>
            <li>
              <strong>BW:</strong> Peso corporal
            </li>
            <li>
              <strong>AT:</strong> Tempo de média
            </li>
          </ul>
        </div>

        <div className="mb-6 p-5 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-lime-700 mb-3">
            Passo 2: Quociente de Risco (QR)
          </h2>
          <p className="text-gray-700 mb-4">
            Com o valor da Ingestão (I) calculado, o próximo passo é determinar
            o Quociente de Risco (QR). Isso é feito comparando-se a ingestão com
            a Dose de Referência (RfD) do contaminante.
          </p>
          <div className="text-center bg-gray-50 p-4 rounded-md my-4">
            <code className="text-lg text-gray-800 font-mono">
              QR = I / RfD
            </code>
          </div>
          <p className="text-gray-700">
            A <strong>Dose de Referência (RfD)</strong> é um valor toxicológico
            específico para cada substância, que define o nível máximo de
            exposição sem efeitos adversos. A calculadora obtém esse valor
            automaticamente da nossa base de dados quando você seleciona o
            contaminante.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Resultado
          </h2>
          <p className="text-gray-700 mb-4">
            O resultado final apresentado pela calculadora é o valor do
            Quociente de Risco (QR). A interpretação é direta:
          </p>
          <div className="bg-lime-50 border-l-4 border-lime-500 p-4 rounded-r-lg">
            <p className="font-semibold text-lime-800 text-lg">
              Se QR for maior que 1, existe um potencial risco à saúde.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
