import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineToken } from 'src/app/model/LineToken';

@Injectable({
  providedIn: 'root',
})
export class LineAuthService {
  private readonly http: HttpClient;
  private readonly link: string;

  private readonly state: string = '12345abcde';
  private readonly clientId: string = '1654301960';
  private readonly redirectUri: string = 'http://localhost:4200/home';
  private readonly channelSecret: string = '05695afa950c29994b1040599b0b1e51';

  private readonly authorizationUrl: string =
    'https://access.line.me/oauth2/v2.1/authorize';
  private readonly accessTokenApiUrl: string =
    'https://api.line.me/oauth2/v2.1/token';
  private readonly refreshTokenApiUrl: string =
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

  public async isAuth(): Promise<boolean> {
    const accessToken: string | null = localStorage.getItem('access_token');
    const refreshToken: string | null = localStorage.getItem('refresh_token');

    if (accessToken === null) {
      return false;
    }

    try {
      const body: HttpParams = new HttpParams()
        .set('client_id', this.clientId)
        .set('client_secret', this.channelSecret)
        .set('grant_type', 'refresh_token')
        .set('refresh_token', refreshToken);

      const refreshedlineToken: LineToken = await this.http
        .post<LineToken>(this.refreshTokenApiUrl, body, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .toPromise();

      localStorage.setItem('access_token', refreshedlineToken.access_token);
      localStorage.setItem('refresh_token', refreshedlineToken.refresh_token);
      return true;
    } catch {
      return false;
    }
  }

  public async login(code: string): Promise<boolean> {
    try {
      const body: HttpParams = new HttpParams()
        .set('code', code)
        .set('redirect_uri', this.redirectUri)
        .set('client_id', this.clientId)
        .set('client_secret', this.channelSecret)
        .set('grant_type', 'authorization_code');

      const lineToken: LineToken = await this.http
        .post<LineToken>(this.accessTokenApiUrl, body, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .toPromise();

      localStorage.setItem('access_token', lineToken.access_token);
      localStorage.setItem('refresh_token', lineToken.refresh_token);

      return true;
    } catch {
      return false;
    }
  }
}
