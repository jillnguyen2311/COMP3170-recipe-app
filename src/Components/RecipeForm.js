// RecipeForm.js

import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { InventoryContext } from "../data/inventoryContext";
import { Input, Button } from "@chakra-ui/react";

export default function RecipeForm() {
  const { addRecipe, setEditing, updateRecipe, editing, recipes } = useContext(
    InventoryContext
  );

  let initialData = {
    title: "",
    dishTypes: "",
    cuisines: "",
    servings: "",
    readyInMinutes: "",
    image: "",
  };

  if (editing !== "new") {
    initialData = recipes.find((recipe) => recipe.id === editing);
  }

  const [recipe, setRecipe] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();

    if (editing === "new") {
      addRecipe({
        ...recipe,
        id: nanoid(),
      });
    } else {
      updateRecipe(recipe);
    }

    // Clear the form after submission
    setRecipe({
      title: "",
      dishTypes: "",
      cuisines: "",
      servings: "",
      readyInMinutes: "",
      image: "",
    });

    // Exit editing mode
    setEditing(null);
  }

  function handleInput(e, field) {
    setRecipe({ ...recipe, [field]: e.target.value });
  }

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <Input
            type="text"
            value={recipe.title}
            onChange={(e) => handleInput(e, "title")}
          />
        </div>
        <div>
          <label>Dish Type:</label>
          <Input
            type="text"
            value={recipe.dishTypes}
            onChange={(e) => handleInput(e, "dishType")}
          />
        </div>
        <div>
          <label>Cuisine:</label>
          <Input
            type="text"
            value={recipe.cuisines}
            onChange={(e) => handleInput(e, "cuisine")}
          />
        </div>
        <div>
          <label>Servings:</label>
          <Input
            type="text"
            value={recipe.servings}
            onChange={(e) => handleInput(e, "servings")}
          />
        </div>
        <div>
          <label>Ready in (minutes):</label>
          <Input
            type="text"
            value={recipe.readyInMinutes}
            onChange={(e) => handleInput(e, "readyInMinutes")}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <Input
            type="text"
            value={recipe.image}
            onChange={(e) => handleInput(e, "image")}
          />
        </div>
        <div className="form-btns">
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => setEditing(null)}
          >
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

