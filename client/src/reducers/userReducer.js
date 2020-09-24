import { GET_USERS, DELETE_USER } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case DELETE_USER:
      return state.filter((el) => el._id !== action.payload);
    default:
      return state;
  }
}
