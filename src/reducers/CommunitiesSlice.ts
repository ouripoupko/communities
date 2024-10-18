import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch communities
export const fetchCommunity = createAsyncThunk(
  "community/fetchCommunity",
  async (community: string) => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // return response.json();
    return community;
  }
);

export const createTopic = createAsyncThunk(
  "community/createTopic",
  async ({ community, title }: { community: string; title: string }) => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // return response.json();
    return { community, title };
  }
);

const communityReducer = createSlice({
  name: "community",
  initialState: {} as { [key: string]: { topics: string[] } },
  reducers: {
    // increment: (state) => { },
    // decrement: (state) => { state.value -= 1; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunity.pending, (state) => {
        // state.status = "loading";
      })
      .addCase(fetchCommunity.fulfilled, (state, action) => {
        const community = action.payload;
        state[community] = { topics: [] };
      })
      .addCase(fetchCommunity.rejected, (state) => {
        // state.status = "failed";
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        const { community, title } = action.payload;
        state[community].topics.push(title);
      });
  },
});

// export const { increment, decrement } = communitiesReducer.actions;
export default communityReducer.reducer;
