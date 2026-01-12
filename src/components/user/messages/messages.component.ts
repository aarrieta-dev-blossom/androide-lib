import { Component, inject, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MessagesService } from './messages.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../../pipes/common/truncate.pipe';
import { ProfilePicturePipe } from '../../../pipes/common/profilePicture.pipe';

@Component({
    selector: 'app-messages',
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatProgressBarModule,
        MatMenuModule,
        NgScrollbarModule,
        DatePipe,
        TruncatePipe,
        ProfilePicturePipe
    ],
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessagesService]
})
export class MessagesComponent {
    private readonly messagesService = inject(MessagesService);

    readonly trigger = viewChild(MatMenuTrigger);
    readonly selectedTab = signal(1);
    readonly messages = signal(this.messagesService.getMessages());
    readonly files = signal(this.messagesService.getFiles());
    readonly meetings = signal(this.messagesService.getMeetings());

    openMessagesMenu(): void {
        this.trigger()?.openMenu();
        this.selectedTab.set(0);
    }

    onMouseLeave(): void {
        this.trigger()?.closeMenu();
    }

    stopClickPropagate(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
