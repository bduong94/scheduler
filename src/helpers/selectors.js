export function getAppointmentsForDay(state, day) {
  const dayInformation = state.days.filter(
    (dayFromState) => dayFromState.name === day
  );

  if (state.days.length < 1 || dayInformation < 1) {
    return [];
  }

  const appointmentsForDayArray = dayInformation[0].appointments;
  const appointmentsInformationArray = [];

  for (const appointmentID of appointmentsForDayArray) {
    appointmentsInformationArray.push(state.appointments[appointmentID]);
  }

  return appointmentsInformationArray;
}
