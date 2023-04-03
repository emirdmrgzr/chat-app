import LeftBarComponent from "../components/LeftBarComponent";
import ChatComponent from "../components/ChatComponent";
import MessagesComponent from "../components/MessagesComponent";

const NormalPage = () => {
  return (
    <div className='normal-page-container'>
      <MessagesComponent/>
      <ChatComponent/>
    </div>
  )
}

export default NormalPage
