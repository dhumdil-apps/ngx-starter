export class Link
{
  public loaded: boolean;
  public url: string;
  public type: string;
  public title: string;

  constructor()
  {
    this.loaded = false;
    this.url = '';
    this.title = '';
    this.type = '';
  }

  public initialize(url: string, type: string, title: string)
  {
    this.loaded = true;
    this.url = url;
    this.type = type;
    this.title = title;
  }
}
