import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch communities
export const fetchCommunities = createAsyncThunk(
  "communities/fetchCommunities",
  async () => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // return response.json();
    return {};
  }
);

export const createCommunity = createAsyncThunk(
  "communities/createCommunity",
  async (name: string) => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // return response.json();
    return name;
  }
);

const communityListSlice = createSlice({
  name: "communities",
  initialState: {
    communities: {} as {[key:string]: string},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    // increment: (state) => { state.value += 1; },
    // decrement: (state) => { state.value -= 1; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.communities[action.payload] = action.payload;
      });
  },
});

// export const { increment, decrement } = communitiesReducer.actions;
export default communityListSlice.reducer;
