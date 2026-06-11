import { useDispatch, useSelector } from "react-redux";
import { type Appselector, type Appdispatch } from "./store";

export const useAppdispatch=useDispatch.withTypes<Appdispatch>()
export const useAppselector=useSelector.withTypes<Appselector>()