// src/tests/InfoSelectCity.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, beforeEach } from "vitest";
import Info from "@/components/Info/Info";
import useMap from "@/store/store";

const setCurrent = vi.fn();
const setStation = vi.fn();
const setCoords = vi.fn();

vi.mock("@/store/store", () => ({
  default: vi.fn((selector: any) =>
    selector({
      current: "all",
      setCurrent,
      setStation,
      setCoords,
    })
  ),
}));

// Mock data
const stations = [
  {
    id: 24,
    name: "Leipzig-Connewitz",
    city: "Leipzig",
    lat: 51.3154,
    lng: 12.3735,
  },
  { id: 25, name: "Dresden Hbf", city: "Dresden", lat: 51.0404, lng: 13.7326 },
  {
    id: 26,
    name: "Dresden Neustadt",
    city: "Dresden",
    lat: 51.0669,
    lng: 13.7404,
  },
  {
    id: 27,
    name: "Dresden Mitte",
    city: "Dresden",
    lat: 51.0555,
    lng: 13.7113,
  },
  {
    id: 28,
    name: "Nuremberg Hbf",
    city: "Nuremberg",
    lat: 49.4458,
    lng: 11.0822,
  },
];

describe("Info component (City + Station selects)", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(stations),
      } as Response)
    ) as any;
  });

  it("updates stations when a city is selected and sets city/station in Zustand", async () => {
    render(<Info />);

    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: "City" })
      ).toBeInTheDocument();
    });

    const cityDropdown = screen.getByRole("combobox", { name: "City" });
    await userEvent.click(cityDropdown);
    await userEvent.click(screen.getByText("Dresden"));

    await waitFor(() => {
      expect(setCurrent).toHaveBeenCalledWith("Dresden");
    });

    const stationDropdown = screen.getByRole("combobox", { name: "Station" });
    await userEvent.click(stationDropdown);

    expect(screen.getByText("Dresden Hbf")).toBeInTheDocument();
    expect(screen.getByText("Dresden Neustadt")).toBeInTheDocument();
    expect(screen.getByText("Dresden Mitte")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Dresden Mitte"));
    await waitFor(() => {
      expect(setStation).toHaveBeenCalledWith("Dresden Mitte");
    });

    await waitFor(() => {
      expect(setCoords).toHaveBeenCalled();
    });
  });
});
