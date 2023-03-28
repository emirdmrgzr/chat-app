import LeftBarComponent from "./components/LeftBarComponent";
import ChatComponent from "./components/ChatComponent";
import MessagesComponent from "./components/MessagesComponent";
function App() {
  return (
    <div className="app-container">
      <LeftBarComponent/>
      <MessagesComponent/>
      <ChatComponent/>
    </div>
  );
}

export default App;
