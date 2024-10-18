import { useEffect } from "react";

const useLoadMore = (emailListRef, incrementPage, page, loading) => {
  useEffect(() => {
    const onScroll = () => {
      if (emailListRef.current) {
        const bottom =
          emailListRef.current.scrollHeight - emailListRef.current.scrollTop <=
          emailListRef.current.clientHeight + 10;
        if (bottom && page < 2 && !loading) {
          incrementPage();
        }
      }
    };

    if (emailListRef.current) {
      emailListRef.current.addEventListener("scroll", onScroll);
    }

    return () => {
      if (emailListRef.current) {
        emailListRef.current.removeEventListener("scroll", onScroll);
      }
    };
  }, [emailListRef, incrementPage, page, loading]);
};

export default useLoadMore;
