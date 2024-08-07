import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Meal <span>Management</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            distinctio nostrum nihil molestias eos libero enim ullam excepturi,
            eligendi omnis. Nobis adipisci distinctio modi itaque quidem
            voluptate amet facere esse!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="food hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing
