import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LineAuthService {
  private readonly http: HttpClient;
  private readonly link: string;

  private readonly state: string = '12345abcde';
  private readonly clientId: string = '1654301960';
  private readonly redirectUri: string = 'http://localhost:4200/user-profile';
  private readonly channelSecret: string = '05695afa950c29994b1040599b0b1e51';

  private readonly authorizationUrl: string =
    'https://access.line.me/oauth2/v2.1/authorize';
  private readonly accessTokenApiUrl: string =
    'https://api.line.me/oauth2/v2.1/token';

  constructor(http: HttpClient) {
    this.http = http;
    this.link = `${this.authorizationUrl}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=${this.state}&scope=profile`;
  }

  public getLink(): string {
    return this.link;
  }

  public getState(): string {
    return this.state;
  }

  public async getUserProfile(code: string): Promise<any> {
    const body: HttpParams = new HttpParams()
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', this.channelSecret)
      .set('grant_type', 'authorization_code');

    return this.http
      .post<any>(this.accessTokenApiUrl, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .toPromise();
  }
}
