import { useEffect, useState } from "react";
import axios from "axios";
import defPFP from "../assets/default.jpg";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import Contacts from "../Components/Contacts";
import { styled } from "styled-components";
import Waving from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";

function Chat() {
  const nav = useNavigate();
  const userRoute = `/app/api/auth/user`;
  const allUsersRoute = `/app/api/auth/allUsers`;

  const [contacts, setContacts] = useState([]);
  const [currentchat, setCurrentChat] = useState(undefined);
  const fetchContacts = async () => {
    const cont = await axios.get(allUsersRoute);
    setContacts(cont.data);
  };

  const [user, setUser] = useState(undefined);
  const [Name, setName] = useState(undefined);
  const [pfp, setPfp] = useState("");
  const call = async () => {
    const data = await axios.get(userRoute);
    if (data.data.condition === "false") {
      nav("/login");
    } else {
      setUser(data.data.user.Username);
      setName(data.data.user.Name);
      setPfp(data.data.user.Pfp);
    }
  };
  useEffect(() => {
    call();
    fetchContacts();
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className="chatcontainer">
        <div  className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentchat === undefined ? (
            <Waving name={Name} />
          ) : (
            <ChatContainer currentchat={currentchat} />
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
