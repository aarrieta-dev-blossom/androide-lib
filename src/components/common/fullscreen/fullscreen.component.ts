import { Component, signal, viewChild, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-fullscreen',
    imports: [MatButtonModule, MatIconModule],
    encapsulation: ViewEncapsulation.None,
    template: `
        <button mat-icon-button class="full-screen">
            @if (isFullscreen()) {
                <mat-icon #compress>fullscreen_exit</mat-icon>
            } @else {
                <mat-icon #expand>fullscreen</mat-icon>
            }
        </button>
    `
})
export class FullScreenComponent {
    readonly isFullscreen = signal(false);
    private readonly expand = viewChild<ElementRef>('expand');
    private readonly compress = viewChild<ElementRef>('compress');

    @HostListener('click')
    toggleFullscreen(): void {
        if (this.expand()) {
            document.documentElement.requestFullscreen?.();
        }
        if (this.compress()) {
            document.exitFullscreen?.();
        }
    }

    @HostListener('window:resize')
    onFullScreenChange(): void {
        this.isFullscreen.set(document.fullscreenElement != null);
    }
}
