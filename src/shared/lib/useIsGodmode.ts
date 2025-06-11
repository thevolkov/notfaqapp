import {useSelector} from 'react-redux';
import type {RootState} from '../../app/store';

export function useIsGodmode(): boolean {
  const role = useSelector((state: RootState) => state.user.currentUser?.role);
  return role === 'godmode';
}
