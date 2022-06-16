export interface IShortListPokemons {
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
  effect_entries: Array<IEffectEntries>;
  flavor_text_entries: Array<IFlavorEntries>;
}

export interface PokeSlice {
  isNoticed: boolean;
  filteredPokemons: Array<IPokemonBase>;
  filter: { ability: string };
  pokemons: Array<IPokemonBase>;
  extendedAbilities: Array<IExtendedAbility>
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
    back_dafuult: string,
    back_shiny: string,
    front_default: string,
    front_shiny: string,
  }
  abilities: Array<IAbilityBase>
}
