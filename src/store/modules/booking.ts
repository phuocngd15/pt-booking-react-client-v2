import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ServicePrototype } from '@/server/programAPI';
import {getAllPrograms, getAllSessionAvailableOfTrainerByDate, getTrainerByServiceId} from '@/server/programAPI';
import type { ITrainer } from '@/server/InterfaceMappingDataServer';

const initialState: {
  programs: ServicePrototype[] | any;
  trainers: ITrainer | any;
  availableSession: Date[] | any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  programs: undefined,
  trainers: undefined,
  availableSession: undefined,
  status: 'idle',
  error: null,
};

export const fetchPrograms = createAsyncThunk('booking/fetchPrograms', async () => {
  const res = await getAllPrograms();
  // if (res.code === 1) {
  //   //setData(res.data);
  //   return response.data;
  // }

  if (res.code === 1) {
    //setData(res.data);
    return res.data;
  }

  const a: ServicePrototype[] = [];
  return a;
});

export const fetchTrainersByServiceId = createAsyncThunk(
  'booking/fetchTrainers',
  async (uuid: string) => {
    const res = await getTrainerByServiceId(uuid);
    // if (res.code === 1) {
    //   //setData(res.data);
    //   return response.data;
    // }

    if (res.code === 1) {
      //setData(res.data);
      return res.data;
    }
    return undefined;
  },
);
export const fetchAvailableSession = createAsyncThunk(
  'booking/fetchAvailableSession',
  async (params: any) => {
    const res = await getAllSessionAvailableOfTrainerByDate(params.day, params.uuid);
    // if (res.code === 1) {
    //   //setData(res.data);
    //   return response.data;
    // }

    if (res.code === 1) {
      //setData(res.data);
      return res.data;
    }
    return undefined;
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
        (state, action: PayloadAction<ITrainer | any>) => {
          state.status = 'succeeded';
          state.trainers = action.payload;
        },
      )
      .addCase(fetchTrainersByServiceId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(fetchPrograms.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action: PayloadAction<ServicePrototype[]>) => {
        state.status = 'succeeded';
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })

      .addCase(fetchAvailableSession.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAvailableSession.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
          console.log("action.payload",action.payload)
        state.availableSession = action.payload;
      })
      .addCase(fetchAvailableSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { saveStore } = BookingSlice.actions;

export default BookingSlice.reducer;
