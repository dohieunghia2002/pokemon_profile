export interface PokemonDetail {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    }
}

export interface ViewDetail {
    id: number;
    isOpened: boolean;
}

export interface PokemonViewDetail extends PokemonDetail {
    abilities?: {
        ability: string;
        name: string;
    }[];
}