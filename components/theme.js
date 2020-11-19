import { extendTheme } from '@chakra-ui/react';

export const publicPiggybankThemeColorOptions = [
  "red",
  "pink",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "blue",
  "purple",
];

const theme = extendTheme({
  colors: {
    black: '#16161D',
    logoPrimary: '#FFB655',
    mainGray: "#6C6B6F",
    orange: {
      50: "#FFFAF0",
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#FF9E1F", // button default
      600: "#ED8936", // button hovered
      700: "#9C4221",
      800: "#7B341E",
      900: "#652B19",
    },
    gray: {
      20: "#FCFCFC",
      30: "#FAFAFA",
      40: "#F9F9F9",
      50: "#F7F7F7",
      100: "#EBEBEB",
      200: "#E0E0E1",
      300: "#CCCBCD",
      400: "#AEACAF",
      500: "#6C6B6F",
      600: "#656468",
      700: "#5B5A5E",
      800: "#515053",
      900: "#3D3C3E",
    },
    darkGray: {
      50: "#6C6B6F",
      100: "#CCCBCD",
      200: "#5B5A5E",
      300: "#515053",
      400: "#3D3C3E",
      500: "#333234",
      600: "#29282A",
      700: "#1F1E1F",
      800: "#151415",
      900: "#0A0A0A",
    },
    yellow: {
      10: "#fffff0",
      200: "#fefcbf",
      300: "#faf089",
      400: "#f6e05e",
      500: "#ecc94b",
      600: "#d69e2e",
      700: "#b7791f",
      800: "#975a16",
      900: "#744210",
    },
  },
  fonts: {
    mono: `'Menlo', monospace`,
  },
});

export default theme;
