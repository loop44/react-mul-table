import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireGameData = ({ gameData, setGameData, children }) => {
  if (!gameData) {
    return <Navigate to="/" />;
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { gameData, setGameData });
    }
    return child;
  });

  return childrenWithProps;
};

export { RequireGameData };
