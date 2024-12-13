import axios from "axios";

const API = axios.create({
  baseURL: "https://brilliant-birthday-003dfbf498.strapiapp.com/api",

  // http://localhost:1337/api/products
});
const token =
  "1d0dc21dc13ad63edd2f1ef1034e6208435ce20ae5b4e29c5fcb8d623b8a272941b1561fb52c8eec35a8cd0ff15e568b938731ecbcc2d05f01fe2612191b4d7e96e2a00425b2f8960e60c2538ccbed75cbcb35bd2cb2137e8ae230ccc8f3cae07d3fc985d20f1e6e6e71f2e9e5bfc32d4964cf75da6d0698bb2906ceb2a91d4f";
API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// USERS
export const fetchUser = () => API.get("/users");
export const fetchUserById = (id) => API.get(`/users/${id}`);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const signUp = (newUser) =>
  API.post("/auth/local/register", newUser, console.log(newUser));
export const signIn = (newUser) => API.post("/auth/local", newUser);

// profile
export const createProfile = (newProfile) => API.post("/profiles", newProfile);
export const fetchProfile = () => API.get("/profiles?populate=*");
export const fetchProfileById = (id) => API.get(`/profiles/${id}?populate=*`);
export const deleteProfile = (id) => API.delete(`/profiles/${id}?populate=*`);
export const updateProfile = (id) => API.put(`/profiles/${id}?populate=*`);

// PRODUCTS
export const createProducts = (newProducts) => API.post("/goods", newProducts);
export const fetchProducts = () => API.get("/goods?populate=*");
export const fetchProductsById = (id) => API.get(`/goods/${id}?populate=*`);
export const deleteProducts = (id) => API.delete(`/goods/${id}?populate=*`);
export const updateProducts = (id, updatedProduct) =>
  API.put(`/goods/${id}`, { data: updatedProduct });

// BLOGS
export const createBlogs = (newBlogs) => API.post("/blogs", newBlogs);
export const fetchBlogs = () => API.get("/blogs?populate=*");
export const fetchBlogsById = (id) => API.get(`/blogs/${id}?populate=*`);
export const deleteBlogs = (id) => API.delete(`/blogs/${id}?populate=*`);
export const updateBlogs = (id) => API.put(`/blogs/${id}?populate=*`);

// CART
export const addCartProducts = (newProducts) => API.post("/carts", newProducts);
export const fetchCartProducts = () => API.get("/carts");
export const fetchCartProductsByUserId = (userId) =>
  API.get(`/carts/${userId}`);
export const deleteCartProducts = (id) => API.delete(`/carts/${id}`);
export const deleteCartProductByUserId = (userId) =>
  API.delete(`/carts/${userId}`);
export const updateCartProducts = (id) => API.put(`/carts/${id}`);

// Orders
export const createOrder = (newOrder) => API.post("/orderdatas", newOrder);

// Category
export const fetchCategories = () => API.get("/categories?populate=*");
export const fetchCategoryById = (id) =>
  API.get(`/categories/${id}?populate=*`);

// Inbox
export const createInbox = (newInbox) => API.post("/inboxes", newInbox);
export const fetchInbox = () => API.get("/inboxes");
