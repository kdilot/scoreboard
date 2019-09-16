import React from 'react';
import { ScoreBoardContainer } from 'container';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Route exact path='/' component={ScoreBoardContainer} />
      <Route path='/scoreboard' component={ScoreBoardContainer} />
    </>
  );
}

export default App;
