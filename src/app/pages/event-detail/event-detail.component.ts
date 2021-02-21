import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  private activatedRoute: ActivatedRoute;
  public eventId: string;
  public event: any;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventId = params.id;
      this.event = {
        date: '2021/02/28(日)',
        startTime: '09:00',
        endTime: '14:00',
        where: '捷運大湖公園站1號出口',
        who: '台大自閉星雨服務團',
        description: '讓我們走走步道，然後賞櫻吧!',
      };
    });
  }
}
