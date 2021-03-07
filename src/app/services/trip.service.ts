import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly http: HttpClient;
  private readonly tripApi: string = `${environment.apiUrl}/trips`;
  private readonly signApi: string = `${environment.apiUrl}/sign`;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public async getTrips(): Promise<any> {
    return await this.http.get<any>(this.tripApi).toPromise();
  }

  public async getTrip(id: string): Promise<any> {
    return await this.http.get<any>(`${this.tripApi}/${id}`).toPromise();
  }

  public async signTrip(tripId: string, lineUserId: string): Promise<any> {
    return await this.http
      .post<any>(`${this.signApi}`, {
        tripCreationId: tripId,
        lineUserId,
      })
      .toPromise();
  }
}
