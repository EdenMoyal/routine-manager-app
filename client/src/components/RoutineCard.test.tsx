import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RoutineCard from "./RoutineCard";

describe('Routine Card Test', () => {

  it('should render the comepletedBy input', () => {
    render(<RoutineCard id="" show={true} onHide={() => { }} />);
    screen.debug();
    const completedBy = screen.getByText(/שם מבצע:/i);
    expect(completedBy).toBeInTheDocument();
  });

  it('should not be empty string', () => {
    render(<RoutineCard id="" show={true} onHide={() => { }} />);
    screen.debug();
    const completedByString = screen.getByPlaceholderText(/הזן שם מבצע/i);
    expect(completedByString).not.toBe("");
  });

  it('should have functional button', () => {
    render(<RoutineCard id="" show={true} onHide={() => { }} />);
    const button = screen.getAllByRole('button');
    expect(button[0]).toHaveTextContent('אישור ביצוע וסגירה');
  });

});