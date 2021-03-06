import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <div onClick={action("clicked")}>{text("Label", "Hello Storybook")}</div>
  ));
