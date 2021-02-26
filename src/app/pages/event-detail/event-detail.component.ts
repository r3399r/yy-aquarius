import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  private activatedRoute: ActivatedRoute;
  private tripService: TripService;
  public eventId: string;
  public event: any;
  public trip: any;

  constructor(activatedRoute: ActivatedRoute, tripService: TripService) {
    this.activatedRoute = activatedRoute;
    this.tripService = tripService;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      const res = await this.tripService.getTrip(params.id);
      this.trip = {
        ...res,
        date: moment.utc(res.startDate).format('YYYY-MM-DD'),
        startDate: moment.utc(res.startDate).format('HH:mm'),
        endDate: moment.utc(res.endDate).format('HH:mm'),
      };
      // this.eventId = params.id;
      // this.event = {
      //   date: '2021/02/28(日)',
      //   startTime: '09:00',
      //   endTime: '14:00',
      //   where: '捷運大湖公園站1號出口',
      //   who: '台大自閉星雨服務團',
      //   description: '讓我們走走步道，然後賞櫻吧!',
      // };
    });
  }
}
