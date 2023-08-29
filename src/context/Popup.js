import { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export function usePopup() {
  return useContext(PopupContext);
}

export function PopupProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([])
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isNewReplyOpen, setIsNewReplyOpen] = useState(false);
  const openNewPost = () => {
    setIsNewPostOpen(true);
  };
  const closeNewPost = () => {
    setIsNewPostOpen(false);
  }
  const openNewReply = () => {
    setIsNewReplyOpen(true);
  };
  const closeNewReply = () => {
    setIsNewReplyOpen(false);
  }

  return (
    <PopupContext.Provider value={{ isNewPostOpen, setIsNewPostOpen, openNewPost, closeNewPost, replies, setReplies, openNewReply, closeNewReply, isNewReplyOpen, posts, setPosts }}>
      {children}
    </PopupContext.Provider>
  );
}
