import axios from "axios";

const API = "http://localhost:8080/api";

export const fetchAllReviews = async () => {
  const res = await axios.get(`${API}/reviews`);
  return res.data;
};

export const fetchAllUsers = async () => {
  const res = await axios.get(`${API}/users`);
  return res.data;
};

export const deleteReview = async (id: number) => {
  const res = await axios.delete(`${API}/reviews/${id}`);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await axios.delete(`${API}/users/${id}`);
  return res.data;
};
