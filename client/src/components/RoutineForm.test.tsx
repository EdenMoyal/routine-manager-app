import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CreateRoutine from "./RoutineForm";

describe('Initial Render', () => {

  it('should render the asset name', () => {
    render(<CreateRoutine />);
    screen.debug();
    const assetName = screen.getByText(/שם נכס:/i);
    expect(assetName).toBeInTheDocument();
  });

  it('should render the scheduled date', () => {
    render(<CreateRoutine />);
    screen.debug();
    const scheduledDate = screen.getByText(/תאריך מתוכנן:/i);
    expect(scheduledDate).toBeInTheDocument();
  });

});

describe('Form Unit Testing', () => {

  it('should not be empty string', () => {
    render(<CreateRoutine />);
    screen.debug();
    const assetNameString = screen.getByPlaceholderText(/הזן שם נכס/i);
    expect(assetNameString).not.toBe("");
  });

  it('should not be empty string', () => {
    render(<CreateRoutine />);
    screen.debug();
    const scheduledDateString = screen.getByPlaceholderText(/בחר תאריך/i);
    expect(scheduledDateString).not.toBe("");
  });

  it('should have functional button', () => {
    render(<CreateRoutine />);
    const button = screen.getAllByRole('button');
    expect(button[1]).toHaveTextContent('צור טיפול');
  });

});