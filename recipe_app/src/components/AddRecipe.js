import React, { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function AddRecipe( { editRecipe, setEditRecipe } ) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if(editRecipe) {
      setTitle(editRecipe.title);
      setIngredients(editRecipe.ingredients);
      setSteps(editRecipe.steps);
      setCategory(editRecipe.category);
    }
  }, [editRecipe])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(ingredients, steps)
      if (editRecipe) {
        await updateDoc(doc(db, "recipes", editRecipe.id), {
          title,
          ingredients: ingredients.length>1 ? ingredients.split(",") : ingredients[0],
          steps: steps.length>1 ? steps.split(",") : steps[0],
          category
        });
        alert("Recipe edited successfully!");
        setEditRecipe(null);
      } else {
        await addDoc(collection(db, "recipes"), {
          title,
          ingredients: ingredients.split(","),
          steps: steps.split(","),
          category
        });
        alert("Recipe added successfully!");
      }
    } catch (e) {
      console.error("Error adding recipe: ", e);
    } finally {
      setTitle('');
      setIngredients('');
      setSteps('');
      setCategory('');
    }
  };

  return (
    <div className="left">
        <h2>{editRecipe? "Edit Recipe":"Add Recipe"}</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
        <textarea
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
        />
        <textarea
            placeholder="Steps (comma separated)"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
        />
        <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">{editRecipe? "Edit":"Add"}</button>
        </form>
    </div>
  );
}

export default AddRecipe;