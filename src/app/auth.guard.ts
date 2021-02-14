import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LineAuthService } from 'src/app/services/line-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private lineAuthService: LineAuthService;
  public router: Router;

  constructor(lineAuthService: LineAuthService, router: Router) {
    this.lineAuthService = lineAuthService;
    this.router = router;
  }

  public async canActivate(): Promise<boolean> {
    const result: boolean = await this.lineAuthService.isAuth();
    if (result) return true;

    this.router.navigate(['login']);

    return false;
  }
}
