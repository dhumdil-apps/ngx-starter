import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppCommunicationService
{
  private onChangeLanguage = new Subject<string>();
  private onSelectFeature = new Subject<number>();
  private onSelectLanguage = new Subject<string>();
  private onVerifyLanguage = new Subject<void>();

  onChangeLanguage$ = this.onChangeLanguage.asObservable();
  onSelectFeature$ = this.onSelectFeature.asObservable();
  onSelectLanguage$ = this.onSelectLanguage.asObservable();
  onVerifyLanguage$ = this.onVerifyLanguage.asObservable();

  public changeLanguage(languageId: string): void
  {
    this.onChangeLanguage.next(languageId);
  }

  public selectFeature(featureId: number): void
  {
    this.onSelectFeature.next(featureId);
  }

  public selectLanguage(languageId: string): void
  {
    this.onSelectLanguage.next(languageId);
  }

  public verifyLanguage(): void
  {
    this.onVerifyLanguage.next();
  }
}
