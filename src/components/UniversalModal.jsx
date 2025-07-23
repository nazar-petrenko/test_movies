import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../features/modal/modalSlice';
import { deleteMovie } from '../features/movies/moviesSlice';

const UniversalModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  if (!modal.visible) return null;

  const handleConfirm = () => {
    if (modal.targetId) {
      dispatch(deleteMovie(modal.targetId));
    }
    dispatch(hideModal());
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{modal.title}</h3>
        <p>{modal.message}</p>
        <div className="modal-buttons">
          <button onClick={handleConfirm}>{modal.confirmText}</button>
          <button onClick={() => dispatch(hideModal())}>{modal.cancelText}</button>
        </div>
      </div>
    </div>
  );
};

export default UniversalModal;
