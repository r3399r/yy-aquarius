import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = `${environment.apiUrl}/trips`;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public async getTrips(): Promise<any> {
    return await this.http.get<any>(this.apiUrl).toPromise();
  }

  public async getTrip(id: string): Promise<any> {
    return await this.http.get<any>(`${this.apiUrl}/${id}`).toPromise();
  }
}
