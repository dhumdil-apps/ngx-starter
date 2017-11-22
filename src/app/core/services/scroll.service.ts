import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ScrollService
{
  public element: any;

  constructor(public ngZone: NgZone)
  {}

  private scrollUp(position: number, now: number): void
  {
    now -= Math.ceil((now - position) / 10 + 10);

    if (position < now)
    {
      this.element.nativeElement.scrollTop = now;
      requestAnimationFrame(() => this.scrollUp(position, now));
    }
    else
    {
      this.element.nativeElement.scrollTop = position;
    }
  }

  private scrollDown(position: number, now: number)
  {
    now += Math.ceil((position - now) / 10 + 10);

    if (position > now)
    {
      this.element.nativeElement.scrollTop = now;
      requestAnimationFrame(() => this.scrollDown(position, now));
    }
    else
    {
      this.element.nativeElement.scrollTop = position;
    }
  }

  public scrollTo(el: any, position: number): void
	{
    this.ngZone.runOutsideAngular(() =>
    {
      this.element = el;
  		let now = this.element.nativeElement.scrollTop;

  		if (position < now)
  		{
        requestAnimationFrame(() => this.scrollUp(position, now));
      }
      else if (position > now)
      {
        requestAnimationFrame(() => this.scrollDown(position, now));
      }
    });
	}
}
