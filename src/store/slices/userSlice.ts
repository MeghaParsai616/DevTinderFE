import { createSlice } from "@reduxjs/toolkit";

export interface User {
  firstName?: string;
  lastName?: string;
  emailId?: string;
  photoUrl?: string;
  about?: string;
  age?: string| number;
  gender?: string

}
// 1. Define the state interface
interface UserState {
  user: User | null;
}

// 2. Apply it to the initial state
const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_, action) => {
        console.log("action.payload",action.payload)
      return action.payload;
    },
    removeUser: (state) => {
     state.user = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
