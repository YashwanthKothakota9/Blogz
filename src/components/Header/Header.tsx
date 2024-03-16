import Container from '../container/container';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Sign up',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className="py-1 bg-apple-300 rounded-t-lg">
      <Container>
        <nav className="flex flex-col md:flex-row py-3 px-4">
          <div className="flex justify-between items-center w-full">
            <Link to="/" className="flex items-center gap-4">
              <img
                src="/logo-primary.png"
                className="h-14 w-14"
                alt="Logo Placeholder"
              />
              <h1 className="text-apple-900 text-6xl font-bold">Blogz</h1>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-4xl"
            >
              {/* Icon or Text to indicate menu toggle */}
              &#9776;
            </button>
          </div>

          <ul
            className={`flex-col md:flex-row flex md:items-center gap-5 md:ml-auto mt-4 md:mt-0 ${
              isMenuOpen ? 'flex' : 'hidden md:flex'
            }`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="text-center md:text-left">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`text-apple-900 px-2 hover:underline hover:underline-offset-8 transition duration-500 text-xl hover:font-semibold ${
                      pathname === item.slug
                        ? 'underline underline-offset-8 font-semibold'
                        : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="text-center md:text-left">
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
