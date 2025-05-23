import {useNavigate, useLocation} from 'react-router-dom';

export function useBackButton(defaultPath: string = '/') {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const hasRouterHistory = location.key !== 'default';
    const isFromExternal = document.referrer && !document.referrer.includes(window.location.host);
    const hasBrowserHistory = window.history.length > 1;

    if (isFromExternal || !hasRouterHistory || !hasBrowserHistory) {
      navigate(defaultPath);
    } else {
      navigate(-1);
    }
  };

  return {handleBack};
}
