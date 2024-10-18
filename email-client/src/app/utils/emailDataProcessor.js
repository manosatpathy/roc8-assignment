export const processEmailData = (emailDataList) => {
  if (!Array.isArray(emailDataList) || emailDataList.length === 0) return [];

  return emailDataList.map((emailData) => {
    const id = emailData.id;
    const firstLetter = emailData.from.name.charAt(0).toUpperCase();
    const userName = firstLetter + emailData.from.name.slice(1);
    const email = emailData.from.email;
    const subject = emailData.subject;
    const description = emailData.short_description;
    const d = new Date(emailData.date);
    const date = d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { id, userName, email, subject, description, date, firstLetter };
  });
};
