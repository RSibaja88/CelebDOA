import React from "react";
import Timer from "react-compound-timer";
import styled from "styled-components";

export default function Timers() {
  const Mins = styled.p`
    color: #c99f00;
    font-size: 250%;
    text-align: center;
    line-height: 1;
    padding: 0%;
    font-family: "Bebas Neue", cursive;
  `;

  const Hours = styled.p`
    color: #c99f00;
    font-size: 250%;
    text-align: center;
    line-height: 1;
    padding: 0%;
    font-family: "Bebas Neue", cursive;
  `;
  const Secs = styled.p`
    color: #c99f00;
    font-size: 250%;
    text-align: center;
    line-height: 1;
    padding: 0%;
    font-family: "Bebas Neue", cursive;
  `;

  console.log("timer");

  return (
    <section>
      <div className="tFormat">
        <Timer
          class="timer"
          formatValue={(value) => `${value < 10 ? `0${value}` : value} units `}
        >
          <Hours>
            <Timer.Hours formatValue={(value) => `Timer : ${value}:`} />
          </Hours>
          <Mins>
            <Timer.Minutes formatValue={(value) => `${value}:`} />
          </Mins>
          <Secs>
            <Timer.Seconds formatValue={(value) => `${value}`} />
          </Secs>
        </Timer>
      </div>
    </section>
  );
}
