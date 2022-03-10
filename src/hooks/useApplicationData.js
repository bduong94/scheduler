import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //API States
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Helper setter functions
  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const setAppointments = (appointments) =>
    setState((prev) => ({ ...prev, appointments }));
  const setInterviewers = (interviewers) =>
    setState((prev) => ({ ...prev, interviewers }));

  useEffect(() => {
    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setDays(all[0].data);
      setAppointments(all[1].data);
      setInterviewers(all[2].data);
    });
  }, []);

  //Function to update sidebar spots
  const updateSpots = (appointments) => {
    const days = [...state.days];
    const dayInformation = days.filter((day) => day.name === state.day);
    const dayAppointments = dayInformation[0].appointments;
    let counter = 0;

    for (const appointmentID of dayAppointments) {
      if (appointments[appointmentID].interview === null) {
        counter++;
      }
    }

    dayInformation[0].spots = counter;

    for (let i = 0; i < days.length; i++) {
      if (dayInformation[0].name === days[i].name) {
        days[i] = dayInformation[0];
      }
    }

    return days;
  };

  //Interview booking function
  const bookInterview = (id, interview) => {
    const urlUpdate = `/api/appointments/${id}`;
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return Promise.all([axios.put(urlUpdate, appointment)]).then(() => {
      setState({ ...state, appointments });
      setDays(updateSpots(appointments));
    });
  };

  //Cancel Interview functions
  const cancelInterview = (id) => {
    const urlUpdate = `/api/appointments/${id}`;

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return Promise.all([axios.delete(urlUpdate)]).then(() => {
      setState({ ...state, appointments });
      setDays(updateSpots(appointments));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
