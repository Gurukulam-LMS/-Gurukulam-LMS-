import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const SocialMediaShare = ({ content }) => {
  return (
    <>
      <FacebookShareButton
        url={process.env.REACT_APP_PUBLIC_URL}
        quote={content}
        hashtag="Gurukulam"
      >
        <FacebookIcon size={36} />
      </FacebookShareButton>
      <TwitterShareButton
        url={window.location.href}
        title={content}
        via="Gurukulam"
        hashtags={["Gurukulam", "Learning", "NewInTechnology"]}
      >
        <TwitterIcon size={36} />
      </TwitterShareButton>
      <LinkedinShareButton
        url={window.location.href}
        title={content}
        source="Gurukulam"
      >
        <LinkedinIcon size={36} />
      </LinkedinShareButton>

      <EmailShareButton url={window.location.href} body={content}>
        <EmailIcon size={36} />
      </EmailShareButton>
    </>
  );
};

export default SocialMediaShare;
