import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const RecipeDetails = ({ ingredients }) => ingredients.map((ingredient) => (
            <ul key={uuidv4()} className='ingredient-list'>
                <li className='ingriedent-text'>{ingredient.text}</li>
                <li className='ingrindent-weight'>Weight-{ingredient.weight}</li>
            </ul>
));

export default RecipeDetails;
