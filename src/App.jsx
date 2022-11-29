import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './hoc/RequireAuth';
import { RequireGameData } from './hoc/RequireGameData';
import { withRouter } from './hoc/withRouter';
import Login from './pages/Login';
import Playground from './pages/Playground';
import Register from './pages/Register';
import Results from './pages/Results';
import Start from './pages/Start';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: null
    };

    this.setGameData = this.setGameData.bind(this);
  }

  setGameData(data) {
    this.setState({
      gameData: data
    });
  }

  render() {
    const { gameData } = this.state;

    return (
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Start setGameData={this.setGameData} />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/game"
          element={
            <RequireAuth>
              <RequireGameData setGameData={this.setGameData} gameData={gameData}>
                <Playground />
              </RequireGameData>
            </RequireAuth>
          }
        />
        <Route
          path="/result"
          element={
            <RequireAuth>
              <RequireGameData gameData={gameData}>
                <Results />
              </RequireGameData>
            </RequireAuth>
          }
        />
      </Routes>
    );
  }
}

export default withRouter(App);
