// ErrorContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ErrorContext = createContext();
export const useErrorContext = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [accountError, setAccountError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkPasswordError, setCheckPasswordError] = useState('');

  const handleInputClick = (errorState) => {
    errorState('');
  };

  const handleError = (error) => {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      if (errorMessage.includes('帳號' || 'account')) {
        setAccountError(errorMessage);
      } else if (errorMessage.includes('暱稱')) {
        setNameError(errorMessage);
      } else if (errorMessage.includes('email')) {
        setEmailError(errorMessage);
      } else if (errorMessage.includes('密碼')) {
        setPasswordError(errorMessage);
      } else if (errorMessage.includes('確認密碼')) {
        setCheckPasswordError(errorMessage);
      }
      console.error('[Edit error:', errorMessage);
    } else {
      console.error('An error occurred:', error);
    }
  };

  const resetErrors = () => {
    setAccountError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setCheckPasswordError('');
  }

  const useResetErrorsEffect = () => {
    useEffect(() => {
      resetErrors();
    }, []);
  }

  return (
    <ErrorContext.Provider
      value={{
        accountError,
        setAccountError,
        nameError,
        setNameError,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        checkPasswordError,
        setCheckPasswordError,
        handleInputClick,
        handleError,
        useResetErrorsEffect
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};


