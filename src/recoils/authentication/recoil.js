import {atom} from 'recoil';
import * as types from './recoilTypes';

 export const textState = atom({
  key: types.TEXT_STATE,
  default: 'moi hom qua',
});
