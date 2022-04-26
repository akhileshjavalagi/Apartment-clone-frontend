
import {adminReducer} from "./Admin/reducers"
import {flatsReducer} from "./Flats/reducer"
import {residentsReducer} from "./Residents/reducer"
import {combineReducers, createStore} from "redux"

const rootReducer = combineReducers({
    admin: adminReducer,
    flats: flatsReducer,
    residents: residentsReducer
});

export const store = createStore(rootReducer);

