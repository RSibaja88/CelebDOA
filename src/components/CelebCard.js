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
    width: 100%;
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
    align-items: space-between;
    justify-content: center;
    margin-top: 3%;
    width: 100%;
    height: 20%;
    margin-bottom: 3%;
    border-radius: 5px;
    ${"" /* border: 3px solid lime; */}
  `;

  const Name = styled.p`
    font-size: 3.75em;
    text-align: center;
    line-height: 0.85;
    margin-top: 1%;
    font-family: "Bebas Neue", cursive;
    font-weight: 500;
    color: white;
    ${"" /* border: 3px solid orange; */}
  `;

  const Born = styled.p`
    font-size: 2.75em;
    text-align: center;
    line-height: 0.8;
    font-family: "Bebas Neue", cursive;
    font-weight: 500;
    color: white;
    ${"" /* border: 3px solid coral; */}
  `;
  const Known = styled.p`
    font-size: 1.5em;
    text-align: center;
    line-height: 1;
    padding-top: 5%;
    padding-bottom: 17%;
    font-family: "Bebas Neue", cursive;
    font-weight: 500;
    color: white;
    ${"" /* border: 3px solid crimson; */}
  `;

  const Score = styled.p`
    font-size: 4em;
    text-align: center;
    line-height: 1;
    padding: 0%;
    font-family: "Bebas Neue", cursive;
    font-weight: 500;
    color: #c99f00;
    margin-right: 6%;
    ${"" /* border: 3px solid black; */}
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
    <section>
      <div className="topRender">
        <Timers />
        <a href="https://doa2.netlify.com/">
          <img className="logo" src={logo}></img>
        </a>
        <Score>Score: {count}</Score>
      </div>
      <Card>
        <div className="gameCard">
          <FormBox>
            <div className="groupOne">
              <Name>{celeb.name}</Name>
              <img src={celeb.image_url} className="celebPic" alt="celebPic" />
            </div>
            <div className="groupTwo">
              <Born>Born: {celeb.birth} - ???</Born>
              <Known>Occupation: {celeb.info}</Known>

              <div className="butt">
                <Button
                  type="button"
                  label="ALIVE"
                  onClick={AliveTest}
                ></Button>
                <Button type="button" label="DEAD" onClick={DeadTest}></Button>
              </div>
            </div>
          </FormBox>
        </div>
      </Card>
    </section>
  );
};
export default CelebCard;
