import axios from "axios";
import { GET_USERS, DELETE_USER } from "./types";

export const getUsers = () => (dispatch) => {
  axios.get("/api/users").then((res) =>
    dispatch({
      type: GET_USERS,
      payload: res.data,
    })
  );
};

export const deleteUser = (id) => (dispatch) => {
  axios.delete(`/api/users/${id}`).then((res) =>
    dispatch({
      type: DELETE_USER,
      payload: id,
    })
  );
};
