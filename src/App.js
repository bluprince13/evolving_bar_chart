import React, { Component } from "react";
import BarChart from "./components/BarChart";

import data from "./modules/data_parser";

class App extends Component {
  render() {

    return (
      <div className="App">
        <BarChart
          data={data}
        />
      </div>
    );
  }
}

export default App;
