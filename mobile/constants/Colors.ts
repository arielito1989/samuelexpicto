/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Paleta de colores base importada de la web para consistencia
const colorPalette = {
  primary: '#007bff',
  secondary: '#6c757d',
  accent: '#ffc107',
  success: '#28a745',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  black: '#000000',
  borderColor: '#dee2e6',
};

export const Colors = {
  light: {
    text: colorPalette.dark,
    background: colorPalette.white,
    tint: colorPalette.primary,
    icon: colorPalette.secondary,
    tabIconDefault: colorPalette.secondary,
    tabIconSelected: colorPalette.primary,
    surface: colorPalette.light, // Color para tarjetas y superficies
    border: colorPalette.borderColor, // Color para bordes
  },
  dark: {
    text: colorPalette.light,
    background: colorPalette.dark,
    tint: colorPalette.white,
    icon: '#9BA1A6', // Mantener un gris claro para iconos en modo oscuro
    tabIconDefault: '#9BA1A6',
    tabIconSelected: colorPalette.white,
    surface: '#495057', // Un gris más oscuro para superficies en modo oscuro
    border: '#495057',
  },
};
