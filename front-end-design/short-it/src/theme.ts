import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react";

const headingRecipe = defineRecipe({
  base: {
    fontWeight: "bold",
    color: "text.primary",
  },
});

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: "Inter, system-ui, sans-serif" },
        heading: { value: "Inter, system-ui, sans-serif" },
      },
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
      },
      fontWeights: {
        heading: { value: "bold" },
      },
      colors: {
        text: {
          primary: { value: "#0F172A" },
        },
      },
    },
    semanticTokens: {
      fontSizes: {
        heading: {
          xl: { value: "{fontSizes.4xl}" },
          lg: { value: "{fontSizes.3xl}" },
          md: { value: "{fontSizes.2xl}" },
          sm: { value: "{fontSizes.xl}" },
        },
      },
      colors: {
        text: {
          body: { value: "{colors.text.primary}" },
        },
      },
    },
    textStyles: {
      body: {
        fontSize: "md",
        lineHeight: "1.6",
      },
    },
    recipes: {
      heading: headingRecipe,
    },
  },

  globalCss: {
    body: {
      color: "text.primary",
      backgroundColor: "#F8FAFC",
      fontSize: "md",
      lineHeight: "1.6",
    },
  },
});
