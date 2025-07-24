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
        <div className="modal-header">
          <h3>{modal.title || 'Підтвердіть дію'}</h3>
        </div>
        
        <p>{modal.message || 'Ви впевнені?'}</p>

        <div className="modal-actions">
          <button 
            onClick={() => dispatch(hideModal())} 
            className="btn btn-secondary"
          >
            {modal.cancelText || 'Скасувати'}
          </button>
          <button 
            onClick={handleConfirm} 
            className="btn btn-primary"
            style={{ backgroundColor: 'var(--error)', borderColor: 'var(--error)' }}
          >
            {modal.confirmText || 'Видалити'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversalModal;
