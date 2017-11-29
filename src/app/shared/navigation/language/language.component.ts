import { Component, ChangeDetectorRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { I18nService } from '@app/core/services/i18n.service';

import { Languages } from '@app/languages.model';

@Component({
  selector: 'app-language',
  templateUrl: './language.view.html',
  styleUrls: ['./language.style.scss']
})

export class LanguageComponent implements AfterViewInit
{
  public loaded: boolean;
  public active: boolean;

  @Input() languages: Languages;
  @Output() onSelectLanguage = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    private i18nService: I18nService
  ) {
    this.init();
  }

  ngAfterViewInit()
  {
    this.loaded = true;
    this.cdr.detectChanges();
  }

  private init(): void
  {
    this.loaded = false;
    this.active = false;
  }

  public toggleMenu(): void
  {
    this.active = !this.active;
  }

  public selectLanguage(index: number): void
  {
    this.active = false;

    if (this.languages.list[index].id !== this.languages.active.id)
    {
      this.onSelectLanguage.emit(this.languages.list[index]);
    }
  }

  public i18n(obj: any, key: string): any
  {
    return this.i18nService.tryI18n(obj, key, this.languages.active.id);
  }
}
