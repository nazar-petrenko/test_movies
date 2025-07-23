import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  title: '',
  message: '',
  confirmText: 'Так',
  cancelText: 'Ні',
  targetId: null, 
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { title, message, confirmText, cancelText, targetId } = action.payload;
      state.visible = true;
      state.title = title || 'Підтвердження';
      state.message = message || '';
      state.confirmText = confirmText || 'Так';
      state.cancelText = cancelText || 'Ні';
      state.targetId = targetId || null;
    },
    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
