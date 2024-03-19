import { UserType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  user: UserType | null;
};

const initialState: StateType = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
