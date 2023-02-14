import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    smallRadius: string;
    bigRadius: string;
    effectShadow: string;
    lightShadow: string;
    colors: {
      base: string;
      primary: string;
      secondary: string;
      action: string;
    };
  }
}
