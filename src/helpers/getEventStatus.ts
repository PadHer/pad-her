export type EventStatus = "upcoming" | "ongoing" | "completed";

export const getEventStatus = (
  eventDate: Date | string
): EventStatus => {
  const now = new Date();
  const date = new Date(eventDate);

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const eventDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (eventDay > today) {
    return "upcoming";
  }

  if (eventDay.getTime() === today.getTime()) {
    return "ongoing";
  }

  return "completed";
};