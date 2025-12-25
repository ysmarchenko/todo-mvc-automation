import { test, expect } from '@playwright/test';
import TodoPage from '@pages/TodoPage';
import { faker } from '@faker-js/faker';

test.describe('TodoMVC CRUD Tests', () => {
	let todoPage: TodoPage;

	test.beforeEach(async ({ page }) => {
		todoPage = new TodoPage(page);
		await todoPage.navigateTo();
	});

	test('User should be able to create a new todo item', async () => {
		const taskName = 'TEST ' + faker.lorem.words(2);

		// Create new task
		await todoPage.addNewTodo(taskName);

		// Verify task is visible in the list
		await expect(todoPage.todoItem(taskName)).toBeVisible();
	});

	test('User should be able to see all created todo items', async () => {
		const taskNameFirst = 'TEST ' + faker.lorem.words(2);
		const taskNameSecond = 'TEST ' + faker.lorem.words(2);

		// Create multiple tasks
		await todoPage.addNewTodo(taskNameFirst);
		await todoPage.addNewTodo(taskNameSecond);

		// Verify both tasks are visible
		await expect(todoPage.todoItem(taskNameFirst)).toBeVisible();
		await expect(todoPage.todoItem(taskNameSecond)).toBeVisible();
	});

	test('User should be able to update an existing todo item', async () => {
		const oldTaskName = 'TEST ' + faker.lorem.words(2);
		const newTaskName = 'TEST ' + faker.lorem.words(2);

		// Create a task to update
		await todoPage.addNewTodo(oldTaskName);

		// Update the task
		await todoPage.editTodo(oldTaskName, newTaskName);

		// Verify the task is updated
		await expect(todoPage.todoItem(newTaskName)).toBeVisible();
		await expect(todoPage.todoItem(oldTaskName)).toBeHidden();
	});

	test('User should be able to delete a todo item', async () => {
		const taskName = 'TEST ' + faker.lorem.words(2);

		// Create a task to delete
		await todoPage.addNewTodo(taskName);
		await expect(todoPage.todoItem(taskName)).toBeVisible();

		// Delete the task
		await todoPage.deleteTodo(taskName);

		// Verify the task is removed
		await expect(todoPage.todoItem(taskName)).toBeHidden();
	});

	test('User should be able to toggle a todo item as completed', async () => {
		const taskName = 'TEST ' + faker.lorem.words(2);

		// Create a task to toggle
		await todoPage.addNewTodo(taskName);
		await expect(todoPage.todoItem(taskName)).toBeVisible();

		// Toggle task completion
		await todoPage.toggleTodo(taskName);

		// Verify the task is marked as completed
		await expect(todoPage.todoItem(taskName)).toBeVisible();
		await expect(todoPage.todoItem(taskName)).toHaveClass(/completed/);
	});
});
