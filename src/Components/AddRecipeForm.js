// AddRecipeForm.js

import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { InventoryContext } from "../data/inventoryContext";
import { Input, Button } from "@chakra-ui/react";

export default function AddRecipeForm() {
  const { addRecipe, setEditing } = useContext(InventoryContext);

  const initialData = {
    title: "",
    dishTypes: "",
    cuisines: "",
    servings: "",
    readyInMinutes: "",
    image: "",
  };

  const [recipe, setRecipe] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();

    addRecipe({
      ...recipe,
      id: nanoid(),
    });

    setRecipe(initialData);
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
            onChange={(e) => handleInput(e, "dishTypes")}
          />
        </div>
        <div>
          <label>Cuisine:</label>
          <Input
            type="text"
            value={recipe.cuisines}
            onChange={(e) => handleInput(e, "cuisines")}
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
