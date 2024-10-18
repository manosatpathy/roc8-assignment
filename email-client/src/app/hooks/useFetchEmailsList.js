"use client";

const { useEffect, useState } = require("react");
import { processEmailData } from "@/app/utils/emailDataProcessor";
import { useEmailListStore } from "@/store/useEmailListStore";

const useFetchEmailsList = (url) => {
  const { setLoading, updateEmailList } = useEmailListStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Nerwork response was not ok");
        }
        const result = await response.json();
        const processedEmailData = processEmailData(result.list);
        updateEmailList(processedEmailData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, setLoading]);

  return { error };
};

export default useFetchEmailsList;
