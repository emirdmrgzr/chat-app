import MyRouter from "./components/MyRouter";
import { Toaster } from "react-hot-toast";
import LeftBarComponent from "./components/LeftBarComponent";
function App() {
  return (
    <div className="app-container">
    <LeftBarComponent/>
    <Toaster/>
    <MyRouter/>
    </div>
  );
}

export default App;
