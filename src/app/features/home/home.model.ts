export class Home
{
  public loaded: boolean;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.loaded = false;
  }

  public initialize(json: any): void
  {
    try
    {
      this.loaded = true;
    }
    catch (e)
    {
      console.log("Ooops, something went wrong!");
      this.init();
    }
  }
}
