import { Component, OnInit } from '@angular/core';
import { LineUserProfile } from 'src/app/model/LineUserProfile';
import { LineService } from 'src/app/services/line.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  private lineService: LineService;
  public lineUserProfile: LineUserProfile;

  constructor(lineService: LineService) {
    this.lineService = lineService;
  }

  async ngOnInit(): Promise<void> {
    this.lineUserProfile = await this.lineService.getUserProfile();
  }
}
