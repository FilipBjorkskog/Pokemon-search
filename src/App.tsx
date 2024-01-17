import { useState, useEffect } from 'react';
import GetPokemon, { Pokemon } from './components/Pokemon/GetPokemon';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'name' | 'id'>('name');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      if (searchType === 'name') {
        fetchPokemonByName(searchTerm);
      } else {
        const pokemonId = parseInt(searchTerm);
        if (!isNaN(pokemonId)) {
          fetchPokemonById(pokemonId);
        } else {
          // Återställ Pokemon till null om ID inte är ett nummer
          setPokemon(null);
        }
      }
    }
  };

  const fetchPokemonByName = async (name: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setPokemon(data);
    } else {
      setPokemon(null);
    }
  };

  const fetchPokemonById = async (id: number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setPokemon(data);
    } else {
      setPokemon(null);
    }
  };

  const ifCaught = (exp: number) => {
    const chance = Math.random();
    const caught = -0.00109 * exp + 0.549;
    return chance <= caught;
  };

  const handleCatch = () => {
    if (pokemon) {
      console.log(ifCaught(parseFloat(pokemon.base_experience)));
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className='w-full h-screen bg-gray-400 p-8'>
      <div className='mb-4'>
        <label htmlFor='searchType' className='mr-2'>
          Sök efter:
        </label>
        <select
          id='searchType'
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as 'name' | 'id')}
          className='p-2 border border-gray-500 rounded'
        >
          <option value='name'>Namn</option>
          <option value='id'>ID</option>
        </select>
        <input
          type='text'
          placeholder={`Sök efter Pokémon ${searchType === 'name' ? 'namn' : 'ID'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-2 border border-gray-500 rounded ml-2'
        />
        <button
          onClick={handleSearch}
          className='ml-2 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Sök
        </button>
      </div>
      {pokemon ? (
        <div>
          <GetPokemon data={pokemon} />
          <button
            onClick={handleCatch}
            className='px-4 py-2 bg-green-500 text-white rounded'
          >
            Catch
          </button>
        </div>
      ) : (
        <div className='text-red-500'>Ingen Pokémon hittad</div>
      )}
    </div>
  );
}

export default App;
