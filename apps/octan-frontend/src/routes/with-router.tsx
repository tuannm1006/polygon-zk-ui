import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { DefaultFcProps } from 'common';

export const withRouter = (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => {
  return (
    <Router>
      <Component {...props} />
    </Router>
  )
}