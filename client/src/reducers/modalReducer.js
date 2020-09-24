import { TOGGLE_MODAL } from "../actions/types";

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return !state;
    default:
      return state;
  }
}
