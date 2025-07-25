import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, TApplicationState } from '../shared/types/redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TApplicationState> =
  useSelector;
