import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {}

  public async onClick(): Promise<void> {
    this.router.navigate(['child']);
  }
}
