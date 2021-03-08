import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { LineUserProfile } from 'src/app/model/LineUserProfile';
import { LineAuthService } from 'src/app/services/line-auth.service';
import { LineService } from 'src/app/services/line.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  private activatedRoute: ActivatedRoute;
  private lineAuthService: LineAuthService;
  private lineService: LineService;
  private tripService: TripService;
  private alertController: AlertController;
  private loadingController: LoadingController;

  public isLogin: boolean;
  public isFriend: boolean;
  public trip: any;

  constructor(
    activatedRoute: ActivatedRoute,
    lineAuthService: LineAuthService,
    lineService: LineService,
    tripService: TripService,
    alertController: AlertController,
    loadingController: LoadingController
  ) {
    this.activatedRoute = activatedRoute;
    this.lineAuthService = lineAuthService;
    this.lineService = lineService;
    this.tripService = tripService;
    this.alertController = alertController;
    this.loadingController = loadingController;
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

  public canSign(): boolean {
    return this.isLogin === true && this.isFriend === true;
  }

  private async signConfirm(): Promise<void> {
    const loading: HTMLIonLoadingElement = await this.loadingController.create({
      message: '上傳資料中...',
    });
    await loading.present();

    const lineUserProfile: LineUserProfile = await this.lineService.getUserProfile();
    const signResponse: string = await this.tripService.signTrip(
      this.trip.creationId,
      lineUserProfile.userId
    );

    await loading.dismiss();
    const alert: HTMLIonAlertElement = await this.alertController.create({
      message: signResponse,
      buttons: ['知道了'],
    });
    await alert.present();
  }

  public async onSign(): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertController.create({
      message:
        '請確認是否報名此次出遊，報名成功後將會收到 LINE 官方帳號傳來的訊息',
      buttons: [
        {
          text: '是的',
          handler: () => this.signConfirm(),
        },
        '取消',
      ],
    });
    await alert.present();
  }
}
