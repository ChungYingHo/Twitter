import "./App.scss";
import Toolbar from "./components/Toolbar";
import PopularBar from "./components/PopularBar";

function App() {
  return (
    <div className="app row">
      <Toolbar/>
      <div className="col">Here is main/profile</div>
      <PopularBar/>
    </div>
  );
}

export default App;
