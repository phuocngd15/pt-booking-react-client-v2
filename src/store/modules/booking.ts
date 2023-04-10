import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ServicePrototype } from '@/server/programAPI';
import { getTrainerByServiceId } from '@/server/programAPI';

const initialState: {
  data: ServicePrototype | any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  data: undefined,
  status: 'idle',
  error: null,
};

export const fetchTrainersByServiceId = createAsyncThunk(
  'booking/fetch',
  async (serviceID: string) => {
    const res = await getTrainerByServiceId(serviceID);
    // if (res.code === 1) {
    //   //setData(res.data);
    //   return response.data;
    // }
    const a: ServicePrototype = { duration: '', serviceName: '' };
    if (res.code === 1) {
      //setData(res.data);
      return res.data;
    }
    return a;
  },
);

export const BookingSlice = createSlice({
  name: 'bookingPageSlice',
  initialState,
  reducers: {
    saveStore: (state, action: PayloadAction<ServicePrototype>) => {
      console.log('action', action.payload);
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainersByServiceId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchTrainersByServiceId.fulfilled,
        (state, action: PayloadAction<ServicePrototype>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        },
      )
      .addCase(fetchTrainersByServiceId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { saveStore } = BookingSlice.actions;

export default BookingSlice.reducer;
