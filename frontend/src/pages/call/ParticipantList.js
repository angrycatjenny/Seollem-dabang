import React from "react";
import PropTypes from "prop-types";
import Participant from "./Participant";

import styles from "./ParticipantList.module.scss";

function ParticipantList({ participants, streams }) {
  return (
    <div className={styles.participant}>
      {Object.keys(participants).map(participantId => (
        <Participant
          key={participantId}
          stream={streams[participantId] || null}
        />
      ))}
    </div>
  );
}

ParticipantList.propTypes = {
  participants: PropTypes.object.isRequired,
  streams: PropTypes.object.isRequired
};

export default ParticipantList;
