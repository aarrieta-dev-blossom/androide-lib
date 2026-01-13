import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../../services/core/theme.service';
import { DEFAULT_THEMES } from '../../../models/core/theme.model';

@Component({
    selector: 'app-theme-picker',
    imports: [FormsModule, MatButtonModule, MatIconModule, MatSlideToggleModule],
    template: `
        <div class="theme-picker">
            <h4>Theme Colors</h4>
            <div class="color-row">
                <label>Primary</label>
                <input type="color" [ngModel]="colors().primary" (ngModelChange)="themeService.setColors({primary: $event})">
            </div>
            <div class="color-row">
                <label>Accent</label>
                <input type="color" [ngModel]="colors().accent" (ngModelChange)="themeService.setColors({accent: $event})">
            </div>
            <div class="color-row">
                <label>Warn</label>
                <input type="color" [ngModel]="colors().warn" (ngModelChange)="themeService.setColors({warn: $event})">
            </div>
            <div class="color-row">
                <label>Dark Mode</label>
                <mat-slide-toggle [checked]="colors().isDark" (change)="themeService.setColors({isDark: $event.checked})"></mat-slide-toggle>
            </div>
            <h4>Presets</h4>
            <div class="presets">
                @for (preset of presetList; track preset.name) {
                    <div class="preset-btn" 
                         [class.selected]="activePreset() === preset.name"
                         [style.background]="preset.colors.primary" 
                         (click)="themeService.setPreset(preset.name)">
                        <div class="preset-accent" [style.background]="preset.colors.accent"></div>
                    </div>
                }
            </div>
        </div>
    `,
    styles: [`
        .theme-picker { padding: 16px; }
        .color-row { display: flex; justify-content: space-between; align-items: center; margin: 8px 0; }
        .color-row label { font-size: 14px; }
        .color-row input[type="color"] { width: 40px; height: 32px; border: none; cursor: pointer; }
        .presets { display: flex; gap: 8px; flex-wrap: wrap; }
        .preset-btn { width: 36px; height: 36px; border-radius: 50%; cursor: pointer; position: relative; box-sizing: border-box; border: 3px solid transparent; transition: border-color 0.2s, transform 0.2s; }
        .preset-btn.selected { border-color: var(--theme-text); transform: scale(1.1); }
        .preset-accent { width: 14px; height: 14px; border-radius: 50%; position: absolute; bottom: -2px; right: -2px; border: 2px solid white; }
        h4 { margin: 16px 0 8px; }
    `]
})
export class ThemePickerComponent {
    themeService = inject(ThemeService);
    colors = this.themeService.colors;
    presetList = Object.entries(DEFAULT_THEMES).map(([name, colors]) => ({ name, colors }));

    activePreset = computed(() => {
        const current = this.colors();
        for (const [name, preset] of Object.entries(DEFAULT_THEMES)) {
            if (current.primary === preset.primary && 
                current.accent === preset.accent && 
                current.warn === preset.warn && 
                current.isDark === preset.isDark) {
                return name;
            }
        }
        return null;
    });
}
