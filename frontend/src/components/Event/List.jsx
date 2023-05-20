import React, { useEffect, useState } from "react";

export const ListEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const eventsData = await fetch(
        "https://meetupv1-flask.onrender.com/list-events",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      ).then((res) => {
        if (res.status === 200) {
          console.log("successful");
          return res.json();
        } else {
          console.log("failure");
          return [];
        }
      });
      setEvents(eventsData);
    };
    loadData();
  }, []);
  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((value) => {
          return (
            <li key={value.event_id}>
              <a href={`/register/${value.event_id}`}>
              {value.title} at {value.location}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
