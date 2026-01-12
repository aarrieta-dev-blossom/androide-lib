import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MenuService } from '../../../services/core/menu.service';
import { SettingsService } from '../../../services/core/settings.service';
import { Settings } from '../../../models/core/settings.model';
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
export class VerticalMenuComponent implements OnInit {
    @Input() menuItems: Menu[] = [];
    @Input() menuParentId: number = 0;
    @Output() onClickMenuItem = new EventEmitter<number>();

    parentMenu: Menu[] = [];
    public settings: Settings;

    constructor(
        public settingsService: SettingsService,
        public menuService: MenuService,
        public router: Router
    ) {
        this.settings = this.settingsService.settings;
    }

    ngOnInit() {
        this.parentMenu = this.menuItems.filter(item => item.parentId === this.menuParentId);
    }

    ngAfterViewInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.settings.fixedHeader) {
                    const mainContent = document.getElementById('main-content');
                    if (mainContent) {
                        mainContent.scrollTop = 0;
                    }
                } else {
                    document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
                }
            }
        });
    }

    onClick(menuId: number): void {
        this.menuService.toggleMenuItem(menuId);
        this.menuService.closeOtherSubMenus(this.menuItems, menuId);
        this.onClickMenuItem.emit(menuId);
    }
}
