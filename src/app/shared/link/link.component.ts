import { Component, ChangeDetectorRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { Link } from './link.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.view.html',
  styleUrls: ['./link.style.scss']
})

export class LinkComponent implements AfterViewInit
{
  public link: Link;

  @Input() url;
  @Input() type;
  @Input() title;

  @Output() onClick = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef)
  {
    this.link = new Link();
  }

  ngAfterViewInit()
  {
    console.log(this.title);
    this.link.initialize(this.url, this.type, this.title);
    this.cdr.detectChanges();
  }

  public isSet(str: string): boolean
  {
    return (str !== '');
  }

  public clickEv(): void
  {
    this.onClick.emit();
  }
}
