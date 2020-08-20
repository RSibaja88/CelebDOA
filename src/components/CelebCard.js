/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "./Button";
import Timers from "./Timer";
import logo from "../Graphics/Logo.png";
import "../index.css";

const CelebCard = (props) => {
  const Card = styled.section`
    display: flex;
    flex-direction: row;
    width: 900px;
    justify-content: center;
    padding: 0;
    border-radius: 5px;
    margin: 0%;
    align-items: center;
    ${"" /* border: 3px solid white; */}
  `;
  const FormBox = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 3%;
    width: 100%;
    height: 590px;
    margin-bottom: 3%;
    border-radius: 5px;
    ${"" /* border: 3px solid lime; */}
  `;

  const [celeb, setCeleb] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getNewCeleb();
  }, []);

  function getNewCeleb() {
    axios
      .get("https://celeb-death-game.herokuapp.com/api/free")
      .then((res) => {
        console.log("API response: ", res.data);
        setCeleb(res.data);
      })
      .catch((err) => {
        console.error("ERROR", err);
      });
    Timers();
  }

  function handleScore() {
    setCount(count + 1);
  }

  const AliveTest = () => {
    if (celeb.dead === false) {
      console.log(celeb.name, "is alive!");
      alert(`Yes, ${celeb.name} is still alive!`);
      handleScore();
      console.log(`the score: ${count}`);
    } else {
      console.log(celeb.name, "died in", celeb.death);
      alert(`No... ${celeb.name} died in ${celeb.death}`);
    }
    getNewCeleb();
  };
  const DeadTest = () => {
    if (celeb.dead === true) {
      console.log(celeb.name, "is dead!");
      alert(`Yes, sadly ${celeb.name} died in ${celeb.death}.`);
      handleScore();
    } else {
      console.log(celeb.name, "is alive!");
      alert(`No Sorry! ${celeb.name} is still alive and kicking!`);
    }
    getNewCeleb();
  };

  return (
    <section className="topSec">
      <div className="topRender">
        <Timers />
        <a href="https://doa2.netlify.com/">
          <img className="logo" src={logo}></img>
        </a>
        <div className="score">Score: {count}</div>
      </div>
      <Card>
        <div className="gameCard">
          <div className="formBox">
            <div className="frame">
              <div className="groupOne">
                <div className="name">{celeb.name}</div>
                <img
                  src={celeb.image_url}
                  className="celebPic"
                  alt="celebPic"
                />
              </div>
            </div>
            <div className="frame">
              <div className="groupTwo">
                <div className="born">Born: {celeb.birth} - ???</div>
                <div className="known">Occupation: {celeb.info}</div>

                <div className="butt">
                  <Button
                    type="button"
                    label="ALIVE"
                    onClick={AliveTest}
                  ></Button>
                </div>
                <div className="butt">
                  <Button
                    type="button"
                    label="DEAD"
                    onClick={DeadTest}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
export default CelebCard;
