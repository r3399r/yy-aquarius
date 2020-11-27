import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LineAuthService } from 'src/app/services/line-auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  private activatedRoute: ActivatedRoute;
  private lineAuthService: LineAuthService;

  constructor(
    activatedRoute: ActivatedRoute,
    lineAuthService: LineAuthService
  ) {
    this.activatedRoute = activatedRoute;
    this.lineAuthService = lineAuthService;
  }

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(
      async (params: Params): Promise<void> => {
        if (params.state === this.lineAuthService.getState()) {
          await this.lineAuthService.getUserProfile(params.code);
        }
      }
    );
  }
}
