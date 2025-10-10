import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Modal from "./Modal";

const JournalEntryCard = ({ id, title, date, excerpt, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
        {/* Delete icon */}
        <button
          onClick={openModal}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          aria-label="Delete"
        >
          <FaTrash />
        </button>

        <Link to={`/journal/${id}`}>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-3">{date}</p>
          <p className="text-gray-600">{excerpt}</p>
        </Link>
      </div>

      {/* Modal */}
      {showModal && <Modal setShowModal={setShowModal} onDelete={onDelete} />}
    </>
  );
};

export default JournalEntryCard;
