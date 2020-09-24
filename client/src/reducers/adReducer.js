import {
  ADD_AD,
  DELETE_AD,
  EDIT_AD,
  GET_USERS,
  GET_ADS,
  DELETE_USER,
} from "../actions/types";
const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADS:
      return action.payload;
    case DELETE_AD:
      return state.filter((el) => el._id !== action.payload);
    case ADD_AD:
      return [...state, action.payload];
    case EDIT_AD:
      return [
        ...state,
        state.map((el) =>
          el.id === action.payload.id ? { ...action.payload } : el
        ),
      ];
    default:
      return state;
  }
}
