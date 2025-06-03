import './ThemeToggle.css';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState, toggleTheme} from '../../app/store';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <label className="theme-toggle d-flex align-c pointer">
      <input
        type="checkbox"
        checked={theme === 'light'}
        onChange={() => dispatch(toggleTheme())}
      />
      <span className="slider relative b-radius"></span>
      <div className="label">{theme === 'dark' ? 'Dark' : 'Light'}</div>
    </label>
  );
}
