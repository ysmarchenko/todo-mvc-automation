import { test, expect } from '@playwright/test';
import { TodoPage } from '@pages/TodoPage';
import { faker } from '@faker-js/faker';

test.describe('TodoMVC CRUD Tests', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.goto();
    });

    test('User should be able to create a new todo item', async () => {
        const taskName = 'TEST ' + faker.lorem.words(2);

        await todoPage.addTodo(taskName);
        await expect(todoPage.getTodoItem(taskName)).toBeVisible();
    });

    test('User should be able to see all created todo items', async () => {
        const taskNameFirst = 'TEST ' + faker.lorem.words(2);
        const taskNameSecond = 'TEST ' + faker.lorem.words(2);

        await todoPage.addTodo(taskNameFirst);
        await todoPage.addTodo(taskNameSecond);

        await expect(todoPage.getTodoItem(taskNameFirst)).toBeVisible();
        await expect(todoPage.getTodoItem(taskNameSecond)).toBeVisible();
    });

    test('User should be able to update an existing todo item', async () => {
        const taskNameFirst = 'TEST ' + faker.lorem.words(2);
        const taskNameSecond = 'TEST ' + faker.lorem.words(2);

        await todoPage.addTodo(taskNameFirst);
        await todoPage.editTodo(taskNameFirst, taskNameSecond);

        await expect(todoPage.getTodoItem(taskNameSecond)).toBeVisible();
    });

    test('User should be able to delete a todo item', async () => {
        const taskName = 'TEST ' + faker.lorem.words(2);

        await todoPage.addTodo(taskName);
        await todoPage.deleteTodo(taskName);

        await expect(todoPage.getTodoItem(taskName)).toHaveCount(0);
    });
});
