import './Footer.css';
import {NavLink} from 'react-router-dom';
import {footerLinks} from './constants';

export default function Footer() {

  return (
    <div className="footer w-100 fixed blur-bg p-1">
      <div className="d-flex justify-sa">
        {
          footerLinks.map((link) => (
            <NavLink
              className={({isActive}) =>
                isActive
                  ? 'active'
                  : ''
              }
              to={link.path}
              key={link.path}
            >
              <i className={`bi ${link.icon}`} />
              {link.text}
            </NavLink>
          ))
        }
      </div>
    </div>
  );
}
