import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineUserProfile } from 'src/app/model/LineUserProfile';

@Injectable({
  providedIn: 'root',
})
export class LineService {
  private readonly http: HttpClient;
  private readonly getProfileUrl: string = 'https://api.line.me/v2/profile';

  constructor(http: HttpClient) {
    this.http = http;
  }

  public async getUserProfile(): Promise<LineUserProfile> {
    const accessToken: string | null = localStorage.getItem('access_token');

    return await this.http
      .get<any>(this.getProfileUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .toPromise();
  }
}
