export class Language
{
  public id: string;

  public icon: string;

  public title: string;
  public titleI18n: any;

  constructor()
  {
    this.id = undefined;

    this.icon = undefined;

    this.title = undefined;
    this.titleI18n = {};
  }
}

export class Languages
{
  public active: Language;
  public list: Language[];

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.active = new Language();
    this.list = [];
  }

  public initialize(languages: Language[]): void
  {
    try
    {
      if (languages.length > 0)
      {
        this.list = languages;
        this.active = languages[0];
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
