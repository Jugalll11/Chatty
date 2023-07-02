import './Waving.css'
import Messages from './Messages';
import Input from './Input';
import Header from './Header';
import defPFP from "../assets/default.jpg";


function ChatContainer( {currentchat} ) {
    return(
    <div onClick={()=>{
        console.log("First level")
        console.log(currentchat.Email)
    }} className="ChatCont">
        <Header currentchat = {currentchat} />
        <Messages />
        <Input />
    </div>)
}

export default ChatContainer;