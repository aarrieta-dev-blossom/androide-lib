import { Component, inject, input, viewChild, computed, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { MenuService } from '../../../services/core/menu.service';
import { SettingsService } from '../../../services/core/settings.service';
import { Menu } from '../../../models/core/menu.model';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-horizontal-menu',
    imports: [
        RouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './horizontal-menu.component.html',
    styleUrls: ['./horizontal-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorizontalMenuComponent {
    readonly menuParentId = input(0);

    private readonly settingsService = inject(SettingsService);
    private readonly menuService = inject(MenuService);
    private readonly router = inject(Router);

    readonly trigger = viewChild(MatMenuTrigger);
    readonly settings = this.settingsService.settings;
    readonly menuItems = computed(() =>
        this.menuService.horizontalMenuItems().filter(item => item.parentId === this.menuParentId())
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
}
