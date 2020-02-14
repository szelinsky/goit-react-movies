import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './Navigation.module.css'

const Navigation = () => (
	<ul>
		<li>
			<NavLink to="/" exact className={css.link} activeClassName={css.activeLink}>Home</NavLink>
		</li>
		<li>
			<NavLink to="/movies" className={css.link} activeClassName={css.activeLink}>Movies</NavLink>
		</li>
	</ul>
);

export default Navigation;