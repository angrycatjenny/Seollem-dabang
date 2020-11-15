import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

function isEnabled(aggregator, track) {
  return aggregator && track.enabled;
}

function UserMediaActions({ stream, ...props }) {
  const [hasAudio, setAudio] = useState(
    stream ? stream.getAudioTracks().reduce(isEnabled, true) : true
  );
  const [hasVideo, setVideo] = useState(
    stream ? stream.getVideoTracks().reduce(isEnabled, false) : false
  );

  useEffect(() => {
    if (!stream) {
      return;
    }

    stream.getAudioTracks().forEach(function(track) {
      track.enabled = hasAudio;
    });
  }, [stream, hasAudio]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    stream.getVideoTracks().forEach(function(track) {
      track.enabled = hasVideo;
    });
  }, [stream, hasVideo]);

  const handleToggleVideo = () => {
    setVideo(v => !v);
  };

  return (
    <div className="btn-group" role="group" aria-label="Controls" {...props}>
      {stream && (
        <Fragment>
          <button
            type="button"
            title="Toggle camera"
            className={"btn btn-outline-" + (hasVideo ? "success" : "danger")}
            onClick={handleToggleVideo}
          >
            얼굴공개
          </button>
        </Fragment>
      )}
    </div>
  );
}

UserMediaActions.propTypes = {
  stream: PropTypes.object
};

export default UserMediaActions;
