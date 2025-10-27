import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import JournalPage from "./JournalPage";
// import your slice reducer(s)
import journalReducer from "../features/JournalSlice";

test("renders the New Entry button that links to /journal/new", () => {
  // Create a temporary test store
  const store = configureStore({
    reducer: {
      journal: journalReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <JournalPage />
      </MemoryRouter>
    </Provider>
  );

  const newEntryButton = screen.getByText(/New Entry/i);
  expect(newEntryButton).toBeInTheDocument();
  expect(newEntryButton.getAttribute("href")).toBe("/journal/new");
});

// import { render, screen } from "@testing-library/react";
// import Editor from "./Editor";

// test("renders the text editor", () => {
//   render(<Editor />);
//   expect(screen.getByRole("textbox")).toBeInTheDocument();
// });
