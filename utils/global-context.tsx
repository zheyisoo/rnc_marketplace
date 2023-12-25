import React, { createContext } from 'react';

interface GlobalContextProps {
  user: string;
}

const GlobalContext = createContext<GlobalContextProps>({ user: "" });

// export default GlobalContext;
