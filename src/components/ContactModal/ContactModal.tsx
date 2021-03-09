import React from "react";
import { useModal, useInput, useToasts } from "@geist-ui/react";
import { Mail } from "@geist-ui/react-icons";

import {
  Tooltip,
  Input,
  Modal,
  Spacer,
  Textarea,
  Link,
} from "./ContactModal.style";
import { send, init } from "emailjs-com";
init(process.env.GATSBY_EMAILJS_USER_ID || "");

export interface ContactModalProps {}

export const ContactModal: React.FC<ContactModalProps> = (props) => {
  const [, setToast] = useToasts();
  const { state: name, setState: setName, bindings: nameBindings } = useInput(
    ""
  );
  const {
    state: email,
    setState: setEmail,
    bindings: emailBindings,
  } = useInput("");
  const {
    state: message,
    setState: setMessage,
    bindings: messageBindings,
  } = useInput("");

  const { visible, setVisible, bindings: modalBindings } = useModal();
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  const sendEmail = async () => {
    const templateParams = {
      name,
      email,
      message,
    };
    await send(
      process.env.GATSBY_EMAILJS_SERVICE_ID || "",
      process.env.GATSBY_EMAILJS_TEMPLATE_ID || "",
      templateParams
    ).then((res) => {
      console.log("res: ", res);
      if (res?.status === 200) {
        setToast({
          text: `Email successfully delivered. Thanks! I'll be in touch.`,
        });
        close();
      }
    });
  };
  return (
    <>
      <Tooltip text={`Email me`} placement="bottom">
        <Link onClick={open} href={`#`}>
          <Mail size={16} color="white" />
        </Link>
        <Spacer inline x={0.5} />
      </Tooltip>
      <Modal {...modalBindings}>
        <Modal.Title>Get in touch</Modal.Title>

        <Modal.Content>
          <Input
            width="100%"
            label="name"
            placeholder="Your name"
            {...nameBindings}
          />
          <Spacer y={0.5} />
          <Input
            width="100%"
            label="email"
            placeholder="Your email"
            {...emailBindings}
          />
          <Spacer y={0.5} />
          <Textarea
            width="100%"
            placeholder="You message"
            {...messageBindings}
          />
        </Modal.Content>
        <Modal.Action passive onClick={close}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={sendEmail}>Send</Modal.Action>
      </Modal>
    </>
  );
};
