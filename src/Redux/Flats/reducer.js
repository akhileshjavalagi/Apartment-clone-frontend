import { ADD_FLATS, SORT_ASC, SORT_DSC, FILTER_IT } from "./action";

// initState
const initState = {
  flats: JSON.parse(localStorage.getItem("flats")) || []
};

// reducer function
export const flatsReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_FLATS:
      localStorage.setItem("flats", JSON.stringify([...payload]));
      return {
        ...store,
        flats: payload
      };

    case SORT_ASC:
      let data1 = store.flats;
      data1 = data1.sort((a, b) => +a.flat_no - +b.flat_no);
      localStorage.setItem("flats", JSON.stringify(data1));
      return { ...store, flats: JSON.parse(localStorage.getItem("flats")) };

    case SORT_DSC:
      let data2 = store.flats;
      data2 = data2.sort((a, b) => +b.flat_no - +a.flat_no);
      localStorage.setItem("flats", JSON.stringify(data2));
      return { ...store, flats: JSON.parse(localStorage.getItem("flats")) };
      
    default:
      return store;
  }
};
