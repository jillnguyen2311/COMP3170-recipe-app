// App.js

import { useEffect, useState } from "react";
import "./styles.css";
import RecipeForm from "./Components/RecipeForm";
import RecipeList from "./Components/RecipeList";
import AddRecipeForm from "./Components/AddRecipeForm";
import { ChakraProvider } from "@chakra-ui/react";
import { Heading, Button } from "@chakra-ui/react";
import { InventoryContext } from "./data/inventoryContext";

const API_KEYS = [
  "d479cd983a164fc5b23373bbfafb5061",
  "1e12492708034f08939ee5041e2b450f",
  "447f5e20a3d54ff5be4d42d94cc85804",
  "f40e22bbc0c64e35b2da72f92aa38837",
  "c1007fe476f342669e8a3ba32c881031",
  "b103f268819745d0b673abb444514395",
  "730c494fdc83459ca37442b1a13cb36a",
  "22d03274ed3d4424a154731f11db899a"
];

export default function App() {
  const [apiKeyIndex, setApiKeyIndex] = useState(0);
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [recipeIdCounter, setRecipeIdCounter] = useState(0); // Counter for recipe IDs
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  useEffect(() => {
    if (loadMoreClicked) {
      async function fetchRecipeData() {
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${API_KEYS[apiKeyIndex]}&number=8&page=${page}`
          );
          if (!response.ok) {
            const errorStatus = response.status;
            if (errorStatus === 402) {
              switchApiKeyWithDelay();
            }
          }
          const data = await response.json();
          const newRecipes = data.recipes.map((recipe, index) => ({
            ...recipe,
            id: recipeIdCounter + index, // Use the counter for sequential IDs
          }));
          setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
          setRecipeIdCounter((prevCounter) => prevCounter + data.recipes.length); // Update the counter
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }

      if (recipes.length === 0 || page > 1) {
        fetchRecipeData();
        setLoadMoreClicked(false); // Reset the state after loading more recipes
      }
    }
  }, [page, recipes, apiKeyIndex, recipeIdCounter, loadMoreClicked]);

  function addRecipe(recipe) {
    const newRecipes = [...recipes, { ...recipe, id: recipeIdCounter }];
    setRecipes(newRecipes);
    setRecipeIdCounter((prevCounter) => prevCounter + 1); // Increment the counter
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
    setLoadMoreClicked(true);
  }

  function switchApiKey() {
    setApiKeyIndex((prevIndex) => (prevIndex + 1) % API_KEYS.length);
  }

  function switchApiKeyWithDelay() {
    // Delay switching API key for 30 seconds
    setTimeout(() => {
      switchApiKey();
    }, 30000);
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
