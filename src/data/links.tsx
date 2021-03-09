import React from "react";

import { Linkedin, Github, Twitter, Briefcase } from "@geist-ui/react-icons";

export const social = [
  {
    icon: <Linkedin size={16} />,
    url: "https://www.linkedin.com/in/heyitsliam/",
    tooltip: `Check me out on linkedin.`,
    download: false,
  },
  {
    icon: <Github size={16} />,
    url: "https://github.com/Monichre",
    tooltip: `Check me out on Github.`,
    download: false,
  },
  {
    icon: <Twitter size={16} />,
    url: "https://twitter.com/monichre",
    tooltip: `Check me out on twitter`,
    download: false,
  },

  {
    icon: <Briefcase size={16} />,
    url: "/resume.pdf",
    tooltip: `Download my resume resume.`,
    download: true,
  },
];
