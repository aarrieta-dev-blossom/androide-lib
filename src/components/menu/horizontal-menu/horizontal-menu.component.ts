import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { MenuService } from '../../../services/core/menu.service';
import { SettingsService } from '../../../services/core/settings.service';
import { Settings } from '../../../models/core/settings.model';
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
export class HorizontalMenuComponent implements OnInit {
    @Input() menuParentId: number = 0;
    public menuItems: Menu[] = [];
    public settings: Settings;
    @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

    constructor(
        public settingsService: SettingsService,
        public menuService: MenuService,
        public router: Router
    ) {
        this.settings = this.settingsService.settings;
    }

    ngOnInit() {
        this.menuItems = this.menuService.getHorizontalMenuItems();
        this.menuItems = this.menuItems.filter(item => item.parentId === this.menuParentId);
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
}
