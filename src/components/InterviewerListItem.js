import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClasses = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const showName = props.selected ? props.name : "";

  return (
    <li
      className={interviewerClasses}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName}
    </li>
  );
}
