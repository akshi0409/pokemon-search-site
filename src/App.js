import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonname,setPokemonName]=useState("");
  const [pokemonChosen,setPokemonChosen]=useState(false);
  const [pokemon,setPokemon]=useState({
    name:"",
    species:"",
    img:"",
    hp:"",
    attack:"",
    defense:"",
    type:"",
  });
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`).then((response)=>{
      setPokemon({
        name:pokemonname,
        species:response.data.species.name,
        img:response.data.sprites.front_default,
        hp:response.data.stats[0].base_stat,
        attack:response.data.stats[1].base_stat,
        defense :response.data.stats[2].base_stat,
        type:response.data.types[0].type.name,
      })
      setPokemonChosen(true);
    })
  }
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Information</h1>
        <input className="inputSection" type="text" onChange={(event)=>{
          setPokemonName(event.target.value)
          }}></input>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="displaySection">
        {!pokemonChosen ? (
        <h1>Please choose a valid Pokemon name</h1>
        ):
        (
          <>
            {
            pokemon.species!=pokemonname ? 
            (<h1>Choose a valid name</h1>):
            (
              <>
            <h1>{pokemonname}</h1>
            <img src={pokemon.img}></img>
            <h3>Species : {pokemon.species}</h3>
            <h3>Type : {pokemon.type}</h3>
            <h3>Hp : {pokemon.hp}</h3>
            <h3>Attack : {pokemon.attack}</h3>
            <h3>Defense : {pokemon.defense}</h3>
            </>
            )
           }
          </>
        )}
      </div>
    </div>
  );
}

export default App;
