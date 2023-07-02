import defPFP from "../assets/default.jpg";
import "./Waving.css";
import { useState } from "react";

function Header({ currentchat }) {
  const pfp = currentchat.Pfp;
  return (
    <div className="header">
      <div className="current-user">
        <div className="avatar">
          {pfp == "" ? (
            <img src={defPFP} />
          ) : (
            <img
              src={`data:image/svg+xml;base64, ${pfp}`}
              onClick={() => {
                console.log(currentchat);
              }}
            />
          )}
          <div className="username">
            <h3> {currentchat.Username} </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
