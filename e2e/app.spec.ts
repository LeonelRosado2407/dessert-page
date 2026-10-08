import { test, expect } from '@playwright/test'

test('el home muestra la marca y lleva al menú', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Dulce Tentación')
  await page.getByRole('link', { name: 'Ver el menú' }).click()
  await expect(page).toHaveURL(/\/productos$/)
  await expect(page.getByRole('heading', { name: 'Nuestro Menú' })).toBeVisible()
})

test('la búsqueda ignora acentos y se guarda en la URL', async ({ page }) => {
  await page.goto('/productos')
  await page.getByPlaceholder(/Buscar/).fill('cafe')
  await expect(page).toHaveURL(/q=cafe/)
  await expect(page.getByRole('link', { name: 'Mocha' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Brownie', exact: true })).toHaveCount(0)
})

test('un favorito aparece en el filtro de favoritos', async ({ page }) => {
  await page.goto('/productos')
  await page.getByRole('button', { name: 'Agregar a favoritos' }).first().click()
  await page.getByRole('button', { name: /Favoritos/ }).click()
  await expect(page).toHaveURL(/fav=1/)
  await expect(page.getByRole('link', { name: 'Espresso' })).toBeVisible()
  await expect(page.getByText('1 resultado')).toBeVisible()
})

test('el detalle muestra el precio y el título de la pestaña', async ({ page }) => {
  await page.goto('/productos/cappuccino')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cappuccino')
  await expect(page.getByText('$48')).toBeVisible()
  await expect(page).toHaveTitle('Cappuccino · Dulce Tentación')
})

test('rutas y productos inexistentes muestran la 404', async ({ page }) => {
  await page.goto('/no-existe')
  await expect(page.getByRole('heading', { name: 'Este postre no está en el horno' })).toBeVisible()
  await page.goto('/productos/no-existe')
  await expect(page.getByRole('heading', { name: 'No encontramos ese producto' })).toBeVisible()
})
