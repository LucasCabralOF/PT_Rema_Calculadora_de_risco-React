import { test, expect } from "@playwright/test";

const PAGE_URL = "/calculadora";

test.describe("Página da Calculadora de Risco", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
  });

  test("deve calcular e exibir o risco com sucesso", async ({ page }) => {
    const contaminantInput = page.getByLabel("Selecione o contaminante:");

    await contaminantInput.click();
    await contaminantInput.fill("Acetone");

    await page.getByRole("listitem").filter({ hasText: "Acetone" }).click();

    await expect(contaminantInput).toHaveValue("Acetone");

    await page.getByLabel(/C \(mg\/L ou mg\/kg\):/).fill("0.05");
    await page.getByLabel(/IR \(L\/dia ou kg\/dia\):/).fill("2");
    await page.getByLabel(/EF \(dias\/ano\):/).fill("350");
    await page.getByLabel(/ED \(anos\):/).fill("30");
    await page.getByLabel(/BW \(kg\):/).fill("70");
    await page.getByLabel(/AT \(dias\):/).fill("10950");

    await page.getByRole("button", { name: "Calcular" }).click();

    const errorBox = page.locator("div.text-red-700");
    await expect(errorBox).not.toBeVisible();

    await expect(page.getByText("Resultado da Análise:")).toBeVisible();
    await expect(page.getByText(/Ingestão \(I\):/)).toBeVisible();
    await expect(page.getByText(/Quociente de Risco \(QR\):/)).toBeVisible();
    await expect(page.getByText(/Conclusão:/)).toBeVisible();
  });

  test("deve exibir erro se o contaminante não for encontrado", async ({
    page,
  }) => {
    const fakeContaminant = "Kryptonita";

    await page.getByLabel("Selecione o contaminante:").fill(fakeContaminant);

    await page.getByLabel(/C \(mg\/L ou mg\/kg\):/).fill("1");
    await page.getByLabel(/IR \(L\/dia ou kg\/dia\):/).fill("1");
    await page.getByLabel(/EF \(dias\/ano\):/).fill("1");
    await page.getByLabel(/ED \(anos\):/).fill("1");
    await page.getByLabel(/BW \(kg\):/).fill("1");
    await page.getByLabel(/AT \(dias\):/).fill("1");

    await page.getByRole("button", { name: "Calcular" }).click();

    await expect(page.getByText("Resultado da Análise:")).not.toBeVisible();

    const errorText = `Erro: O contaminante "${fakeContaminant}" não foi encontrado.`;
    await expect(page.getByText(errorText)).toBeVisible();
  });

  test("deve limpar todos os campos e resultados ao clicar em Limpar", async ({
    page,
  }) => {
    const contaminantInput = page.getByLabel("Selecione o contaminante:");
    const cInput = page.getByLabel(/C \(mg\/L ou mg\/kg\):/);

    await contaminantInput.fill("Acetone"); // Não precisa selecionar, só preencher
    await cInput.fill("1.23");

    await page.getByRole("button", { name: "Limpar" }).click();

    await expect(contaminantInput).toHaveValue("");
    await expect(cInput).toHaveValue("");

    await contaminantInput.click();
    await contaminantInput.fill("Acetone");
    await page.getByRole("listitem").filter({ hasText: "Acetone" }).click();
    await cInput.fill("0.05");
    await page.getByLabel(/IR/).fill("2");
    await page.getByLabel(/EF/).fill("350");
    await page.getByLabel(/ED/).fill("30");
    await page.getByLabel(/BW/).fill("70");
    await page.getByLabel(/AT/).fill("10950");

    await page.getByRole("button", { name: "Calcular" }).click();

    const resultBox = page.getByText("Resultado da Análise:");
    await expect(resultBox).toBeVisible();

    await page.getByRole("button", { name: "Limpar" }).click();

    await expect(resultBox).not.toBeVisible();
    await expect(contaminantInput).toHaveValue(""); // E o input limpou
  });
});
