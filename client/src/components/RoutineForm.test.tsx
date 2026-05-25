import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CreateRoutine from "./RoutineForm";

describe('Initial Render', () => {

  it('should render the asset name input', () => {
    render(<CreateRoutine />);
    screen.debug();
    const assetName = screen.getByText(/שם נכס:/i);
    expect(assetName).toBeInTheDocument();
  });

});