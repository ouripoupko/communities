import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IGlokiCollection, IProfile } from "interfaces";
import { readContractsFromServer } from "server/gloki";
import { fetchProfileFromServer } from "server/profile";
import { RootState } from "Store";

// Async action to read contracts
export const readContracts = createAsyncThunk<IGlokiCollection, void>(
  "individual/readContracts",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server } = state.individual;
    const sortedContracts = await readContractsFromServer(server, agent);
    return sortedContracts;
  }
);

// Async action to fetch profile
export const fetchProfile = createAsyncThunk<IProfile, void>(
  "individual/fetchProfile",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { agent, server, contracts } = state.individual;
    if (agent && server && contracts?.profile) {
      return (await fetchProfileFromServer(
        server,
        agent,
        contracts.profile
      )) as IProfile;
    }
    return {} as IProfile;
  }
);

const individualReducer = createSlice({
  name: "individual",
  initialState: {
    agent: "",
    server: "",
    profile: { firstName: "John", lastName: "Doe" } as IProfile,
    contracts: undefined as IGlokiCollection | undefined,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.agent = action.payload.agent;
      state.server = action.payload.server;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(readContracts.fulfilled, (state, action) => {
        state.contracts = action.payload;
      });
  },
});

export const { setCredentials } = individualReducer.actions;
export default individualReducer.reducer;
