import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => (
  <nav className="level">
    <div className="level-left">
      <p className="level-item has-text-centered">
        <NavLink
          to="/"
          exact
          className="navbar-item"
          activeClassName={css.activeLink}
        >
          Home
        </NavLink>
      </p>
      <p className="level-item has-text-centered">
        <NavLink
          to="/movies"
          className="navbar-item"
          activeClassName={css.activeLink}
        >
          Movies
        </NavLink>
      </p>
    </div>
  </nav>
);

export default Navigation;
