import axios from "axios";
import store from "../store";
export const Internal_Endpoints = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
};

export const apiClient = axios.create({
  baseURL: Internal_Endpoints.BASE_URL,
  timeout: 15000,
  headers: { Authorization: `Bearer ${store.getState().token}` },
});

export const getAllPosts = async () => {
  try {
    const record = await apiClient.get("/post/getall-post");
    return record.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (body: any) => {
  try {
    const record = await apiClient.post("/post/delete-post", body);
    return record.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (body: any) => {
  try {
    const record = await apiClient.post("/post/update-post", body);
    return record.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (body: any): Promise<any> => {
  try {
    const record = await apiClient.post("/post/create-post", body);
    return record;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const record = await apiClient.get("/auth/users");
    return record.data;
  } catch (error) {
    console.log(error);
  }
};

export const followAUser = async (body: any) => {
  try {
    const record = await apiClient.post("/auth/follow", body);
    return record.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllfollowers = async () => {
  try {
    const record = await apiClient.get("/auth/followers");
    return record.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllfollowing = async () => {
  try {
    const record = await apiClient.get("/auth/following");
    return record.data;
  } catch (error) {
    console.log(error);
  }
};


export const getProfileStats = async () => {
  try {
    const record = await apiClient.get("/auth/getstats");
    return record.data;
  } catch (error) {
    console.log(error);
  }
};
