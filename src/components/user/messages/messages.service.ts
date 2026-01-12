import { Injectable } from '@angular/core';

export interface Message {
    name: string;
    text: string;
    time: string;
}

export interface FileItem {
    text: string;
    size: string;
    value: string;
    color: string;
}

export interface Meeting {
    day: string;
    month: string;
    title: string;
    text: string;
    color: string;
}

@Injectable()
export class MessagesService {
    private messages: Message[] = [
        { name: 'ashley', text: 'After you get up and running...', time: '1 min ago' },
        { name: 'michael', text: 'Font Awesome delivers with 40 new icons...', time: '2 hrs ago' },
        { name: 'julia', text: 'Want to request new icons?...', time: '10 hrs ago' },
        { name: 'bruno', text: 'Explore your passions...', time: '1 day ago' },
        { name: 'tereza', text: 'Get to know who we are...', time: '1 day ago' },
    ];

    private files: FileItem[] = [
        { text: 'dreso.zip', size: '~6.2 MB', value: '47', color: 'primary' },
        { text: 'documentation.pdf', size: '~14.6 MB', value: '33', color: 'accent' },
        { text: 'wallpaper.jpg', size: '~558 KB', value: '60', color: 'warn' },
    ];

    private meetings: Meeting[] = [
        { day: '09', month: 'May', title: 'Meeting with Bruno', text: 'Fusce ut condimentum...', color: 'danger' },
        { day: '15', month: 'May', title: 'Training course', text: 'Fusce arcu tortor...', color: 'primary' },
        { day: '12', month: 'June', title: 'Dinner with Ashley', text: 'Curabitur rhoncus...', color: 'info' },
    ];

    getMessages(): Message[] {
        return this.messages;
    }

    getFiles(): FileItem[] {
        return this.files;
    }

    getMeetings(): Meeting[] {
        return this.meetings;
    }
}
