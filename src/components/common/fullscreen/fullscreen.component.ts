import { Component, ViewEncapsulation, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-fullscreen',
    imports: [MatButtonModule, MatIconModule],
    encapsulation: ViewEncapsulation.None,
    template: `
        <button mat-icon-button class="full-screen">
            @if (toggle) {
                <mat-icon #compress>fullscreen_exit</mat-icon>
            } @else {
                <mat-icon #expand>fullscreen</mat-icon>
            }
        </button>
    `
})
export class FullScreenComponent {
    toggle = false;
    @ViewChild('expand') private expand?: ElementRef;
    @ViewChild('compress') private compress?: ElementRef;

    requestFullscreen(elem: HTMLElement): void {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    }

    exitFullscreen(): void {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    @HostListener('click')
    getFullscreen(): void {
        if (this.expand) {
            this.requestFullscreen(document.documentElement);
        }
        if (this.compress) {
            this.exitFullscreen();
        }
    }

    @HostListener('window:resize')
    onFullScreenChange(): void {
        this.toggle = document.fullscreenElement != null;
    }
}
