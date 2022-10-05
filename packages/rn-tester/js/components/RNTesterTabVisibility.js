import * as React from 'react';
import { RNTesterThemeContext } from "./RNTesterTheme";

export const RNTesterTabVisibilityToggleContext: React.Context<(boolean) => void> =
  React.createContext(() => {});

export const useRNTesterTabVisibilityToggleContext = () => React.useContext(RNTesterTabVisibilityToggleContext);
