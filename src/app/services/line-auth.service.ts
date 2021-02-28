import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineToken } from 'src/app/model/LineToken';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LineAuthService {
  private readonly http: HttpClient;
  private readonly link: string;

  private readonly state: string = '12345abcde';
  private readonly authorizationUrl: string =
    'https://access.line.me/oauth2/v2.1/authorize';
  private readonly lineOauthApiUrl: string =
    'https://api.line.me/oauth2/v2.1/token';
  private readonly friendshipStatusUrl: string =
    'https://api.line.me/friendship/v1/status';

  constructor(http: HttpClient) {
    this.http = http;
    this.link = `${this.authorizationUrl}?response_type=code&client_id=${environment.clientId}&redirect_uri=${environment.redirectUri}&state=${this.state}&scope=profile&bot_prompt=aggressive`;
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

    if (accessToken === null) return false;

    try {
      const body: HttpParams = new HttpParams()
        .set('client_id', environment.clientId)
        .set('client_secret', environment.channelSecret)
        .set('grant_type', 'refresh_token')
        .set('refresh_token', refreshToken);

      const refreshedlineToken: LineToken = await this.http
        .post<LineToken>(this.lineOauthApiUrl, body, {
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
        .set('redirect_uri', environment.redirectUri)
        .set('client_id', environment.clientId)
        .set('client_secret', environment.channelSecret)
        .set('grant_type', 'authorization_code');

      const lineToken: LineToken = await this.http
        .post<LineToken>(this.lineOauthApiUrl, body, {
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

  public async isFriend(): Promise<boolean> {
    try {
      const accessToken: string | null = localStorage.getItem('access_token');

      const res: { friendFlag: boolean } = await this.http
        .get<{ friendFlag: boolean }>(this.friendshipStatusUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .toPromise();

      return res.friendFlag;
    } catch {
      return false;
    }
  }
}
