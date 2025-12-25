import { Locator, expect } from '@playwright/test';
import { PageHolder } from '@pages/PageHolder';

export default class TodoPage extends PageHolder {
    /* Selectors
    -----------------------------------------------------------*/
    readonly newTodoInput: Locator = this.page.locator('.new-todo');
    readonly todoList: Locator = this.page.locator('.todo-list');
    readonly todoCount: Locator = this.page.locator('.todo-count');
    readonly todoItem = (name: string): Locator => this.todoList.locator(`li:has-text("${name}")`);
    readonly toggleButton = (name: string): Locator => this.todoItem(name).locator('.toggle');
    readonly editInput = (name: string): Locator => this.todoItem(name).locator('.edit');
    readonly deleteButton = (name: string): Locator => this.todoItem(name).locator('.destroy');

    /* Navigation
    -----------------------------------------------------------*/
    async goto(): Promise<void> {
        await this.navigateTo('/');
    }

    /* CRUD Actions
    -----------------------------------------------------------*/
    async addTodo(todoText: string): Promise<void> {
        await this.newTodoInput.fill(todoText);
        await this.newTodoInput.press('Enter');
    }

    async editTodo(oldText: string, newText: string): Promise<void> {
        await this.todoItem(oldText).dblclick();
        await this.editInput(oldText).fill(newText);
        await this.editInput(oldText).press('Enter');
    }

    async deleteTodo(name: string): Promise<void> {
        await this.todoItem(name).hover();
        await this.deleteButton(name).click();
    }

    async toggleTodo(name: string): Promise<void> {
        await this.toggleButton(name).click();
    }

    async getTodoCount(): Promise<string | null> {
        return await this.todoCount.textContent();
    }
}
