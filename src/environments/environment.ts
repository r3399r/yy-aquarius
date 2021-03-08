// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://pxt9qcn9z6.execute-api.ap-northeast-1.amazonaws.com/dev',

  // line-auth
  clientId: '1655679061',
  redirectUri: 'https://d1tr4ax897kn7u.cloudfront.net/home',
  // redirectUri: 'http://localhost:4200/home',
  channelSecret: 'c415146bb6ebdd99de1ff383ec560721',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
