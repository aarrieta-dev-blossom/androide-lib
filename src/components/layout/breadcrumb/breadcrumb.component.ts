import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../../../services/core/settings.service';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-breadcrumb',
    imports: [
        FlexLayoutModule,
        RouterModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
    private readonly settingsService = inject(SettingsService);
    readonly router = inject(Router);
    private readonly title = inject(Title);

    readonly settings = this.settingsService.settings;
    readonly pageTitle = signal('');
    readonly breadcrumbs = signal<{ name: string; url: string }[]>([]);

    constructor() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const crumbs: { name: string; url: string }[] = [];
                this.parseRoute(this.router.routerState.snapshot.root, crumbs);
                this.breadcrumbs.set(crumbs);

                const titleParts = crumbs.map(b => b.name).join(' > ');
                this.pageTitle.set(titleParts ? ' > ' + titleParts : '');
                this.title.setTitle(this.settings().name + this.pageTitle());
            }
        });
    }

    private parseRoute(node: ActivatedRouteSnapshot, crumbs: { name: string; url: string }[]): void {
        if (node.data['breadcrumb'] && node.url.length) {
            let urlSegments: UrlSegment[] = [];
            node.pathFromRoot.forEach(routerState => {
                urlSegments = urlSegments.concat(routerState.url);
            });
            const url = urlSegments.map(urlSegment => urlSegment.path).join('/');
            crumbs.push({ name: node.data['breadcrumb'], url: '/' + url });
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild, crumbs);
        }
    }

    closeSubMenus(): void {
        const menu = document.querySelector('.sidenav-menu-outer');
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
