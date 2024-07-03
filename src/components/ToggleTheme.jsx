import React from "react";
import { ThemeConsumer } from "../context/ThemeContext";
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => {
          return <button className="buttonTheme" onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>;
        }}
      </ThemeConsumer>
    );
  }
   
  export default ToggleTheme;