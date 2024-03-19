import { UserType } from '@/types/types';
import { SET_USER } from './actionTypes';

export function setUser(user: UserType) {
  return {
    type: SET_USER,
    user
  };
}