import { test, expect } from "@playwright/test";


const PAGE_URL = "/auth";

test.describe("Página de Autenticação", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
  });

 
  test("deve exibir o formulário de Sign In por padrão", async ({ page }) => {
    
    await expect(
      page.getByRole("heading", { name: "Bem vindo de Volta" })
    ).toBeVisible();

    
    await expect(
      page.getByRole("button", { name: "Entrar" })
    ).toBeVisible();

    
    await expect(page.getByLabel("Nome completo")).not.toBeVisible();
  });

  
  test("deve alternar para o formulário de Sign Up (Cadastro)", async ({
    page,
  }) => {
    
    await page
      .getByRole("button", { name: "Não tem uma conta? Cadastre-se" })
      .click();

    
    await expect(
      page.getByRole("heading", { name: "Crie sua Conta" })
    ).toBeVisible();

    
    await expect(page.getByLabel("Nome completo")).toBeVisible();

    
    await expect(
      page.getByRole("button", { name: "Cadastre-se" })
    ).toBeVisible();
  });

  
  test("deve alternar de volta para o formulário de Sign In", async ({
    page,
  }) => {
    
    await page
      .getByRole("button", { name: "Não tem uma conta? Cadastre-se" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Crie sua Conta" })
    ).toBeVisible();

    
    await page
      .getByRole("button", { name: "Já tem uma conta? Entrar" })
      .click();

   
    await expect(
      page.getByRole("heading", { name: "Bem vindo de Volta" })
    ).toBeVisible();
    await expect(page.getByLabel("Nome completo")).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Entrar" })
    ).toBeVisible();
  });

  
  test("deve exibir erros de validação (Zod) no Sign In", async ({ page }) => {
   
    await page.getByLabel("Email").fill("email-invalido");
    
    
    await page.getByLabel("Senha").fill("senha-valida-123");

    
    await page.getByRole("button", { name: "Entrar" }).click();

    
    await page.getByLabel("Email").fill("email.valido@teste.com");
    
    
    await page.getByLabel("Senha").fill("");

    
    await page.getByRole("button", { name: "Entrar" }).click();

  });
  
  test("deve exibir erro de 'Invalid email or password' do servidor", async ({
    page,
  }) => {
    
    await page.getByLabel("Email").fill("usuario@naoexiste.com");
    
    await page.getByLabel("Senha").fill("senha-incorreta-123");

    
    await page.getByRole("button", { name: "Entrar" }).click();

    
    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
});