import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Menu } from '../../models/core/menu.model';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private verticalMenuItems: Menu[] = [];
    private horizontalMenuItems: Menu[] = [];

    constructor(
        private location: Location,
        private router: Router
    ) {}

    public setVerticalMenuItems(items: Menu[]): void {
        this.verticalMenuItems = items;
    }

    public setHorizontalMenuItems(items: Menu[]): void {
        this.horizontalMenuItems = items;
    }

    public getVerticalMenuItems(): Menu[] {
        return this.verticalMenuItems;
    }

    public getHorizontalMenuItems(): Menu[] {
        return this.horizontalMenuItems;
    }

    public expandActiveSubMenu(menu: Menu[]): void {
        const url = this.location.path();
        const routerLink = url;
        const activeMenuItem = menu.filter(item => item.routerLink === routerLink);
        if (activeMenuItem[0]) {
            let menuItem = activeMenuItem[0];
            while (menuItem.parentId !== 0) {
                const parentMenuItem = menu.filter(item => item.id === menuItem.parentId)[0];
                menuItem = parentMenuItem;
                this.toggleMenuItem(menuItem.id);
            }
        }
    }

    public toggleMenuItem(menuId: number): void {
        const menuItem = document.getElementById('menu-item-' + menuId);
        const subMenu = document.getElementById('sub-menu-' + menuId);
        if (menuItem && subMenu) {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
                menuItem.classList.remove('expanded');
            } else {
                subMenu.classList.add('show');
                menuItem.classList.add('expanded');
            }
        }
    }

    public closeOtherSubMenus(menu: Menu[], menuId: number): void {
        const currentMenuItem = menu.filter(item => item.id === menuId)[0];
        if (currentMenuItem.parentId === 0 && !currentMenuItem.target) {
            menu.forEach(item => {
                if (item.id !== menuId) {
                    const subMenu = document.getElementById('sub-menu-' + item.id);
                    const menuItem = document.getElementById('menu-item-' + item.id);
                    if (menuItem && subMenu) {
                        if (subMenu.classList.contains('show')) {
                            subMenu.classList.remove('show');
                            menuItem.classList.remove('expanded');
                        }
                    }
                }
            });
        }
    }
}
