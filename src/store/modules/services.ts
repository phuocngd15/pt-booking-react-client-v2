import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash-es';
import type { ServiceItem } from '@/server/serviceAPI';
const defaultValue: ServiceItem = {
  name: 'default service name',
  // levelAsyncRouter: [],
  key: '',

  price: '0',

  staffs: [
    {
      name: 'none',
      staffId: 'none',
    },
  ],

  createDate: new Date(),
  isAvailable: false,
  commonInfo: {
    durationTime: new Date(0, 0, 0, 1, 0), // 1 hour
    preBookTime: new Date(0, 0, 7, 0, 0), // 7 day
    preCancelTime: new Date(0, 0, 1, 0, 0), // 1 day
  },
  description: 'none',
};
const initialState = {
  serviceDetail: defaultValue,
};
export const customerSlice = createSlice({
  name: 'serviceSlice',
  initialState,
  reducers: {
    changeStateDetailServiceItem: (state, action: PayloadAction<ServiceItem>) => {
      // const { type, tabs } = action.payload;
      console.log('state', state);
      console.log('action.payload', action.payload);
      const { name } = cloneDeep(action.payload);
      state.serviceDetail.name = name;
    },
  },
});

export const { changeStateDetailServiceItem } = customerSlice.actions;

export default customerSlice.reducer;
