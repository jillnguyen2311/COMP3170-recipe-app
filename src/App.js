// App.js

import { useEffect, useState } from "react";
import "./styles.css";
import RecipeForm from "./Components/RecipeForm";
import RecipeList from "./Components/RecipeList";
import AddRecipeForm from "./Components/AddRecipeForm"; // Import the new component
import { ChakraProvider } from "@chakra-ui/react";
import { Heading, Button } from "@chakra-ui/react";
import { InventoryContext } from "./data/inventoryContext";

const API_KEY = "f40e22bbc0c64e35b2da72f92aa38837";

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    async function fetchRecipeData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=8&page=${page}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const newRecipes = data.recipes.map((recipe) => ({
          ...recipe,
          id: recipe.id || String(Math.random()),
        }));
        setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    if (recipes.length === 0 || page > 1) {
      fetchRecipeData();
    }
  }, [page, recipes]);

  function addRecipe(recipe) {
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    setEditing(null);
  }

  function updateRecipe(updatedRecipe) {
    const newRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(newRecipes);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    setEditing(null);
  }

  function deleteRecipe(id) {
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newRecipes);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
  }

  function loadMoreRecipes() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <ChakraProvider>
      <div className="App">
        <InventoryContext.Provider
          value={{
            recipes,
            addRecipe,
            deleteRecipe,
            updateRecipe,
            setEditing,
            editing,
          }}
        >
          <Heading m="20">Recipes App</Heading>
          {!editing ? (
            <>
              <Button
                className="save-btn add-btn"
                onClick={() => setEditing("new")}
                colorScheme="black"
                variant="outline"
              >
                + Add New Recipe +
              </Button>
              <RecipeList />
              <Button
                className="load-more-btn"
                onClick={loadMoreRecipes}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </>
          ) : (
            editing === "new" ? (
              <AddRecipeForm />
            ) : (
              <RecipeForm />
            )
          )}
        </InventoryContext.Provider>
      </div>
    </ChakraProvider>
  );
}
