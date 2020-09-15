import { theme as chakraTheme } from '@chakra-ui/core';
import { customIcons } from "./Icons/CustomIcons";

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };

const breakpoints = ['40em', '52em', '64em'];

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: '#16161D',
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
      50: "#F5F5F5",
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
  },
  fonts,
  breakpoints,
  icons: {
    ...chakraTheme.icons,
    ...customIcons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
};

export default theme;
