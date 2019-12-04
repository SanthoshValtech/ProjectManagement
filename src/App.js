import React from "react";
import { Header } from "./HeaderComponent/Header";
import Navigation from "./SideBarComponent/Navigation";

function App() {
  return (
    <div id="App">
      <Header />
      <Navigation />
      {/* <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <div id="page-wrap">
        <h2>Check out Details in the sidebar!</h2>
      </div> */}
    </div>
  );
}

export default App;
