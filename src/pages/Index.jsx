import React, { useState, useEffect, useToast } from "react";
import { Box, FormControl, FormLabel, Input, Button, Text, Image } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const toast = useToast();
const [hexCode, setHexCode] = useState("#1a365d");
const [colorName, setColorName] = useState("Deep Blue");
const [colorSwatch, setColorSwatch] = useState("<svg width='100' height='100'><rect width='100' height='100' style='fill:#1a365d;'/></svg>");
useEffect(() => {
    fetchColorName(hexCode.replace("#", ""));
  }, []);

const fetchColorName = async (hex) => {
  try {
    const response = await fetch(`https://api.color.pizza/v1/${hex}`);
    if (!response.ok) {
      throw new Error("Color not found");
    }
    const data = await response.json();
    if (data.colors && data.colors.length > 0) {
      setColorName(data.colors[0].name);
      setColorSwatch(data.colors[0].swatchImg.svg);
    } else {
      setColorName("Color name not found");
      setColorSwatch(null);
    }
  } catch (error) {
    toast({
      title: "Error",
      description: error.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  fetchColorName(hexCode.replace("#", ""));
};

const Index = () => {
  return (
    <Box p={4}>
      <FormControl id="hex-color" as="form" onSubmit={handleSubmit}>
        <FormLabel>Enter HEX Color Code</FormLabel>
        <Input type="text" placeholder="e.g., #1a2b3c" value={hexCode} onChange={(e) => setHexCode(e.target.value)} />
        <Button leftIcon={<FaSearch />} mt={2} colorScheme="blue" type="submit">
          Translate Color
        </Button>
      </FormControl>
      {colorName && (
        <Box mt={4}>
          <Text fontSize="xl" fontWeight="bold">
            Color Name: {colorName}
          </Text>
          {colorSwatch && <Box mt={2} dangerouslySetInnerHTML={{ __html: colorSwatch }} />}
        </Box>
      )}
    </Box>
  );
};

export default Index;
