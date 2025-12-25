import { Page } from '@playwright/test';

export abstract class PageHolder {

    constructor(public page: Page) { }

    async navigateTo(targetUrl: string = '/') {
        await this.page.goto(targetUrl, {
            waitUntil: 'load',
        });
    }
}