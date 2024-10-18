"use client";

import Filter from "../components/Filter";
import EmailBody from "../components/EmailBody";
import EmailList from "../components/EmailList";
import { useState } from "react";

const EmailClient = () => {
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [showEmailBody, setShowEmailBody] = useState(false);

  return (
    <div className="max-w-[1450px] w-full my-8 h-auto mx-auto px-4 md:px-8 lg:px-12">
      <Filter setShowEmailBody={setShowEmailBody} />
      <div className="flex mt-4 h-auto justify-between gap-7">
        <EmailList
          setSelectedEmailId={setSelectedEmailId}
          showEmailBody={showEmailBody}
          setShowEmailBody={setShowEmailBody}
        />
        {showEmailBody && <EmailBody emailId={selectedEmailId} />}
      </div>
    </div>
  );
};

export default EmailClient;
