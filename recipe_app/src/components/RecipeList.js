import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import Search from "./Search";
import AddRecipe from "./AddRecipe";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      setRecipes(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="container">
      <AddRecipe editRecipe={editRecipe} setEditRecipe={setEditRecipe}/>
      <div className="right">
        <h2>Recipe List</h2>
        <Search />
        <div>
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p>{recipe.category}</p>
                <button onClick={() => setEditRecipe(recipe)}>Edit</button>
                <button onClick={() => handleDelete(recipe.id)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
    </div>
    
  );
}

export default RecipeList;