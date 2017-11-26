import { Injectable } from '@angular/core';
import { Meta, Title }	from '@angular/platform-browser';

@Injectable()
export class PageService
{
  constructor(private title: Title, private meta: Meta)
  {}

  updateTitle(title: string): void
  {
    this.title.setTitle(title);
  }

  updateDescription(description: string): void
  {
		this.meta.addTags(
      [
        {
    			name: 'description',
    			content: description
    		}
      ]
    );
  }
}
