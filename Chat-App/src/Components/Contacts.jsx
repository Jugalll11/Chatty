import React from "react";
import { useState, useEffect } from "react";
import defPFP from "../assets/default.jpg";
import axios from "axios";
import styled from "styled-components";

function Contacts({ contacts, changeChat }) {
  const userRoute = `/app/api/auth/user`;
  const [username, setUsername] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [pfp, setPfp] = useState("");
  const call = async () => {
    const data = await axios.get(userRoute);
    if (data.data.condition === "false") {
      nav("/login");
    } else {
      setUsername(data.data.user.Username);
      setPfp(data.data.user.Pfp);
      setUser(data.data.user);
    }
  };
  useEffect(() => {
    call();
  }, []);

  const [currentSelectedChat, setSelectedChat] = useState(undefined);

  const changeSelectedChat = (index, contact) => {
    setSelectedChat(index);
    changeChat(contact)
  };
  return (
    <Container>
      <div className="contacts" onClick={
        () =>console.log(contacts[0])
      }>
        {contacts.map((contact, index) => {
          return (
            <div
              className={`contact ${
                index === currentSelectedChat ? "selectedChat" : ""
              }`}
              key={index}
              onClick={()=>{changeSelectedChat(index,contact)}}
            >
              <div className="avatar">
                {contact.Pfp == "" ? (
                  <img src={defPFP} />
                ) : (
                  <img src={`data:image/svg+xml;base64, ${contact.Pfp}`} />
                )}
              </div>
              <div className="username">
                <h3> {contact.Username} </h3>
              </div>
            </div>
          );
        })}
        
      </div>
      <div className="current-user">
        <div className="avatar">
          {pfp == "" ? (
            <img
              src={defPFP}
              onClick={() => {
                nav("/avatar");
              }}
            />
          ) : (
            <img
              src={`data:image/svg+xml;base64, ${pfp}`}
              onClick={() => {
                nav("/avatar");
              }}
            />
          )}
        </div>
        <div className="username">
          <h3> {username} </h3>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 87% 13%;
  overflow: hidden;
  background-color: #080420;
  

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    justify-content: flex-start;
    overflow: auto;
    gap: 1rem;
    ::-webkit-scrollbar {
      width: 2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      width: 80vw;
      background-color: #ffffff30;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selectedChat {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: aqua;
    border-radius: 1%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
