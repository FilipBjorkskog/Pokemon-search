import React from 'react';

export type Pokemon = {
  id: string;
  name: string;
  base_experience: string;
  sprites: {
    front_default: string;
  };
};

interface GetPokemonProps {
  data: Pokemon;
}

const GetPokemon: React.FC<GetPokemonProps> = ({ data }) => {
  if (!data.name) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>
        <h2>Id: {data.id}</h2>
        <h2>Name: {data.name}</h2>
        <h2>Exp: {data.base_experience}</h2>
        <img
          className='h-40 '
          src={`https://img.pokemondb.net/artwork/large/${data.name}.jpg`}
          alt={data.name}
        />
      </div>
    </div>
  );
};

export default GetPokemon;
