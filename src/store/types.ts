export interface IPokemon {
  id: string;
  name: string;
  shortAbilities: {
    effect: {effect: any; short_effect: any}[];
    flavor: any[];
    name: string;
  }[];
  source: {
    front: string;
    frontShiny: string;
    back: string;
    backShiny: string;
  };
}
export interface IShortPokemon {
  url: string;
  name: string;
}

export interface PokeSlice {
  isNoticed: boolean;
  personsShortListData: Array<IShortPokemon>;
  personListData: Array<IPokemon>;
  filterPersonListData: Array<IPokemon>;
  filter: { ability: string };
}
