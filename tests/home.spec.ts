import { test, expect } from "@playwright/test";

test.describe("Navegação principal do site", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("deve exibir o cabeçalho com os links principais", async ({ page }) => {
    const nav = page.getByRole("navigation").first();

    
    const links = ["Início", "Calculadora", "Quem somos", "Login"];
    for (const link of links) {
      await expect(
        nav.getByRole("link", { name: new RegExp(link, "i") })
      ).toBeVisible();
    }
  });

  test("deve navegar para a página Inicial", async ({ page }) => {
   
    const nav = page.getByRole("navigation").first();
    await nav.getByRole("link", { name: /início/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("deve navegar para a página Calculadora", async ({ page }) => {
   
    const nav = page.getByRole("navigation").first();
    await nav.getByRole("link", { name: /calculadora/i }).click();
    await expect(page).toHaveURL(/\/calculadora/);
  });

  test("deve navegar para a página Quem Somos", async ({ page }) => {
    
    const nav = page.getByRole("navigation").first();
    await nav.getByRole("link", { name: /quem somos/i }).click();
    await expect(page).toHaveURL(/\/sobre|\/quem-somos/);
  });

  test("deve navegar para a página de Login", async ({ page }) => {
    
    const nav = page.getByRole("navigation").first();
    await nav.getByRole("link", { name: /login/i }).click();
    
    
    await expect(page).toHaveURL(/\/auth/);
  });
});