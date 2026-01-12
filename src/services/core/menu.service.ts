import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Menu } from '../../models/core/menu.model';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private readonly _verticalMenuItems = signal<Menu[]>([]);
    private readonly _horizontalMenuItems = signal<Menu[]>([]);

    readonly verticalMenuItems = this._verticalMenuItems.asReadonly();
    readonly horizontalMenuItems = this._horizontalMenuItems.asReadonly();

    constructor(
        private location: Location,
        private router: Router
    ) {}

    setVerticalMenuItems(items: Menu[]): void {
        this._verticalMenuItems.set(items);
    }

    setHorizontalMenuItems(items: Menu[]): void {
        this._horizontalMenuItems.set(items);
    }

    expandActiveSubMenu(menu: Menu[]): void {
        const url = this.location.path();
        const activeMenuItem = menu.filter(item => item.routerLink === url);
        if (activeMenuItem[0]) {
            let menuItem = activeMenuItem[0];
            while (menuItem.parentId !== 0) {
                const parentMenuItem = menu.filter(item => item.id === menuItem.parentId)[0];
                menuItem = parentMenuItem;
                this.toggleMenuItem(menuItem.id);
            }
        }
    }

    toggleMenuItem(menuId: number): void {
        const menuItem = document.getElementById('menu-item-' + menuId);
        const subMenu = document.getElementById('sub-menu-' + menuId);
        if (menuItem && subMenu) {
            subMenu.classList.toggle('show');
            menuItem.classList.toggle('expanded');
        }
    }

    closeOtherSubMenus(menu: Menu[], menuId: number): void {
        const currentMenuItem = menu.filter(item => item.id === menuId)[0];
        if (currentMenuItem.parentId === 0 && !currentMenuItem.target) {
            menu.forEach(item => {
                if (item.id !== menuId) {
                    const subMenu = document.getElementById('sub-menu-' + item.id);
                    const menuItem = document.getElementById('menu-item-' + item.id);
                    if (menuItem && subMenu && subMenu.classList.contains('show')) {
                        subMenu.classList.remove('show');
                        menuItem.classList.remove('expanded');
                    }
                }
            });
        }
    }
}
