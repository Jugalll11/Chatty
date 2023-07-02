import Loader from "../assets/loader2.gif";
import "./Form.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

function SetAvatar() {
  const avatarRoute = "/app/api/auth/setAvatar";
  const userRoute = "/app/api/auth/user";
  const api = "https://api.multiavatar.com";
  const nav = useNavigate();
  const [Avatars, setAvatars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastmsg = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please Select an Avatar", toastmsg);
    } else {
      const res = await axios.get(userRoute);
      if (res.data.condition === "true") {
        const data = await axios
          .post(avatarRoute, {
            String: Avatars[selectedAvatar],
          })
          .then(() => {
            nav("/chat");
          });
      } else {
        toast.error("Please Login First", toastmsg);
      }
    }
  }


  const func = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const img = await axios.get(
        `${api}/${Math.round(Math.random() * 100000)}`
      );
      const buffer = new Buffer(img.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setLoading(false);
  };

  useEffect(() => {
    func();
  }, []);


  return (
    <>
      {isLoading ? (
        <div className="AvContainer">
          <img className="loader" src={Loader} alt="Loader" />
        </div>
      ) : (
        <div className="AvContainer">
          <div className="title-container">
            <h1>Pick an Avatar as your Profile as your Pfp</h1>
          </div>
          <div className="avatars">
            {Avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64, ${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture}>Set as PFP</button>
        </div>
      )}
      <ToastContainer />
    </>
  );

}

export default SetAvatar;
