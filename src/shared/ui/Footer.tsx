import {NavLink} from 'react-router-dom';
import './Footer.css';

const footerLinks = [
  {
    path: '/',
    icon: 'bi-journal',
    text: '[n:fə]',
  },
  {
    path: '/user',
    icon: 'bi-person-circle',
    text: '[ˈprəʊfaɪl]',
  },
  {
    path: '/dashboard',
    icon: 'bi-gear',
    text: '[ˈsetɪŋz]',
  },
];

export default function Footer() {
  return (
    <div className="footer bg-blur">
      <div className="content">
        <div className="footer--links">
          {
            footerLinks.map((link) => (
              <NavLink
                to={link.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <i className={`bi ${link.icon}`} />
                {link.text}
              </NavLink>
            ))
          }
        </div>
        {/*<Title subtitle="[n:fə]" />*/}
      </div>
    </div>
  );
}
