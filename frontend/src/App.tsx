import "./App.css";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-2/6">
        <Appbar />
      </div>
      <div className="h-3/6">
        <ItemList />
      </div>
      <div className="h-1/6">
        <Footer />
      </div>
    </div>
  );
}

export default App;
