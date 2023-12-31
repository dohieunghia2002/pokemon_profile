import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';
import { PokemonDetail, ViewDetail } from './interface';

interface Pokemon {
  name: string;
  url: string;
}

const App:React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [viewDetail, setDetail] = useState<ViewDetail>({
    id: 0,
    isOpened: false
  });

  useEffect(() => {
    const getPokemon = async() => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20');
      
      setNextUrl(res.data.next);

      res.data.results.forEach(async (pokemon: Pokemon) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
    }

    getPokemon();
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);

    res.data.results.forEach(async(pokemon:Pokemon) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  }

  return (
    <div className='App'>
      <div className='container'>
        <header className='pokemon-header'>Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />

        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>{loading ? 'Loading...' : 'Load more'}</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
