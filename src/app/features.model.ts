export class Feature
{
  public id: number;
  public module: string;

  public route: string;
  public routeI18n: any;

  public title: string;
  public titleI18n: any;
  
  constructor()
  {
    this.id = 0;
    this.module = undefined;

    this.route = undefined;
    this.routeI18n = {};

    this.title = undefined;
    this.titleI18n = {};
  }
}

export class Features
{
  public active: Feature;
  public list: Feature[];

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.active = new Feature();
    this.list = [];
  }

  public initialize(features: Feature[]): void
  {
    try
    {
      if (features.length > 0)
      {
        this.list = features;
        this.list.map((feature, index) => feature.id = index);
        this.active = features[0];
      }
      else
      {
        throw "Error";
      }
    }
    catch (e)
    {
      console.log("Ooops, something went wrong...");
      this.init();
    }
  }
}
