import React from 'react';
import { Link } from 'react-router-dom';
import { loginPath } from 'src/router/rootConstants';

export const WelcomeToHondaTracker = () => {
  console.log('welcome');
  return (
    <div>
      <h1>Welcome to Honda tracker</h1>
    </div>
    // <div className={'mainContainer'}>
    //   {/*<Link to={loginPath}>Log in</Link>*/}
    //   <h1>Welcome to Honda tracker</h1>
    // </div>
  );
};
