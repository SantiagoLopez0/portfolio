import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/components/header.css';

const Header = () =>
(
    <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="" alt="Profile" width="30" height="24"></img>
                    asantiago0034@gmail.com
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-xl-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Work</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Resume</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Let's talk</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        {/* <nav className='navbar navbar-expand-lg navbar-light bg-light header'>
            <div className='header-nametag'>
                <img src='' alt='Profile Picture'></img>
                <p>asantiago0034@gmail.com</p>
            </div>
            <div className='header-options'>
                <a href='#'>About</a>
                <a href='#'>Work</a>
                <a href='#'>Resume</a>
                <a href='#'>Let's talk</a>
            </div>
        </nav> */}
    </>
);

export default Header;
