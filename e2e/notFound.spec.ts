import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test.describe('Not found page', () => {
  test('page in english', async ({ page }) => {
    await page.goto('/foobar')
    await expect(page).toHaveTitle(/GPS-Tools/)

    const heading = page.locator('h1')
    await expect(heading).toHaveText('Not found')
  })

  test('page in german', async ({ page }) => {
    await page.goto('/foobar')
    await expect(page).toHaveTitle(/GPS-Tools/)
    
    await page.click('[aria-label="Language Switcher"]')

    const heading = page.locator('h1')
    await expect(heading).toHaveText('Nicht gefunden')
  })

  test('should not have accessibility issues', async ({ page }) => {
    await page.goto('/foobar')
    await page.locator('#root main').waitFor()

    const axe = new AxeBuilder({ page })
    const accessibilityScanResults = await axe.include('#root').analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
