import React, { createContext, useContext, useState } from 'react';

const NewContext = createContext();

const Context = ({ children }) => {
  const [update, setUpdate] = useState(null);
  return (
    <NewContext.Provider value={{ update, setUpdate }}>
      {children}
    </NewContext.Provider>
  );
};

export default Context;

export const ContactContext = () => useContext(NewContext);
