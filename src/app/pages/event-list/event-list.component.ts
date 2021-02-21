import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {}

  public onClickCard(): any {
    this.router.navigate(['event-detail/177BFEFF52BA1']);
  }
}
