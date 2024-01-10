import { atom } from 'recoil';

export const houseState = atom({
    key: 'houseState', // 고유한 키
    default: [], // 기본값은 빈 배열
});