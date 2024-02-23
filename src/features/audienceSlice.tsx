import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Person {
  id: number;
  name: string;
  tags: string[];
  status: string;
  created_at: string;
}

const initialState: any = {
  users: [],
  person: { id: 0, name: "" },
  loading: false,
  error: false,
};

export const getAudience = createAsyncThunk(
  "audience/getAudience",
  async () => {
    try {
      const { data } = await axios(
        `https://onox.cloud/backend/simple_audience.php`
      );
      return data;
    } catch (error: any) {
      alert(error.message);
    }
  }
);

const audienceSlice = createSlice({
  name: "audience",
  initialState,
  reducers: {
    deleteUser: (state, { payload }) => {
      state.users = state.users.filter((item: any) => item.id !== payload);
    },
    editUser: (state, { payload }) => {
      console.log(payload);
      state.users = state.users.map((item: any) =>
        item.id === payload.id ? { ...item, name: payload.name } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAudience.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAudience.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = false;
      })
      .addCase(getAudience.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { deleteUser, editUser } = audienceSlice.actions;
export default audienceSlice.reducer;
