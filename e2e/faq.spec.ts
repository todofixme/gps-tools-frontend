import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

test.describe('FAQ page', () => {
  test('shows claim in english', async ({ page }) => {
    await page.goto('/faq')

    await expect(page).toHaveTitle(/GPS-Tools/)

    const backendVersion = page.locator('#faqSubtitle')
    await expect(backendVersion).toHaveText('What is the app useful for?!')
  })

  test('shows claim in german', async ({ page }) => {
    await page.goto('/faq')

    await expect(page).toHaveTitle(/GPS-Tools/)

    await page.click('[aria-label="Language Switcher"]')

    const backendVersion = page.locator('#faqSubtitle')
    await expect(backendVersion).toHaveText('Warum das alles?!')
  })

  test('should not have accessibility issues', async ({ page }) => {
    await page.goto('/faq')

    await page.locator('#root main').waitFor()

    const axe = new AxeBuilder({ page })

    const accessibilityScanResults = await axe.include('#root').analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
