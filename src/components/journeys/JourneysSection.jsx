import { useState } from "react";
import { tripsApi } from "../../api/trips";
import { previousTripsApi } from "../../api/previousTrips";
import { useFetch } from "../../hooks/useFetch";
import TripCard from "./TripCard";
import PreviousTourCard from "./PreviousTourCard";
import Spinner from "../common/Spinner";
import "./JourneysSection.css";

const TABS = [
  { id: "next", label: "Next Tour" },
  { id: "previous", label: "Previous Tours" },
  { id: "later", label: "Planned Tours" },
];

export default function JourneysSection() {
  const [activeTab, setActiveTab] = useState("next");

  return (
    <section className="journeys container">
      <div className="journeys__header">
        <h2>Our Journeys</h2>
        <p>
          Discover where A4 Travel &amp; Tours is going next, explore where we've been, and
          get notified about journeys coming soon.
        </p>
      </div>

      <div className="journeys__tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`journeys__tab ${activeTab === tab.id ? "is-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="journeys__panel">
        {activeTab === "next" && <TripsPanel timing="next" mode="next" />}
        {activeTab === "later" && <TripsPanel timing="later" mode="later" />}
        {activeTab === "previous" && <PreviousToursPanel />}
      </div>
    </section>
  );
}

function TripsPanel({ timing, mode }) {
  const { data: trips, loading, error } = useFetch(() => tripsApi.getByTiming(timing), [timing]);

  if (loading) {
    return (
      <div className="journeys__state">
        <Spinner />
      </div>
    );
  }
  if (error) return <div className="journeys__state">{error}</div>;
  if (!trips || trips.length === 0) {
    return (
      <div className="journeys__state">
        {mode === "later"
          ? "No trips are planned yet — check back soon, or tap Notify Me once a journey is announced."
          : "No next trip has been announced yet — check back soon!"}
      </div>
    );
  }

  return (
    <div className="journeys__grid">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} mode={mode} />
      ))}
    </div>
  );
}

function PreviousToursPanel() {
  const { data: trips, loading, error } = useFetch(() => previousTripsApi.getAll(), []);

  if (loading) {
    return (
      <div className="journeys__state">
        <Spinner />
      </div>
    );
  }
  if (error) return <div className="journeys__state">{error}</div>;
  if (!trips || trips.length === 0) {
    return <div className="journeys__state">No previous trips logged yet.</div>;
  }

  return (
    <div className="journeys__previous-list">
      {trips.map((trip) => (
        <PreviousTourCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}