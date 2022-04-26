
import {ADD_RESIDENTS} from "./action";

// initState
const initState = {
    residents: JSON.parse(localStorage.getItem("residents")) || []
}

// reducer function
export const residentsReducer = (store = initState, {type, payload}) => {
    switch (type) {
        case ADD_RESIDENTS:
            localStorage.setItem("residents", JSON.stringify([...payload]));
            return {...store, residents: JSON.parse(localStorage.getItem("residents")) }
            break;
        default:
            return store;
            break;
    }
}



 