import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {}

  public getRouterUrl(): string {
    return this.router.url.split('/')[1];
  }

  public async onClickTab(route: string): Promise<void> {
    this.router.navigate([route]);
  }
}
