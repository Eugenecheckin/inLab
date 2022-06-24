export interface IShortPokemonsList {
  url: string;
  name: string;
}

export interface IEffectEntries {
  effect: string;
  language: {
    name: string;
  };
  short_effect: string;
}

export interface IFlavorEntries {
  flavor_text: string;
  language: {
    name : string;
  };
  version_group: {
    name: string;
  };
}

export interface IExtendedAbility {
  id: number;
  name: string;
  effect_entries: IEffectEntries[];
  flavor_text_entries: IFlavorEntries[];
}

export interface IAbilityBase {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}
export interface IPokemonBase {
  id: number,
  name: string,
  sprites: {
    back_default: string,
    back_shiny: string,
    front_default: string,
    front_shiny: string,
  }
  abilities: IAbilityBase[]
}
