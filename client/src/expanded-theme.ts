//eslint-disable-next-line
/*import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        [key: number]: string;
    }
    interface Palette {
        tertiary: PaletteColor;
    }
}
*/

import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        [key: number]: string;
    }
    interface Palette {
        tertiary: PaletteColor;
    }
}

// Dummy assignment to prevent TypeScript error and ESLint warnings
const unusedPalette: Palette | undefined = undefined;
const unusedPaletteColor: PaletteColor | undefined = undefined;

export { unusedPalette, unusedPaletteColor };
