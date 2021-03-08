import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineUserProfile } from 'src/app/model/LineUserProfile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LineService {
  private readonly http: HttpClient;
  private readonly lineProfileUrl: string = 'https://api.line.me/v2/profile';
  private readonly userApi: string = `${environment.apiUrl}/users`;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public async getUserProfile(): Promise<LineUserProfile> {
    const accessToken: string | null = localStorage.getItem('access_token');

    return await this.http
      .get<LineUserProfile>(this.lineProfileUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .toPromise();
  }

  public async getUser(userId: string): Promise<any> {
    return await this.http.get<any>(`${this.userApi}/${userId}`).toPromise();
  }
}
