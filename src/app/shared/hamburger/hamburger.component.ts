import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.view.html',
  styleUrls: ['./hamburger.style.scss']
})

export class HamburgerComponent
{
  @Input() active;
  @Output() onClick = new EventEmitter();

  public clickEv(): void
  {
    this.onClick.emit();
  }
}
