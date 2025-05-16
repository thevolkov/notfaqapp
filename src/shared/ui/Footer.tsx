import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {

  return (
    <div className="footer bg-blur">
      <div>[ˈɪn.fə]</div>
      <Link to="/">Projects</Link> | <Link to="/user">User Page</Link>
    </div>
  );
}
