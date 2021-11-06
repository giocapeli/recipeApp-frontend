import React from "react";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import DeleteButton from "./DeleteButton";

export default function ShareCard(props) {
  const shareUrl = props.url;
  const content = props.title;
  return (
    <div className="pop-up-background">
      <div className="pop-up centered box">
        <DeleteButton action={() => props.action()} />
        <h1>Share</h1>
        <div className="switch">
          <button className="switch-button">Ingredient List</button>
          <button className="switch-button selected">Whole Recipe</button>
        </div>
        <div>
          <FacebookShareButton
            url={shareUrl}
            quote={content}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="521270401588372"
            className="Demo__some-network__share-button"
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <TelegramShareButton
            url={shareUrl}
            title={content}
            className="Demo__some-network__share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title={content}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
}
