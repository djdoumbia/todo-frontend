import { Context, createContext } from 'react';

export interface AppContextProps {
}

export const AppContext: Context<AppContextProps> = createContext<AppContextProps>({
});
