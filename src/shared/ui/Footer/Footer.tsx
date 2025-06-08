import './Footer.css';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {type RootState, useAppSelector} from '../../../app/store';
import {footerLinks} from './constants';
import Avatar from '../Avatar/Avatar';
import SvgIcon from '../SvgIcon/SvgIcon';

const CDN = import.meta.env.VITE_CDN_BASE_URL;

export default function Footer() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const showVouchers = useAppSelector((state) => state.console.vouchers);

  const renderLink = (to: string, content: React.ReactNode) => (
    <NavLink
      to={to}
      className={({isActive}) =>
        `footer-link d-flex flex-column align-c ${isActive ? 'active' : ''}`
      }
      key={to}
    >
      {content}
    </NavLink>
  );

  return (
    <div className="footer w-100 fixed blur-bg">
      <div className="d-flex justify-sb">
        {
          footerLinks.map((link) =>
            renderLink(
              link.path,
              <>
                {
                  showVouchers ? (
                    <Avatar variant="mini" img={currentUser?.avatar || ''} />
                  ) : (
                    <SvgIcon id="nfa-logo" />
                  )
                }
                <div className="footer-link-text d-flex flex-column">
                  {showVouchers ? currentUser?.name : link.text}
                </div>
              </>
            )
          )
        }
        {
          renderLink(
            '/memes',
            <>
              <Avatar
                variant="mini"
                img={
                  showVouchers
                    ? currentUser?.avatar || ''
                    : `${CDN}/memes/mm-48.jpg`
                }
              />
              <div className="footer-link-text">
                {showVouchers ? currentUser?.name : '[nɒt miːmz]'}
              </div>
            </>
          )
        }
        {
          renderLink(
            '/user',
            <>
              <Avatar variant="mini" img={currentUser?.avatar || ''} />
              <div className="footer-link-text">{currentUser?.name}</div>
            </>
          )
        }
      </div>
    </div>
  )
}
