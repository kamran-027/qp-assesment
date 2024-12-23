import "./App.css";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16">
        <Appbar />
      </div>
      <div className="h-[36.5rem]">
        <ItemList />
      </div>
      <div className="h-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
