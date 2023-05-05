import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Trainer } from '@/server/trainersAPI';
import { getTrainerDetail } from '@/server/trainersAPI';

const initialState: {
  data: Trainer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchTrainersAsync = createAsyncThunk('trainers/fetch', async (groupName: string) => {
  const res = await getTrainerDetail(groupName);
  // if (res.code === 1) {
  //   //setData(res.data);
  //   return response.data;
  // }
  if (res.code === 1) {
    //setData(res.data);
    return res.data;
  }
  return [];
});

export const customerSlice = createSlice({
  name: 'trainersSlice',
  initialState,
  reducers: {
    saveStore: (state, action: PayloadAction<Trainer[]>) => {
      console.log('action', action.payload);
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainersAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTrainersAsync.fulfilled, (state, action: PayloadAction<Trainer[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTrainersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { saveStore } = customerSlice.actions;

export default customerSlice.reducer;
