import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash-es';
const initialState = {
  name: 'default',
  // levelAsyncRouter: [],
  email: 'default@gmail.com',
  detailInfo: {},
  whoIsUsing: {},
};

// ban dau nay de Supper dung
export const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {
    changeStateDetailCus: (state, action: PayloadAction<{}>) => {
      console.log('changeStateDetailCus', action.payload);
      state.detailInfo = cloneDeep(action.payload);
    },
    updateWhoIsUsing: (state, action) => {
      state.whoIsUsing = cloneDeep(action.payload);
    },
  },
});

export const { changeStateDetailCus, updateWhoIsUsing } = customerSlice.actions;

export default customerSlice.reducer;
