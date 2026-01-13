import { Injectable, signal, computed, effect } from '@angular/core';
import { ThemeColors, DEFAULT_THEMES } from '../../models/core/theme.model';

const STORAGE_KEY = 'dreso-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly _colors = signal<ThemeColors>(this.loadFromStorage());
    readonly colors = this._colors.asReadonly();
    readonly isDark = computed(() => this._colors().isDark);

    constructor() {
        effect(() => {
            const colors = this._colors();
            this.applyToDOM(colors);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
        });
        this.applyToDOM(this._colors());
    }

    setColors(colors: Partial<ThemeColors>): void {
        this._colors.update(c => ({ ...c, ...colors }));
    }

    setPreset(name: string): void {
        const preset = DEFAULT_THEMES[name];
        if (preset) this._colors.set({ ...preset });
    }

    private loadFromStorage(): ThemeColors {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return JSON.parse(stored);
        } catch {}
        return { ...DEFAULT_THEMES['indigo-light'] };
    }

    private applyToDOM(colors: ThemeColors): void {
        const root = document.documentElement;
        root.style.setProperty('--theme-primary', colors.primary);
        root.style.setProperty('--theme-accent', colors.accent);
        root.style.setProperty('--theme-warn', colors.warn);
        root.style.setProperty('--theme-primary-contrast', colors.isDark ? '#fff' : '#fff');
        root.style.setProperty('--theme-bg', colors.isDark ? '#303030' : '#fafafa');
        root.style.setProperty('--theme-bg-card', colors.isDark ? '#424242' : '#fff');
        root.style.setProperty('--theme-text', colors.isDark ? '#fff' : '#212121');
        root.style.setProperty('--theme-text-secondary', colors.isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.54)');
        document.body.classList.toggle('dark-theme', colors.isDark);
    }
}
