import { Link } from "react-router-dom";

const JournalEntryCard = ({ id, title, date, excerpt }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/journal/${id}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{date}</p>
        <p className="text-gray-600">{excerpt}</p>
      </Link>
    </div>
  );
};

export default JournalEntryCard;
