import React from 'react';
import { Route } from 'react-router-dom'

export const media = asset => {
  return `/${asset}`;
};

export const RenderRoute = route => {  
  return (
    <Route
      // GENERATE UNIQUE KEY
      key={route.path}
      path={`${route.path}`}
      exact={route.exact}
      component={route.component}
    />
  );
};