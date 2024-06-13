import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Home page', () => {
  test('shows claim in english', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/GPS-Tools/)

    const backendVersion = page.locator('#introHeader')
    await expect(backendVersion).toHaveText('This app allows you to:')
  })

  test('shows claim in german', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/GPS-Tools/)

    await page.selectOption('[aria-label="Language Selector"]', 'DE')

    const backendVersion = page.locator('#introHeader')
    await expect(backendVersion).toHaveText('Diese Anwendung bietet folgende Funktionalitäten:')
  })

  test('should not have accessibility issues', async ({ page }) => {
    await page.goto('/')

    await page.locator('#root main').waitFor()

    const axe = new AxeBuilder({ page })

    const accessibilityScanResults = await axe.include('#root').analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
