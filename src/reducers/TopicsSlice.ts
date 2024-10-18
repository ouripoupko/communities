import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch discussions
export const fetchTopic = createAsyncThunk(
  "topic/fetchTopic",
  async (topic: string) => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // return response.json();
    return topic;
  }
);

export const createPost = createAsyncThunk(
  "topic/createPost",
  async ({ topic, post }: { topic: string; post: string }) => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // return response.json();
    return { topic, post };
  }
);

const discussionReducer = createSlice({
  name: "topic",
  initialState: {} as {[key: string]: {posts: string[]}},
  reducers: {
    // increment: (state) => { },
    // decrement: (state) => { state.value -= 1; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopic.pending, (state) => {
        // state.status = "loading";
      })
      .addCase(fetchTopic.fulfilled, (state, action) => {
        // state.status = "succeeded";
        state[action.payload] = {posts: []};
      })
      .addCase(fetchTopic.rejected, (state) => {
        // state.status = "failed";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        const { topic, post } = action.payload;
        state[topic].posts.push(post);
      });
  },
});

// export const { increment, decrement } = communitiesReducer.actions;
export default discussionReducer.reducer;
