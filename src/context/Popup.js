import { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export function usePopup() {
  return useContext(PopupContext);
}

export function PopupProvider({ children }) {
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const openNewPost = () => {
    setIsNewPostOpen(true);
  };

  const closeNewPost = () => {
    setIsNewPostOpen(false);
  }

  return (
    <PopupContext.Provider value={{ isNewPostOpen, setIsNewPostOpen, openNewPost, closeNewPost }}>
      {children}
    </PopupContext.Provider>
  );
}
