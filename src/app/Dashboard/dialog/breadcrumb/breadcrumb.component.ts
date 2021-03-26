import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: {
    name: string;
    url: string
  }[] = [];
  public pageTitle: string;

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute, ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.parseRoute(this.router.routerState.snapshot.root);
        // this.pageTitle = "";
        this.breadcrumbs.forEach(breadcrumb => {
          this.pageTitle += ' > ' + breadcrumb.name;
        })
        // this.title.setTitle(this.settings.name + this.pageTitle);
      }
    });
  }

  private parseRoute(node: ActivatedRouteSnapshot) {
    if (node.data['breadcrumb']) {
      if (node.url.length) {
        let urlSegments: UrlSegment[] = [];
        node.pathFromRoot.forEach(routerState => {
          urlSegments = urlSegments.concat(routerState.url);
        });
        let url = urlSegments.map(urlSegment => {
          return urlSegment.path;
        }).join('/');

        if (node.params.name) {
          this.breadcrumbs.push({
            name: node.params.name,
            url: '/' + url
          })
        } else {
          this.breadcrumbs.push({
            name: node.data['breadcrumb'],
            url: '/' + url
          })
        }
      }
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }

  ngOnInit() {
  }

}
