const { useEffect, useState } = require("react");
import { useEmailBodyStore } from "@/store/useEmailBodyStore";

const useFetchEmailBody = (url, emailId) => {
  const { setLoading, updateEmailBody } = useEmailBodyStore();
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
        const cleanText = result.body.replace(/<\/?[^>]+(>|$)/g, "");
        updateEmailBody(cleanText);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, emailId]);

  return { error };
};

export default useFetchEmailBody;
