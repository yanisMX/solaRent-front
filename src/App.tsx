import MapComponent from "./components/MapComponent.tsx";
import Header from "./components/Header.tsx";
import "./App.css"; // Assurez-vous d'importer le fichier CSS

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-start h-screen w-screen">
        <div className="w-3/5 h-3/5">
          <MapComponent />
        </div>
      </div>
    </>
  );
}

export default App;
