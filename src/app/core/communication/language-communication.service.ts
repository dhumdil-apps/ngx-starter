import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * 'Features' to 'App' communication
 */
@Injectable()
export class LanguageCommunicationService
{
  private onChangeLanguage = new Subject<string>();
  private onVerifyLanguage = new Subject<void>();

  onChangeLanguage$ = this.onChangeLanguage.asObservable();
  onVerifyLanguage$ = this.onVerifyLanguage.asObservable();

  public changeLanguage(language: string)
  {
    this.onChangeLanguage.next(language);
  }

  public verifyLanguage()
  {
    this.onVerifyLanguage.next();
  }
}
