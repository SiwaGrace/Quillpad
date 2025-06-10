import { Link } from "react-router-dom";
import JournalEntryCard from "../components/JournalEntryCard";
const JournalPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Journal</h2>
        <Link
          to="/journal/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          New Entry
        </Link>
      </div>
      <div className="space-y-4">
        <JournalEntryCard
          id="1"
          title="First Day of Summer"
          date="June 21, 2023"
          excerpt="Today was a wonderful day filled with sunshine and joy..."
        />
        <JournalEntryCard
          id="2"
          title="Reflections on Work"
          date="June 18, 2023"
          excerpt="I've been thinking a lot about my career path recently..."
        />
      </div>
    </div>
  );
};
export default JournalPage;
