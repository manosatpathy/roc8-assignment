"use client";

import React from "react";
import useFetchEmailBody from "@/app/hooks/useFetchEmailBody";
import { useEmailBodyStore } from "@/store/useEmailBodyStore";
import { useEmailListStore } from "@/store/useEmailListStore";

const EmailBody = ({ emailId }) => {
  const { emailBody, loading } = useEmailBodyStore();
  const { emailList, toggleFavoriteStatus } = useEmailListStore();
  const url = `https://flipkart-email-mock.now.sh/?id=${emailId}`;
  const { error } = useFetchEmailBody(url, emailId);

  const emailData = emailList.find((email) => email.id === emailId.toString());

  if (loading)
    return (
      <div className="border border-[#CFD2DC] flex justify-center items-center rounded-lg w-[65%] h-[80vh] pr-9 pt-8 pb-24 bg-white">
        <div className="w-9 h-9 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="border border-[#CFD2DC] flex rounded-lg w-[65%] h-min pr-9 pt-8 pb-24 bg-white">
      <div className="w-28 flex justify-center">
        <div className="h-14 w-14 border rounded-full flex justify-center items-center text-white bg-[#E54065] text-2xl font-semibold">
          {emailData.firstLetter}
        </div>
      </div>
      <div className="flex flex-col gap-9 h-auto w-[85%]">
        <div className="flex justify-between w-[100%]">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium">{emailData.subject}</h2>
            <p>{emailData.date}</p>
          </div>
          <button
            className={`${
              emailData.isFavorite
                ? "bg-[#E54065] bg-opacity-70"
                : "bg-[#E54065]"
            } text-white rounded-2xl h-min px-4 py-1`}
            onClick={() => {
              toggleFavoriteStatus(emailData.id);
            }}
          >
            Mark as favorite
          </button>
        </div>
        <p className="break-words">{emailBody}</p>
      </div>
    </div>
  );
};

export default EmailBody;
