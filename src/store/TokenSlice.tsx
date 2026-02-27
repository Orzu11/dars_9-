import { createSlice,  } from "@reduxjs/toolkit";

const initialState: string = localStorage.getItem("token") || "";

const TokenSlice = createSlice({
  name: "Token",
  initialState,
  reducers: {
    saveToken: (_state: string, action: PayloadAction<string>) => {
      const token = action.payload;
      localStorage.setItem("token", token);
      return token;
    },
    clearToken: (): string => {
      localStorage.removeItem("token");
      return "";
    },
  },
});

export const { saveToken, clearToken } = TokenSlice.actions;
export default TokenSlice.reducer;