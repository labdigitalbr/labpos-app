// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:1337',
  cp: {
    api_key: '5579980505863a3f6aabd82.89189525',
    site_id: 659913,
    notify_url: 'https://YOUR_NOTIFY_URL',
    currency: 'BRL'
  },
  firebase : {
    apiKey: "AIzaSyC6Wyf64bpVRBTu9F1u8ShqXjbum9q4Rxw",
    authDomain: "labpos-d5ef2.firebaseapp.com",
    databaseURL: "https://labpos-d5ef2.firebaseio.com",
    projectId: "labpos-d5ef2",
    storageBucket: "labpos-d5ef2.appspot.com",
    messagingSenderId: "274086257916",
    appId: "1:274086257916:web:a6eb35935b47f124"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
