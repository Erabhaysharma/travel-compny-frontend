import { useFetch } from "../hooks/useFetch";
import { exploreApi } from "../api/explore";
import Spinner from "../components/common/Spinner";
import Button from "../components/common/Button";
import DestinationCard from "./DestinationCard";
import { useModal } from "../context/ModalContext";
import "./Destinations.css";

export default function Destinations() {
  const { data: destinations, loading, error } = useFetch(() => exploreApi.getAll(), []);
  const { openNotifyMe } = useModal();

  return (
    <section className="destinations-page">
      <div className="container">
        <div className="destinations-page__header">
          <div>
            <h1>Explore Destinations</h1>
            <p>Stories, photos, and highlights from every corner we travel to.</p>
          </div>
          <Button variant="ghost" onClick={() => openNotifyMe(null)}>
            Notify me about new trips
          </Button>
        </div>

        {loading && (
          <div className="destinations-page__state">
            <Spinner size={30} />
          </div>
        )}

        {error && (
          <div className="destinations-page__state">
            <p>Couldn&apos;t load destinations right now. Please try again shortly.</p>
          </div>
        )}

        {!loading && !error && destinations?.length === 0 && (
          <div className="destinations-page__state">
            <p>No destinations have been published yet — check back soon.</p>
          </div>
        )}

        {!loading && !error && destinations?.length > 0 && (
          <div className="destinations-page__grid">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
