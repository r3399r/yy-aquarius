import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  private router: Router;
  private tripService: TripService;
  public trips: any;

  constructor(router: Router, tripService: TripService) {
    this.router = router;
    this.tripService = tripService;
  }

  async ngOnInit(): Promise<void> {
    const res: any[] = await this.tripService.getTrips();
    this.trips = res.map((trip: any) => {
      return {
        ...trip,
        date: moment.utc(trip.startDate).format('YYYY-MM-DD'),
        startDate: moment.utc(trip.startDate).format('HH:mm'),
        endDate: moment.utc(trip.endDate).format('HH:mm'),
      };
    });
  }

  public onClickCard(id: string): any {
    this.router.navigate([`event-detail/${id}`]);
  }
}
