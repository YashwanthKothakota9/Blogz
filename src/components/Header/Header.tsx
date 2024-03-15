import Container from '../container/container';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useLocation } from 'react-router-dom';

export default function Header() {
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
        <nav className="flex py-3 px-4">
          <Link to="/">
            <div className="flex gap-4 items-center justify-center">
              <img
                src="/logo-primary.png"
                className="h-14 w-14"
                alt="Logo Placeholder"
              />
              <h1 className="text-apple-900 text-6xl font-bold">Blogz</h1>
            </div>
          </Link>

          <ul className="flex ml-auto items-center justify-center gap-5">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
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
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
