import React from 'react';
import { PokemonViewDetail, ViewDetail } from '../interface';
import PokemonList from './PokemonList';
import './pokemon.css';

interface Props {
    pokemons: PokemonViewDetail[];
    viewDetail: ViewDetail;
    setDetail: React.Dispatch<React.SetStateAction<ViewDetail>>
}

const PokemonCollection:React.FC<Props> = (props) => {
    const {pokemons, viewDetail, setDetail} = props;

    const selectPokemon = (id: number) => {
        if(!viewDetail.isOpened) {
            setDetail({
                id: id,
                isOpened: true
            });
        }
    }

    return (
        <div>
            <section className={viewDetail.isOpened ? 'collection-container-active' : 'collection-container'}>
                {viewDetail.isOpened ? (
                    <div className='overplay'></div>
                ) : (
                    <div className=''></div>
                )}
                {
                    pokemons.map((pokemon) => {
                        return (
                            <div onClick={() => selectPokemon(pokemon.id)}>
                                <PokemonList
                                    key={pokemon.id}
                                    name={pokemon.name}
                                    id={pokemon.id}
                                    image={pokemon.sprites.front_default}
                                    abilities={pokemon.abilities}
                                    viewDetail={viewDetail}
                                    setDetail={setDetail}
                                />
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default PokemonCollection
