import { Injectable } from '@angular/core';
import { Meta, Title }	from '@angular/platform-browser';

@Injectable()
export class MetaService
{
  constructor(private title: Title, private meta: Meta)
  {}

  update(title: string, description: string): void
  {
    this.title.setTitle(title);
		this.meta.addTags([
      {
  			name: 'description',
  			content: description
  		}
    ]);
  }
}
