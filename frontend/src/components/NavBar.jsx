import './Navbar.css';

function Navbar({ currentPage, setCurrentPage}) {
    const pages = ['Home', 'Movies', 'TV Shows', 'People'];
    return (
        <nav className="navbar">
            <h1>Movie Database</h1>
            <ul>
                {pages.map((page) => (
                <li
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                        fontWeight: currentPage === page ? 'bold' : 'normal',
                        color: currentPage === page ? '#646cff' : 'white',
                        cursor: 'pointer',
                    }}
                >
                    {page}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;