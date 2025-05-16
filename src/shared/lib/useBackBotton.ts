import { useNavigate, useLocation } from 'react-router-dom';

export function useBackButton(defaultPath: string = '/') {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Проверяем, есть ли история в React Router
    const hasRouterHistory = location.key !== 'default';
    // Проверяем реферер и текущий хост
    const isFromExternal = document.referrer && !document.referrer.includes(window.location.host);
    // Проверяем длину истории браузера
    const hasBrowserHistory = window.history.length > 1;

    if (isFromExternal || !hasRouterHistory || !hasBrowserHistory) {
      navigate(defaultPath);
    } else {
      navigate(-1);
    }
  };

  return { handleBack };
}
