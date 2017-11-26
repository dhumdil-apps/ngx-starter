import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.view.html',
  styleUrls: ['./language.style.scss']
})

export class LanguageComponent
{
  public active: boolean;

  @Input() language;
  @Output() onSelectLanguage = new EventEmitter();

  constructor()
  {
    this.active = false;
  }

  public toggleMenu(): void
  {
    this.active = !this.active;
  }

  public getDefaultIcon(): string
  {
    for (let i = 0; i < this.language.available.length; i++)
    {
      if (this.language.available[i].id === this.language.default)
      {
        return (this.language.available[i].icon);
      }
    }
    return ('#');
  }

  public selectLanguageEv(language: string): void
  {
    this.active = false;
    this.onSelectLanguage.emit(language);
  }
}
