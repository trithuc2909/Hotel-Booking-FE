import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Custom useDispatch with type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Custom useSelector with type
export const useAppSelector = useSelector.withTypes<RootState>();
