import { Component } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../../../services/core/settings.service';
import { Settings } from '../../../models/core/settings.model';
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
    public pageTitle = '';
    public breadcrumbs: { name: string; url: string }[] = [];
    public settings: Settings;

    constructor(
        public settingsService: SettingsService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public title: Title
    ) {
        this.settings = this.settingsService.settings;
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.breadcrumbs = [];
                this.parseRoute(this.router.routerState.snapshot.root);
                this.pageTitle = '';
                this.breadcrumbs.forEach(breadcrumb => {
                    this.pageTitle += ' > ' + breadcrumb.name;
                });
                this.title.setTitle(this.settings.name + this.pageTitle);
            }
        });
    }

    private parseRoute(node: ActivatedRouteSnapshot): void {
        if (node.data['breadcrumb']) {
            if (node.url.length) {
                let urlSegments: UrlSegment[] = [];
                node.pathFromRoot.forEach(routerState => {
                    urlSegments = urlSegments.concat(routerState.url);
                });
                const url = urlSegments.map(urlSegment => urlSegment.path).join('/');
                this.breadcrumbs.push({
                    name: node.data['breadcrumb'],
                    url: '/' + url
                });
            }
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }

    public closeSubMenus(): void {
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
