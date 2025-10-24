import { test, expect } from "@playwright/test";

// --- ATENÇÃO ---
// Defina a URL base do seu projeto.
// Se estiver rodando localmente, será algo como 'http://localhost:3000'
const BASE_URL = "http://localhost:3001";

test("Fluxo de navegação principal (Início, Calculadora, Perfil)", async ({
  page,
}) => {
  // 1. Entrar no site (página Início)
  await page.goto(BASE_URL);

  // 2. Checar se o título está OK (Estou assumindo "REMA" pelo logo)
  //    Adapte este 'await' para o <title> real da sua home page
  await expect(page).toHaveTitle(/REMA/);
  //    Verifica se está na URL raiz
  await expect(page).toHaveURL(BASE_URL + "/");

  // 3. Navegar para a Calculadora
  await page.getByRole("link", { name: /calculadora/i }).click();

  // 4. Verificar se entrou na página da calculadora
  //    (Usando o H1 do seu componente Calculadora)
  await expect(
    page.getByRole("heading", { name: /Calculadora de Risco Não-Cancerígeno/i }),
  ).toBeVisible();
  //    Verifica se a URL mudou para /calculadora (ou o nome da sua rota)
  await expect(page).toHaveURL(BASE_URL + "/calculadora");

  // 5. Navegar para o Perfil
  await page.getByRole("link", { name: /Perfil/i }).click();

  // 6. Confirmar que a página de Perfil carregou
  //    (Assumindo que a página de perfil tem um H1 "Perfil" e a rota /perfil)
  await expect(page.getByRole("heading", { name: /Perfil/i })).toBeVisible();
  await expect(page).toHaveURL(BASE_URL + "/perfil");

  // 7. Voltar para Home clicando em "Início"
  await page.getByRole("link", { name: /Início/i }).click();

  // 8. Validar que voltou mesmo para Home
  await expect(page).toHaveURL(BASE_URL + "/");
  //    (Opcional: checar se um elemento da home, como o "conteúdo", é visível)
  await expect(page.getByText("conteúdo")).toBeVisible();
});