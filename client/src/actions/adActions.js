import { ADD_AD, DELETE_AD, EDIT_AD, GET_ADS } from "./types";
import axios from "axios";

export const getAds = () => (dispatch) => {
  axios.get("/api/ads").then((res) =>
    dispatch({
      type: GET_ADS,
      payload: res.data,
    })
  );
};

export const deleteAd = (id) => (dispatch) => {
  axios.delete(`/api/ads/${id}`).then((res) =>
    dispatch({
      type: DELETE_AD,
      payload: id,
    })
  );
};

export const addAd = (newAd) => (dispatch) => {
  axios.post("/api/ads", newAd).then((res) =>
    dispatch({
      type: ADD_AD,
      payload: newAd,
    })
  );
};

export const editAd = (id, newAd) => (dispatch) => {
  axios.put(`/api/ads/${id}`, newAd).then((res) =>
    dispatch({
      type: EDIT_AD,
      payload: newAd,
    })
  );
};
