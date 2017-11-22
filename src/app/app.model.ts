export class App
{
  // local
  public loaded: boolean;
  public lang: string;
  public navigation: any;
  // json
  public brand: any;
  public languages: any;
  public links: any;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.loaded = false;
    this.lang = '';
    this.navigation =
    {
      'isActive': false
    };

    this.brand = {};
    this.languages = [];
    this.links = [];
  }

  public initialize(json: any): void
  {
    try
    {
      this.brand = json.data.brand;
      this.languages = json.data.languages;

      json.data.links.forEach((item) =>
      {
        if (item.show)
        {
          this.links.push(item.link);
        }
      });
    }
    catch (e)
    {
      console.log('error:', e);
      this.init();
    }
  }
}
