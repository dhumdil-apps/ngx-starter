export class Home
{
  public loaded: boolean;
  public height: number;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.height = 0;
    this.loaded = false;
  }

  public initialize(json: any): void
  {
    try
    {
      // console.log(json);
      this.loaded = true;
    }
    catch (e)
    {
      console.log("Ooops, something went wrong!");
      this.init();
    }
  }
}
