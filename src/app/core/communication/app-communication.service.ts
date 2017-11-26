import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { App } from '@app/app.model';

/**
 * 'App' to 'Features' comunication
 */
@Injectable()
export class AppCommunicationService
{
  private onAppUpdate = new Subject<App>();

  onAppUpdate$ = this.onAppUpdate.asObservable();

  public updateApp(app: App)
  {
    this.onAppUpdate.next(app);
  }
}
