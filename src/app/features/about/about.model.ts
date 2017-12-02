import { Feature } from '@app/features.model';

export class About
{
  public feature: Feature;
  public languages: string[];
  public loaded: boolean;

  constructor()
  {
    this.init();
  }

  private init(): void
  {
    this.feature = new Feature();
    this.languages = [];
    this.loaded = false;
  }

  public initialize(json: any): void
  {
    try
    {
      console.log("Json loaded!");
      this.feature = json['data']['feature'];
      this.languages = json['data']['languages'];
      this.loaded = true;
    }
    catch (e)
    {
      console.log("Ooops, something went wrong!");
      this.init();
    }
  }
}
