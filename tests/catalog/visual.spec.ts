import { expect, test } from '@playwright/test';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
  SCREENSHOT_NAMES,
  TABLET_VIEWPORT,
  setupViewport,
} from '../utils/test-utils';

const { describe, beforeEach } = test;

describe('Catalog — visual regression', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/');
    // Ждём загрузки шрифтов и картинок
    await page.waitForLoadState('networkidle');
  });

  // ─── Вьюпорты ─────────────────────────────────────────────────────────────

  test('1. Desktop 1920×1893 — полная страница (эталон)', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_DESKTOP, {
      fullPage: true,
    });
  });

  test('2. Tablet 768×1024 — полная страница', async ({ page }) => {
    await setupViewport(page, TABLET_VIEWPORT);
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_TABLET, {
      fullPage: true,
    });
  });

  test('3. Mobile 375×812 — полная страница', async ({ page }) => {
    await setupViewport(page, MOBILE_VIEWPORT);
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_MOBILE, {
      fullPage: true,
    });
  });

  // ─── Фильтры ──────────────────────────────────────────────────────────────

  test('4. Фильтр «All» — активное состояние', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await page.click('.filter__tab[data-category="All"]');
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_FILTER_ALL, {
      fullPage: true,
    });
  });

  test('5. Фильтр «Marketing»', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await page.click('.filter__tab[data-category="Marketing"]');
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_FILTER_MARKETING, {
      fullPage: true,
    });
  });

  test('6. Фильтр «Management»', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await page.click('.filter__tab[data-category="Management"]');
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_FILTER_MANAGEMENT, {
      fullPage: true,
    });
  });

  test('7. Фильтр «HR & Recruting»', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await page.click('.filter__tab[data-category="HR & Recruting"]');
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_FILTER_HR, {
      fullPage: true,
    });
  });

  test('8. Фильтр «Design»', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await page.click('.filter__tab[data-category="Design"]');
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_FILTER_DESIGN, {
      fullPage: true,
    });
  });

  test('9. Фильтр «Development»', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await page.click('.filter__tab[data-category="Development"]');
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_FILTER_DEVELOPMENT, {
      fullPage: true,
    });
  });

  // ─── Поиск ────────────────────────────────────────────────────────────────

  test('10. Поиск «design» — 2 результата', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await page.fill('#search-input', 'design');
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_SEARCH_RESULTS, {
      fullPage: true,
    });
  });

  test('11. Поиск без результатов — пустое состояние', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    await page.fill('#search-input', 'xyznotexist');
    await expect(page).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_SEARCH_EMPTY, {
      fullPage: true,
    });
  });

  // ─── Компоненты ───────────────────────────────────────────────────────────

  test('12. Первая карточка — снапшот компонента', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    const card = page.locator('.card').first();
    await expect(card).toBeVisible();
    await expect(card).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_CARD);
  });

  test('13. Карточка — hover-эффект', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    const card = page.locator('.card').first();
    await card.hover();
    await expect(card).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_CARD_HOVER);
  });

  test('14. Load More — кнопка видима при 9 карточках', async ({ page }) => {
    await setupViewport(page, DESKTOP_VIEWPORT);
    const btn = page.locator('#load-more-btn');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveScreenshot(SCREENSHOT_NAMES.CATALOG_LOAD_MORE);
  });
});
