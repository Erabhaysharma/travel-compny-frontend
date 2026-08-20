import { useEffect, useState, useCallback } from "react";

/**
 * Runs an async fetcher on mount (and whenever `deps` change), tracking
 * loading/error/data so pages don't each reinvent this boilerplate.
 *
 * const { data, loading, error, refetch } = useFetch(() => tripsApi.getAllTrips());
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
