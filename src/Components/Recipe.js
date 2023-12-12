// Recipe.js

import { useContext } from "react";
import { InventoryContext } from "../data/inventoryContext";
import {
  Card,
  Flex, // Import Flex component
  Box, // Import Box component
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

export default function Recipe({ recipe }) {
  const { deleteRecipe, setEditing, updateRecipe } = useContext(
    InventoryContext
  );

  const openSpoonacularPage = () => {
    if (recipe.spoonacularSourceUrl) {
      window.open(recipe.spoonacularSourceUrl, "_blank");
    }
  };

  return (
    <Card maxW="sm">
     
      <Flex direction="column">
        <Image
          src={recipe.image || "https://via.placeholder.com/300"}
          fallbackSrc="https://via.placeholder.com/300"
          alt="Recipe Image"
          borderRadius="lg"
          objectFit="cover" 
        />
        <CardBody flex="1"> 
          <Stack mt="6" spacing="3">
            <Heading size="md">{recipe.title}</Heading>
            <Text>
              <span style={{ textDecoration: "underline" }}> Dish type</span>
              <span>: </span>
              {Array.isArray(recipe.dishTypes) && recipe.dishTypes.length > 0
                ? recipe.dishTypes.join(", ")
                : "N/A"}
            </Text>
            <Text>
              <span style={{ textDecoration: "underline" }}> Cuisine</span>
              <span>: </span>
              {Array.isArray(recipe.cuisines) && recipe.cuisines.length > 0
                ? recipe.cuisines.join(", ")
                : "N/A"}
            </Text>
            <Text>
              <span style={{ textDecoration: "underline" }}>Servings</span>
              <span>: </span> {recipe.servings || "N/A"}
            </Text>
            <Text>
              <span style={{ textDecoration: "underline" }}>Ready in</span>
              <span>: </span> {recipe.readyInMinutes || "N/A"} minutes
            </Text>
            {/* Add more details based on the Spoonacular API response */}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => setEditing(recipe.id)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={() => deleteRecipe(recipe.id)}
            >
              Remove
            </Button>
            <Button
              variant="link"
              colorScheme="pink"
              position="absolute"
              right="2"
              bottom="2"
              onClick={openSpoonacularPage}
            >
              View Recipes
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Flex>
    </Card>
  );
}
