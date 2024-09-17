// import axios from "axios";
// import { createContext, useContext, useReducer } from "react";
// import toast from "react-hot-toast";

// const AuthContext = createContext();

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isPending: true,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "login":
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//         isPending: false,
//       };
//     case "logout":
//       return { ...state, user: null, isAuthenticated: false };
//     default:
//       throw new Error("Unknown action");
//   }
// }

// function AuthProvider({ children }) {
//   const [{ user, isAuthenticated }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );

//   async function login(email, password) {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
//         { email, password }
//       );
//       toast.success("Logged in successfully");
//       localStorage.setItem("jtokenUrl", res.data.token);
//       dispatch({ type: "login", payload: res.data.data.user });
//     } catch (err) {
//       console.log(err);
//       throw new Error(err.response.data.message);
//     }
//   }

//   function logout() {
//     dispatch({ type: "logout" });
//   }

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error("AuthContext was used outside AuthProvider");
//   return context;
// }

// export { AuthProvider, useAuth };
