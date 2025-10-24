import { test, expect } from "@playwright/test";

// --- ATENÇÃO ---
// Defina a URL base do seu projeto.
const BASE_URL = "http://localhost:3000";

test("Fluxo de navegação principal (Início, Calculadora, Perfil)", async ({
  page,
}) => {
  // 1. Entrar no site (página Início)
  await page.goto(BASE_URL);

  // 2. Checar se o título está OK
  await expect(page).toHaveTitle(/REMA/);
  await expect(page).toHaveURL(BASE_URL + "/");

  // 3. Navegar para a Calculadora
  // --- CORREÇÃO AQUI ---
  // Usamos 'name: "calculadora"' (exatamente como no link) e 'exact: true'
  await page.getByRole("link", { name: "calculadora", exact: true }).click();

  // 4. Verificar se entrou na página da calculadora
  await expect(
    page.getByRole("heading", { name: /Calculadora de Risco Não-Cancerígeno/i }),
  ).toBeVisible();
  await expect(page).toHaveURL(BASE_URL + "/calculadora");

  // 5. Navegar para o Perfil
  // --- CORREÇÃO AQUI ---
  // Aplicando a mesma lógica para o link de Perfil
  await page.getByRole("link", { name: "Perfil", exact: true }).click();

  // 6. Confirmar que a página de Perfil carregou
  await expect(page.getByRole("heading", { name: /Perfil/i })).toBeVisible();
  await expect(page).toHaveURL(BASE_URL + "/perfil");

  // 7. Voltar para Home clicando em "Início"
  // --- CORREÇÃO AQUI ---
  // Aplicando a mesma lógica para o link de Início
  await page.getByRole("link", { name: "Início", exact: true }).click();

  // 8. Validar que voltou mesmo para Home
  await expect(page).toHaveURL(BASE_URL + "/");
  await expect(page.getByText("conteúdo")).toBeVisible();
});