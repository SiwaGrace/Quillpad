import { useRef } from "react";

const Modal = ({ setShowModal, onDelete }) => {
  const modalRef = useRef(null); // Reference to modal content

  const confirmDelete = () => {
    onDelete(id);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      cancelDelete();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-90"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure you want to delete this entry?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
