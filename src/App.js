import React, { Component } from "react";
import FetchProducts from "./components/FetchProducts";

class App extends Component {
  state = {
    visible: true
  };

  render() {
    return (
      <div className="App" style={{padding : "40px"}}>
        <FetchProducts />
      </div>
    );
  }
}

export default App;
