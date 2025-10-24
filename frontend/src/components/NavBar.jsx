import { NavLink } from 'react-router-dom'
import './Navbar.css';

function Navbar() {
    const pages = [
        {name: 'Home', path: '/'},
        {name: 'Movies', path: '/movies'},
        {name: 'TV Shows', path: '/tvshows'},
        {name: 'People', path: '/people'}
    ];

    return(
        <nav className='navbar'>
            <h1>Movie Database</h1>
            <ul>
                {pages.map((page) => (
                    <li key={page.name}>
                        <NavLink
                            to={page.path}
                            className= {({ isActive }) => 
                            isActive ? 'nav-link active' : 'nav-link'
                        } 
                        >
                            {page.name}    
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;