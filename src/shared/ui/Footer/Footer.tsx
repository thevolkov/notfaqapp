import './Footer.css';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {footerLinks} from './constants';
import UserAvatar from '../UserAvatar/UserAvatar';
import {type RootState} from '../../../app/store';
import SvgIcon from '../SvgIcon';

export default function Footer() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div className="footer w-100 fixed blur-bg">
      <div className="d-flex justify-sb">
        {
          footerLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `d-flex flex-column align-c ${isActive ? 'active' : ''}`
              }
              to={link.path}
              key={link.path}
            >
              <SvgIcon id="nfa-logo" />
              <div className="footer-link-text d-flex flex-column">
                {link.text}
              </div>
            </NavLink>
          ))
        }
        <NavLink
          className={({isActive}) =>
            isActive
              ? 'active'
              : ''
          }
          to="/user"
        >
        <div className="d-flex flex-column align-c">
          <UserAvatar variant="mini" img={currentUser?.avatar || ''} />
          <div className="footer-link-text">
            {currentUser?.name}
          </div>
        </div>
        </NavLink>
      </div>
    </div>
  );
}
