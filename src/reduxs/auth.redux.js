import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../plugins/axios";

export const fetchLogin = createAsyncThunk("/auth/login", async (payload) => {
  try {
    const response = await http.post("auth/login", payload);

    return response;
  } catch (error) {
    return error.response;
  }
});

export const fetchRegister = createAsyncThunk(
  "/auth/register",
  async (payload) => {
    try {
      const response = await http.post("auth/register", payload);

      return response;
    } catch (error) {
      return error.response;
    }
  }
);

const initialState = {
  auth_loading: false,
  auth_token: "",
  auth_error: "",
  auth_isSuccess: false,
  auth_isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth_RESET_STATE: (state) => {
      return {
        ...state,
        auth_isSuccess: false,
        auth_isError: false,
        auth_error: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        return { ...state, auth_loading: true };
      })
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        console.log(payload);
        if (payload.status === 200) {
          return {
            ...state,
            auth_loading: false,
            auth_isSuccess: true,
            auth_token: payload?.data?.token ?? "",
          };
        } else {
          return {
            ...state,
            auth_loading: false,
            auth_isError: true,
            error: payload.data.message,
          };
        }
      });

    builder
      .addCase(fetchRegister.pending, (state) => {
        return { ...state, auth_loading: true };
      })
      .addCase(fetchRegister.fulfilled, (state, { payload }) => {
        let newState = { ...state };
        if (payload.data.status !== 201) {
          newState = {
            ...newState,
            auth_isError: true,
            error: payload.data.message,
          };
        }

        return {
          ...newState,
          auth_isSuccess: true,
          auth_loading: false,
        };
      });
  },
});

export const { auth_RESET_STATE } = authSlice.actions;

export default authSlice.reducer;
