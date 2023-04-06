import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash-es';
const initialState = {
  name: 'default',
  // levelAsyncRouter: [],
  email: 'default@gmail.com',
  detailInfo: {},
};
export const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {
    changeStateDetailCus: (state, action: PayloadAction<{}>) => {
      // const { type, tabs } = action.payload;
      console.log('state', state);
      console.log('action.payload', action.payload);
      state.detailInfo = cloneDeep(action.payload);
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { changeStateDetailCus } = customerSlice.actions;

export default customerSlice.reducer;
