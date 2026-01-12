import { Component, inject, input, output, computed, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MenuService } from '../../../services/core/menu.service';
import { SettingsService } from '../../../services/core/settings.service';
import { Menu } from '../../../models/core/menu.model';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-vertical-menu',
    imports: [
        RouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './vertical-menu.component.html',
    styleUrls: ['./vertical-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalMenuComponent {
    readonly menuItems = input<Menu[]>([]);
    readonly menuParentId = input(0);
    readonly onClickMenuItem = output<number>();

    private readonly settingsService = inject(SettingsService);
    private readonly menuService = inject(MenuService);
    private readonly router = inject(Router);

    readonly settings = this.settingsService.settings;
    readonly parentMenu = computed(() =>
        this.menuItems().filter(item => item.parentId === this.menuParentId())
    );

    constructor() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.settings().fixedHeader) {
                    document.getElementById('main-content')?.scrollTo(0, 0);
                } else {
                    document.getElementsByClassName('mat-drawer-content')[0]?.scrollTo(0, 0);
                }
            }
        });
    }

    onClick(menuId: number): void {
        this.menuService.toggleMenuItem(menuId);
        this.menuService.closeOtherSubMenus(this.menuItems(), menuId);
        this.onClickMenuItem.emit(menuId);
    }
}
