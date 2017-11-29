import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Language, Languages } from '@app/languages.model';

@Injectable()
export class LanguageCommunicationService
{
  private onChangeLanguage = new Subject<Language>();
  private onUpdateLanguage = new Subject<Languages>();
  private onVerifyLanguage = new Subject<void>();

  onChangeLanguage$ = this.onChangeLanguage.asObservable();
  onUpdateLanguage$ = this.onUpdateLanguage.asObservable();
  onVerifyLanguage$ = this.onVerifyLanguage.asObservable();

  public changeLanguage(language: Language): void
  {
    this.onChangeLanguage.next(language);
  }

  public updateLanguage(languages: Languages): void
  {
    this.onUpdateLanguage.next(languages);
  }

  public verifyLanguage(): void
  {
    this.onVerifyLanguage.next();
  }
}
