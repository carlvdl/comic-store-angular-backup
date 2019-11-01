import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  //
  // getConfig() {
  //   // now returns an Observable of Config
  //   return this.http.get<Config>(this.configUrl);
  // }
}
