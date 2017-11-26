export class App
{
  public loaded: boolean;
  public width: number;
  public height: number;

  public language: any;
  public navigation: any;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.loaded = false;
    this.width = 0;
    this.height = 0;

    this.language = {
      'default': '',
      'available': []
    };
    this.navigation =
    {
      'brand': {},
      'links': []
    };
  }

  public initialize(json: any): void
  {
    try
    {
      if (json.data.language.default === 'undefined' || json.data.language.available === 'undefined')
      {
        throw "Undefined";
      }
      else if (json.data.navigation.brand === 'undefined')
      {
        throw "Undefined";
      }
      else if (json.data.navigation.links === 'undefined')
      {
        throw "Undefined";
      }
      else
      {
        this.language =
        {
          'default': json.data.language.default,
          'available': json.data.language.available
        };

        this.navigation.brand = json.data.navigation.brand;

        json.data.navigation.links.forEach((item) =>
        {
          if (item.show)
          {
            this.navigation.links.push(item.link);
          }
        });
      }
    }
    catch (e)
    {
      console.log("Ooops, something went wrong...");
      this.init();
    }
  }
}
