"use client";

import useFetchEmailsList from "@/app/hooks/useFetchEmailsList";
import { useEmailListStore } from "@/store/useEmailListStore";
import { shortenDescription } from "@/app/utils/shortenDescription";
import { useRef } from "react";
import useLoadMore from "@/app/hooks/useLoadMore";

const EmailList = ({ setSelectedEmailId, showEmailBody, setShowEmailBody }) => {
  const {
    loading,
    emailList,
    page,
    incrementPage,
    toggleReadStatus,
    currentFilter,
  } = useEmailListStore();
  const url = `https://flipkart-email-mock.now.sh/?page=${page}`;
  useFetchEmailsList(url);

  const emailListRef = useRef(null);
  useLoadMore(emailListRef, incrementPage, page, loading);

  const filteredEmails = emailList.filter((email) => {
    if (currentFilter === "read") return email.isRead;
    if (currentFilter === "unread") return !email.isRead;
    if (currentFilter === "favorites") return email.isFavorite;
    if (currentFilter === "all") return true;
  });

  return (
    <div
      ref={emailListRef}
      className={`${
        showEmailBody ? "w-min" : "w-full"
      } h-[90vh] flex flex-col gap-5 custom-scrollbar pr-3 overflow-y-scroll`}
    >
      {filteredEmails.map((data) => (
        <div
          key={data.id}
          className={`h-min border border-[#CFD2DC] flex py-3 rounded-lg w-full cursor-pointer ${
            data.isRead ? "bg-[#f2f2f2]" : "bg-white"
          }`}
          onClick={() => {
            setSelectedEmailId(data.id);
            setShowEmailBody(true);
            toggleReadStatus(data.id);
          }}
        >
          <div className="w-28 flex justify-center flex-shrink-0">
            <div className="h-14 w-14 border rounded-full flex justify-center items-center text-white bg-[#E54065] text-2xl font-semibold">
              {data.firstLetter}
            </div>
          </div>
          <div className="w-full mr-20">
            <div className="flex gap-1">
              <p>From: </p>
              <h3 className="font-semibold">{data.userName}</h3>
              <h3 className="font-semibold">{"<" + data.email + ">"}</h3>
            </div>
            <h3>
              Subject: <span className="font-semibold">{data.subject}</span>
            </h3>
            <p className="my-2 w-max">
              {!showEmailBody
                ? data.description
                : shortenDescription(data.description)}
            </p>
            <div className="flex gap-8">
              <span>{data.date}</span>
              <span className="text-[#E54065] font-semibold">
                {data.isFavorite && "Favorite"}
              </span>
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-center">
          <div className="w-9 h-9 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default EmailList;
