import { test, expect } from "@playwright/test";

test("Fluxo completo de navegação na documentação", async ({ page }) => {
  // 1. Entrar no site
  await page.goto("https://playwright.dev/");

  // 2. Checar se o título está OK
  await expect(page).toHaveTitle(/Playwright/);

  // 3. Navegar para a documentação
  await page.getByRole("link", { name: /Get started/i }).click();

  // 4. Verificar se entrou na página certa
  await expect(page.getByRole("heading", { name: /Installation/i })).toBeVisible();

  // 5. Navegar até "Writing tests"
  await page.getByRole("link", { name: /Writing tests/i }).click();

  // 6. Confirmar que o conteúdo carregou
  await expect(page.locator("h1")).toContainText("Writing tests");

  // 7. Voltar para Home
  await page.getByRole("link", { name: "Playwright" }).click();

  // 8. Validar que voltou mesmo para Home
  await expect(page).toHaveURL("https://playwright.dev/");
});
