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
    if (state.appointments[appointmentID]) {
      appointmentsInformationArray.push(state.appointments[appointmentID]);
    }
  }

  return appointmentsInformationArray;
}

export function getInterview(state, interview) {
  const interviewCopy = interview;
  if (interview) {
    interviewCopy.interviewer = state.interviewers[interview.interviewer];
    delete interviewCopy.interview;
    return interviewCopy;
  } else {
    return null;
  }
}
