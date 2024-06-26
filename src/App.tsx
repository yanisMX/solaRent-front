import MapComponent from "./components/MapComponent.tsx";
import Header from "./components/Header.tsx";
import "./App.css";
import FilterComponent from "./components/FilterComponent.tsx";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-row items-start justify-start h-screen w-screen">
        <div className="w-3/4 h-full">
          <MapComponent />
        </div>
        <div className="w-1/5 h-full">
          <FilterComponent />
        </div>
      </div>
    </>
  );
}

export default App;
