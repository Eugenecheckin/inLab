import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { PokeStore, PokeDispatch } from './store';

export const usePokeDispatch = () => useDispatch<PokeDispatch>();
export const usePokeSelector: TypedUseSelectorHook<PokeStore> = useSelector;
