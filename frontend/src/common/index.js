// export const backendDomin = "http://localhost:8080";
export const backendDomin = import.meta.env.VITE_BACKEND_URL;

// Auth Header
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const SummaryApi = {

  signUP: {
    url: `/api/auth/signup`,
    method: "post",
  },

  login: {
    url: `/api/auth/login`,
    method: "post",
  },

  getMe: {
    url: `/api/auth/me`,
    method: "get",
  },


  createUser: {
    url: `/api/auth/create-user`,
    method: "post",
  },

  deleteUser: (userId) => ({
    url: `/api/admin/users/${userId}`,
    method: "delete",
  }),


  createBoard: {
    url: `/api/boards`,
    method: "post",
  },

  getBoard: (boardId) => ({
    url: `/api/boards/${boardId}`,
    method: "get",
  }),

  getBoards: {
    url: `/api/boards`,
    method: "get",
  },

  deleteBoard: (boardId) => ({
    url: `/api/boards/${boardId}`,
    method: "delete",
  }),


  addMember: (boardId) => ({
    url: `/api/boards/${boardId}/add-member`,
    method: "post",
  }),

  removeMember: (boardId) => ({
    url: `/api/boards/${boardId}/remove-member`,
    method: "post",
  }),


  createList: (boardId) => ({
    url: `/api/boards/${boardId}/lists`,
    method: "post",
  }),


  createCard: (boardId, listId) => ({
    url: `/api/boards/${boardId}/lists/${listId}/cards`,
    method: "post",
  }),

  updateCard: (boardId, cardId) => ({
    url: `/api/boards/${boardId}/cards/${cardId}`,
    method: "put",
  }),


  boardActivities: (boardId) => ({
    url: `/api/boards/${boardId}/activities`,
    method: "get",
  }),


  getAllUsers: {
    url: `/api/admin/users`,
    method: "get",
  },

  updateUserRole: (userId) => ({
    url: `/api/admin/users/${userId}/role`,
    method: "put",
  }),


  getAllBoardsAdmin: {
    url: `/api/admin/boards`,
    method: "get",
  },
};

export default SummaryApi;
