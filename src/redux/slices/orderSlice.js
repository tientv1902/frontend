import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: null,
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);
      if (itemOrder) {
        itemOrder.amount += orderItem.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    loadCartForUser: (state, action) => {
      const { user, orderItems } = action.payload;
      state.user = user;
      state.orderItems = orderItems || [];
    },
    clearCartOnLogout: (state) => {
      state.orderItems = [];
      state.user = null;
    },
    updateOrderItemQuantity: (state, action) => {
      const { productId, updatedAmount } = action.payload;
      const item = state.orderItems.find((item) => item.product === productId);
      if (item) {
        item.amount = Math.max(1, item.amount + updatedAmount);
      }
    },
    orderRemove: (state, action) => {
      const { idProduct } = action.payload;
      state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
    },
  },
});

export const { orderProduct, updateOrderItemQuantity, orderRemove, loadCartForUser, clearCartOnLogout } = orderSlice.actions;

export default orderSlice.reducer;
