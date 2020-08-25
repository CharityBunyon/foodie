import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Recipe from '../components/Recipes';
import Alert from '../components/Alert';
import './App.scss';

const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');
  // array destructuring
  // query is the data that should be updating
  // setQuery is the method used to update the data

  const APP_ID = '709ce2b9';
  const APP_KEY = 'e5e7bc32252278927fcff0206572037d';
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const result = await axios.get(url);
      if (!result.data.more) {
        return setAlert('No food with such name');
      }
      console.log(result);
      setRecipes(result.data.hits);
      setAlert('');
      setQuery('');
    } else {
      setAlert('Please fill in the form');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className='App'>
      <h1 onClick={getData}>Food Searching App</h1>
      <form className='search-form' onSubmit={onSubmit}>
        {alert !== '' ? <Alert alert={alert}/> : ''}
        <input
        type='text'
        placeholder='search food'
        autoComplete='off'
        onChange={onChange}
        value={query}
        />
        <input
        type='submit'
        value='search'
        />
      </form>

      <div className='recipes'>
        {recipes !== [] && recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
