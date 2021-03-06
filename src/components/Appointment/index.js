import React, { useEffect } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRMING = "CONFIRMING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_NOINTERVIEWER = "ERROR_NOINTERVIEWER";
  const ERROR_NONAME = "ERROR_NONAME";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (mode === EMPTY && props.interview) {
      transition(SHOW);
    }

    if (mode === SHOW && !props.interview) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  //Function to save interview information
  const save = (name, interviewer = null) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    //If there is no interviewer selected
    if (!interviewer) {
      setTimeout(() => transition(ERROR_NOINTERVIEWER), 1000);
    } //If there is no name entered
    else if (name === "") {
      setTimeout(() => transition(ERROR_NONAME), 1000);
    } else {
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE));
    }
  };

  //Function to cancel an interview slot
  const removeInterview = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => setTimeout(() => transition(EMPTY), 1000))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          interviewer={props.interview.interviewer}
          student={props.interview.student}
          onDelete={() => transition(CONFIRMING)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRMING && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => removeInterview()}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save the appointment."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel the appointment."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_NOINTERVIEWER && (
        <Error
          message="No interviewer selected. Please select an interviewer."
          onClose={() => back()}
        />
      )}

      {mode === ERROR_NONAME && (
        <Error
          message="The name cannot be blank. Please enter a name."
          onClose={() => back()}
        />
      )}
    </article>
  );
}
