// NewEntryPage.jsx and EditEntryPage.jsx
const EntryFormPage = ({ isEdit = false }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? "Edit Journal Entry" : "New Journal Entry"}
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Your Thoughts
          </label>
          <textarea
            id="content"
            rows="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isEdit ? "Update Entry" : "Save Entry"}
        </button>
      </form>
    </div>
  );
};

const NewEntryPage = () => <EntryFormPage />;
const EditEntryPage = () => <EntryFormPage isEdit={true} />;

export default NewEntryPage;
export { EditEntryPage };
