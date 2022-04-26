
// action type
export const ADD_FLATS = "ADD_FLATS";
export const SORT_ASC = "SORT_ASC";
export const SORT_DSC = "SORT_DSC";
export const FILTER_IT = "FILTER_IT";

// dispatcher object 
export const addFlats = (value) => ({type: ADD_FLATS, payload: value});
export const sortAsc = (value) => ({type: SORT_ASC, payload: value});
export const sortDsc = (value) => ({type: SORT_DSC, payload: value});
export const filterIt = (value) => ({type: FILTER_IT, payload: value});



