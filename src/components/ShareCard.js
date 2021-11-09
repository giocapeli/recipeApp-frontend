import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { apiUrl } from "../config/constants";

export default function ShareCard(props) {
  const shareUrl = `${apiUrl}/recipe/${props.id}`;
  const content = props.title;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        margin: "10px auto",
      }}
    >
      <FacebookShareButton url={shareUrl} quote={content}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={shareUrl} title={content}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <WhatsappShareButton url={shareUrl} title={content} separator=": ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
