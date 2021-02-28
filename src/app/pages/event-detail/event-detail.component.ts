import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { LineAuthService } from 'src/app/services/line-auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  private activatedRoute: ActivatedRoute;
  private lineAuthService: LineAuthService;
  private tripService: TripService;
  private alertController: AlertController;
  public isLogin: boolean;
  public isFriend: boolean;
  public trip: any;

  constructor(
    activatedRoute: ActivatedRoute,
    lineAuthService: LineAuthService,
    tripService: TripService,
    alertController: AlertController
  ) {
    this.activatedRoute = activatedRoute;
    this.lineAuthService = lineAuthService;
    this.tripService = tripService;
    this.alertController = alertController;
  }

  async ngOnInit(): Promise<void> {
    this.isLogin = await this.lineAuthService.isAuth();
    this.isFriend = await this.lineAuthService.isFriend();

    this.activatedRoute.params.subscribe(async (params: Params) => {
      const res = await this.tripService.getTrip(params.id);
      this.trip = {
        ...res,
        date: moment.utc(res.startDate).format('YYYY-MM-DD'),
        startDate: moment.utc(res.startDate).format('HH:mm'),
        endDate: moment.utc(res.endDate).format('HH:mm'),
      };
    });
  }

  public isPageLoading(): boolean {
    return (
      this.trip === undefined ||
      this.isLogin === undefined ||
      this.isFriend === undefined
    );
  }

  public canRegister(): boolean {
    return this.isLogin === true && this.isFriend === true;
  }

  public async onRegister(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertController.create({
      message:
        '請確認是否報名此次出遊，報名成功後將會收到 LINE 官方帳號傳來的訊息，請密切注意',
      buttons: [{ text: '是的', handler: () => {} }, '取消'],
    });
    await alert.present();
  }
}
