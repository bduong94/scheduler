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

export function getInterviewersForDay(state, day) {
  const dayInformation = state.days.filter(
    (dayFromState) => dayFromState.name === day
  );

  if (state.days.length < 1 || dayInformation < 1) {
    return [];
  }

  const interviewersForDayArray = dayInformation[0].interviewers;
  const interviewersInformationArray = [];

  for (const interviewID of interviewersForDayArray) {
    if (state.interviewers[interviewID]) {
      interviewersInformationArray.push(state.interviewers[interviewID]);
    }
  }

  return interviewersInformationArray;
}

export function getInterview(state, interview) {
  const interviewCopy = {};
  if (interview && Object.keys(state.interviewers).length !== 0) {
    interviewCopy.student = interview.student;
    interviewCopy.interviewer = state.interviewers[interview.interviewer];
    return interviewCopy;
  } else {
    return null;
  }
}
