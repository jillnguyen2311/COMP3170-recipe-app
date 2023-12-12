// RecipeList.js

import { useContext, useState, useEffect } from "react";
import Recipe from "./Recipe";
import { InventoryContext } from "../data/inventoryContext";
import { Select, Box } from "@chakra-ui/react";

export default function RecipeList() {
  const { recipes } = useContext(InventoryContext);
  const [sortDishType, setSortDishType] = useState("");
  const [sortCuisine, setSortCuisine] = useState("");
  const [uniqueDishTypes, setUniqueDishTypes] = useState([]);
  const [uniqueCuisines, setUniqueCuisines] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Collect unique dish types and cuisines from recipes
    const dishTypesSet = new Set();
    const cuisinesSet = new Set();

    recipes.forEach((recipe) => {
      if (Array.isArray(recipe.dishTypes)) {
        recipe.dishTypes.forEach((dishType) => dishTypesSet.add(dishType));
      }

      if (Array.isArray(recipe.cuisines)) {
        recipe.cuisines.forEach((cuisine) => cuisinesSet.add(cuisine));
      }
    });

    const dishTypesArray = Array.from(dishTypesSet);
    const cuisinesArray = Array.from(cuisinesSet);

    setUniqueDishTypes(dishTypesArray);
    setUniqueCuisines(cuisinesArray);
  }, [recipes]);

  useEffect(() => {
    // Apply filters when sortDishType or sortCuisine changes
    console.log("Original recipes:", recipes);
    let filtered = recipes;

    if (sortDishType) {
      console.log("Filtering by dish type:", sortDishType);
      filtered = filtered.filter((recipe) =>
        Array.isArray(recipe.dishTypes) && recipe.dishTypes.includes(sortDishType)
      );
    }

    if (sortCuisine) {
      console.log("Filtering by cuisine:", sortCuisine);
      filtered = filtered.filter((recipe) =>
        Array.isArray(recipe.cuisines) && recipe.cuisines.includes(sortCuisine)
      );
    }

    console.log("Filtered recipes:", filtered);
    setFilteredRecipes(filtered);
  }, [recipes, sortDishType, sortCuisine]);

  return (
    <Box bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)' borderRadius='20' pt='10' pb='5'>
      <div className="filters">
        <label>
          Sort by Dish Type:
          <Select
            defaultValue={sortDishType}
            onChange={(e) => setSortDishType(e.target.value)}
            bg="pink"
            borderColor="red"
            color="black"
          >
            <option value="">All</option>
            {uniqueDishTypes.map((dishType) => (
              <option key={`dishType-${dishType}`} value={dishType}>
                {dishType}
              </option>
            ))}
          </Select>
        </label>
        <label>
          Sort by Cuisine:
          <Select
            defaultValue={sortCuisine}
            onChange={(e) => setSortCuisine(e.target.value)}
            bg="pink"
            borderColor="red"
            color="black"
          >
            <option value="">All</option>
            {uniqueCuisines.map((cuisine) => (
              <option key={`cuisine-${cuisine}`} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </Select>
        </label>
      </div>
      <div className="products">
        {filteredRecipes.map((recipe) => (
          <Recipe key={`recipe-${recipe.id}`} recipe={recipe} />
        ))}
      </div>
    </Box>
  );
}
