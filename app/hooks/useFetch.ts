import { useState, useEffect, useCallback } from "react";

type FetchState<T> = {
  data: T | null;
  isPending: boolean;
  error: string | null;
};

export const useFetch = <T,>(url: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isPending: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState({ ...state, isPending: true });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setState({ data: json, isPending: false, error: null });
    } catch (error) {
      setState({ data: null, isPending: false, error: "Could not fetch data" });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { ...state, refetch };
};
