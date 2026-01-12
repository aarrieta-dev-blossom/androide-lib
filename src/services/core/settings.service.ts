import { Injectable, signal, computed } from '@angular/core';
import { Settings } from '../../models/core/settings.model';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private readonly _settings = signal(new Settings(
        'Dreso',
        true,
        true,
        true,
        true,
        true,
        'vertical',
        'default',
        'indigo-light',
        false,
        true
    ));

    readonly settings = this._settings.asReadonly();
    readonly theme = computed(() => this._settings().theme);
    readonly menuType = computed(() => this._settings().menuType);
    readonly sidenavIsOpened = computed(() => this._settings().sidenavIsOpened);
    readonly sidenavIsPinned = computed(() => this._settings().sidenavIsPinned);
    readonly rtl = computed(() => this._settings().rtl);

    updateSettings(partial: Partial<Settings>): void {
        this._settings.update(s => ({ ...s, ...partial } as Settings));
    }

    toggleSidenav(): void {
        this._settings.update(s => {
            const updated = Object.assign(Object.create(Object.getPrototypeOf(s)), s);
            updated.sidenavIsOpened = !s.sidenavIsOpened;
            return updated;
        });
    }

    toggleSidenavPin(): void {
        this._settings.update(s => {
            const updated = Object.assign(Object.create(Object.getPrototypeOf(s)), s);
            updated.sidenavIsPinned = !s.sidenavIsPinned;
            return updated;
        });
    }
}
