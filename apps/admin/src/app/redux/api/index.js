import axios from "axios";
const API = axios.create({
  baseURL: "https://brilliant-birthday-003dfbf498.strapiapp.com/api",
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
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const signUp = (newUser) => API.post("/auth/local/register", newUser);
export const signIn = (newUser) => API.post("/auth/local", newUser);

// ORDERS
export const fetchOrders = () => API.get("/orderdatas");
// export const fetchTotal = () => API.get("/orderdatas/totalPrice");
export const fetchOrdersById = (userId) => API.get(`/orderdatas/${userId}`);
export const deleteOrders = (id) => API.delete(`/orderdatas/${id}`);

// Message
export const fetchInbox = () => API.get("/inbox");
export const fetchInboxById = (id) => API.get(`/inbox/${id}`);
export const deleteInbox = (id) => API.delete(`/inbox/${id}`);

// PRODUCTS
export const addProducts = (newProducts) => API.post("/goods", newProducts);
export const fetchProducts = () => API.get("/goods?populate=*");
export const fetchProductsById = (id) => API.get(`/goods/${id}?populate=*`);
export const deleteProducts = (id) => API.delete(`/goods/${id}?populate=*`);
export const updateProducts = (id, updatedProduct) =>
  API.put(`/goods/${id}`, { data: updatedProduct });

// CATEGORY
export const fetchCategories = () => API.get("/categories/");
export const fetchCategoryById = (id) => API.get(`/categories/${id}`);

// STATUS
export const fetchStatus = () => API.get("/status/");
export const fetchStatusById = (id) => API.get(`/status/${id}`);

//PROFILE
export const createProfile = (newProfile) => API.post("/profiles", newProfile);
export const fetchProfile = () => API.get("/profiles?populate=*");
export const fetchProfileById = (id) => API.get(`/profiles/${id}?populate=*`);
export const deleteProfile = (id) => API.delete(`/profiles/${id}?populate=*`);
export const updateProfile = (id) => API.put(`/profiles/${id}?populate=*`);
