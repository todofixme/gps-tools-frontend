import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test.describe('About page', () => {
  test('shows backend version', async ({ page }) => {
    await page.goto('/about')

    await expect(page).toHaveTitle(/GPS-Tools/)

    const heading = page.locator('h1')
    await expect(heading).toHaveText('GPS-Tools')

    const backendVersion = page.locator('#backendVersion')
    await expect(backendVersion).toHaveText('1.2.3') // as provided by msw
  })

  test('should not have accessibility issues', async ({ page }) => {
    await page.goto('/about')

    await page.locator('#root main').waitFor()

    const axe = new AxeBuilder({ page })

    const accessibilityScanResults = await axe.include('#root').analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
