import { test, expect, type Page } from '@playwright/test';

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment',
];

test.beforeEach(async ({ page }) => {
  await page.goto('https://mui-test-br.vercel.app/');
});

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.locator('#input');

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Make sure the list only has one todo item.
    const todoItem = page.locator('ul .MuiListItem-root .MuiTypography-root');
    await expect(todoItem).toHaveText([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Make sure the list now has two todo items.
    await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
  });

  test('should clear text input field when an item is added', async ({
    page,
  }) => {
    // create a new todo locator
    const newTodo = page.locator('#input');

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
  });

  test('should append new items to the bottom of the list', async ({
    page,
  }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // create a todo count locator
    const todoCount = page.getByLabel('buttons panel').locator('span');

    // Check test using different methods.
    await expect(page.getByText('3 items left')).toBeVisible();
    await expect(todoCount).toHaveText('3 items left');
    await expect(todoCount).toContainText('3');
    await expect(todoCount).toHaveText(/3/);

    // Check all items in one call.
    const todoItem = page.locator('ul .MuiListItem-root .MuiTypography-root');
    await expect(todoItem).toHaveText(TODO_ITEMS);
  });
});

// test.describe('Completed', () => {
//   test.beforeEach(async ({ page }) => {
//     await createDefaultTodos(page);
//   });

//   test('should allow me to mark all items as completed', async ({ page }) => {
//     // Ensure all todos have 'completed',
//     const todoItem1 = page.getByTestId('data-testid').nth(0);
//     const todoItem2 = page.getByTestId('data-testid').nth(1);
//     const todoItem3 = page.getByTestId('data-testid').nth(2);

//     await todoItem1.click();
//     await todoItem2.click();
//     await todoItem3.click();

//     await expect(todoItem1).toHaveId('CheckCircleOutlineIcon');
// await expect(todoItem2).toHaveId('CheckCircleOutlineIcon');
// await expect(todoItem3).toHaveId('CheckCircleOutlineIcon');
// });

// test('should allow me to clear the complete state of all items', async ({
//   page,
// }) => {
//   const todoItem1 = page
//     .locator('ul .MuiListItem-root .MuiListItemIcon-root svg')
//     .nth(0);
//   const todoItem2 = page
//     .locator('ul .MuiListItem-root .MuiListItemIcon-root svg')
//     .nth(1);
//   const todoItem3 = page
//     .locator('ul .MuiListItem-root .MuiListItemIcon-root svg')
//     .nth(2);

//   // Should be no completed classes.
//   await expect(todoItem1).toHaveId('RadioButtonUncheckedIcon');
//   await expect(todoItem2).toHaveId('RadioButtonUncheckedIcon');
//   await expect(todoItem3).toHaveId('RadioButtonUncheckedIcon');
// });
// });

async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.locator('#input');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}
