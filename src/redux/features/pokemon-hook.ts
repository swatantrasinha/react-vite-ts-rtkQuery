import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../store";


type DispatchFunction= () => AppDispatch;

export const usePokemonDispatch: DispatchFunction = useDispatch;
export const usePokemonSelector: TypedUseSelectorHook<RootState>= useSelector;