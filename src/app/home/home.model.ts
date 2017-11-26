export class Home
{
  public loaded: boolean;
  public txt: any;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.txt = '';
    this.loaded = false;
  }

  public initialize(json: any): void
  {
    try
    {
      this.txt = json.data.txt;
      this.loaded = true;
    }
    catch (e)
    {
      this.init();
    }
  }
}
