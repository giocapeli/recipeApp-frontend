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
import { useSelector } from "react-redux";
import { selectSelectedRecipe } from "../store/recipes/selectors";

export default function ShareCard(props) {
  const shareUrl = `https://whatshouldicook.netlify.app/recipe/${props.id}`;
  const ingredients = useSelector(selectSelectedRecipe).ingredients.map(
    (e) =>
      ` ${e.recipe_ingredients.quantity}${e.recipe_ingredients.unitOfMeasure} of ${e.name}`
  );
  const content = props.title + `: ` + ingredients;
  function print() {
    window.print();
  }

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

      <h3 onClick={() => print()}>🖨️</h3>
    </div>
  );
}
