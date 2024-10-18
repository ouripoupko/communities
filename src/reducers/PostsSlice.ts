import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async ({ topic, post }: { topic: string; post: string }) => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // return response.json();
    return { topic, post };
  }
);

export const createComment = createAsyncThunk(
  "post/createComment",
  async ({
    topic,
    post,
    comment,
    parent,
  }: {
    topic: string;
    post: string;
    comment: string;
    parent: number | null;
  }) => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // return response.json();
    return { topic, post, comment, parent };
  }
);

export type iComment = {
  index: number;
  text: string;
  parent: number | null;
  kids: number[];
};

const postReducer = createSlice({
  name: "post",
  initialState: {} as { [key: string]: iComment[] },
  reducers: {
    // increment: (state) => { },
    // decrement: (state) => { state.value -= 1; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        // state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        // state.status = "succeeded";
        const { topic, post } = action.payload;
        state[topic + post] = [];
      })
      .addCase(fetchPost.rejected, (state) => {
        // state.status = "failed";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const { topic, post, comment, parent } = action.payload;
        const commentObj: iComment = {
          index: state[topic + post].length,
          text: comment,
          parent: parent,
          kids: [],
        };
        state[topic + post].push(commentObj);
        if (parent !== null) {
          state[topic + post][parent].kids.push(commentObj.index);
        }
      });
  },
});

// export const { increment, decrement } = communitiesReducer.actions;
export default postReducer.reducer;
