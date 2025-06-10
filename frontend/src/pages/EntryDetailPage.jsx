import { Link } from "react-router-dom";

const EntryDetailPage = () => {
  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Book Cover Effect */}
      <div className="max-w-3xl mx-auto bg-indigo-100 shadow-2xl rounded-lg overflow-hidden border-2 border-indigo-300">
        {/* Book Spine Effect */}
        <div className="absolute left-0 h-full w-2 bg-indigo-800 rounded-l-lg"></div>

        {/* Book Pages */}
        <div className="p-8 sm:p-12 md:p-16 relative">
          {/* Page Curl Effect */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-l from-indigo-200 to-transparent"></div>

          {/* Header with Book-like title */}
          <div className="flex justify-between items-start mb-8 border-b-2 border-indigo-200 pb-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-1">
                First Day of Summer
              </h2>
              <p className="text-sm font-serif text-indigo-700 italic">
                June 21, 2023
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/journal/1/edit"
                className="text-indigo-700 hover:text-indigo-900 font-serif"
              >
                Edit
              </Link>
              <button className="text-indigo-700 hover:text-indigo-900 font-serif">
                Delete
              </button>
            </div>
          </div>

          {/* Book Content */}
          <div className="font-serif text-indigo-900 text-lg leading-relaxed space-y-4">
            <p className="first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
              Today was a wonderful day filled with sunshine and joy. The
              morning light filtered through my curtains, painting golden
              patterns on the wooden floor. I stretched lazily, feeling the
              warmth of summer finally arrive after such a long winter.
            </p>
            <p>
              I decided to take my coffee outside, where the birds were singing
              their morning songs. The air smelled of freshly cut grass and
              blooming flowers. My neighbor's cat, Mr. Whiskers, came to visit
              as he often does, purring loudly as he rubbed against my legs.
            </p>
            <p>
              In the afternoon, I packed a simple picnic - some bread, cheese,
              and fruit - and walked to the park. Children were laughing by the
              fountain, couples strolled hand in hand, and old men played chess
              under the shade of ancient oak trees. I found a quiet spot by the
              pond and watched the ducks glide across the water.
            </p>
            <p>
              As the sun began to set, painting the sky in hues of orange and
              pink, I felt a deep sense of gratitude. Days like this remind me
              why I keep this journal - to capture these fleeting moments of
              perfect happiness.
            </p>
          </div>

          {/* Page Number */}
          <div className="mt-12 text-center text-indigo-700 text-sm">
            • 23 •
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="max-w-3xl mx-auto flex justify-between mt-8">
        <button className="font-serif text-indigo-700 hover:text-indigo-900 flex items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous Entry
        </button>
        <button className="font-serif text-indigo-700 hover:text-indigo-900 flex items-center">
          Next Entry
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EntryDetailPage;
