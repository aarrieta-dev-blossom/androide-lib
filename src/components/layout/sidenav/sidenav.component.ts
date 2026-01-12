import { Component, inject, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '../../../services/core/settings.service';
import { MenuService } from '../../../services/core/menu.service';
import { VerticalMenuComponent } from '../../menu/vertical-menu/vertical-menu.component';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-sidenav',
    imports: [
        FlexLayoutModule,
        NgScrollbarModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        VerticalMenuComponent
    ],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {
    readonly settingsService = inject(SettingsService);
    readonly menuService = inject(MenuService);

    readonly settings = this.settingsService.settings;
    readonly menuItems = this.menuService.verticalMenuItems;

    closeSubMenus(): void {
        const menu = document.getElementById('vertical-menu');
        if (menu) {
            for (let i = 0; i < menu.children[0].children.length; i++) {
                const child = menu.children[0].children[i];
                if (child?.children[0]?.classList.contains('expanded')) {
                    child.children[0].classList.remove('expanded');
                    child.children[1].classList.remove('show');
                }
            }
        }
    }
}
