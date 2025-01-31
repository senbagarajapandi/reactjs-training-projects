import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const recipesRef = collection(db, "recipes");
    const q = query(
      recipesRef,
      where("title", "==", searchQuery)
    );
    const querySnapshot = await getDocs(q);
    setResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title"
      />
      <div>
        {results.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;