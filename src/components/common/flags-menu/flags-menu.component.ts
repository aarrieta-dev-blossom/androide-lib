import { Component, inject, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '../../../services/core/settings.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-flags-menu',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ],
    templateUrl: './flags-menu.component.html',
    styleUrls: ['./flags-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlagsMenuComponent {
    private readonly settingsService = inject(SettingsService);
    readonly settings = this.settingsService.settings;
}
