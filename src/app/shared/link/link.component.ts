import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.view.html',
  styleUrls: ['./link.style.scss']
})

export class LinkComponent implements AfterViewInit
{
  public loaded: boolean;

  @Input() title;
  @Input() icon;
  @Input() url;

  @Output() selected = new EventEmitter();

  constructor()
  {
    this.loaded = false;
  }

  ngAfterViewInit()
  {
    this.loaded = true;
  }

  public isSet(str: string): boolean
  {
    return (str !== '');
  }

  public selectedEv(): void
  {
    this.selected.emit();
  }
}
