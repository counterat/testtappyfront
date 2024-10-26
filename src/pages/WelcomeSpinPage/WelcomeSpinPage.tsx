import React from 'react'

import c from './WelcomeSpinPage.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function WelcomeSpinPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleRedirect = () => {
    // Заменяем часть пути "welcome-spin" на "fortune"
    const newPath = location.pathname.replace('/welcome-spin', '/fortune');
    navigate(newPath);
  };
  return (
    <div className={c.container}>
      <div className={c.imageWrapper}>
        <img src="/assets/win.png" alt="win" />
      </div>
      <button onClick={handleRedirect} className={c.button}>
        <span className={c.buttonText}>SPIN NOW</span>
      </button>
    </div>
  )
}

export default WelcomeSpinPage