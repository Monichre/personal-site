import React from "react";

import {
  Linkedin,
  Github,
  Twitter,
  Mail,
  Briefcase,
} from "@geist-ui/react-icons";

export const social = [
  {
    icon: <Linkedin size={16} />,
    url: "https://www.linkedin.com/in/heyitsliam/",
    download: false,
  },
  {
    icon: <Github size={16} />,
    url: "https://github.com/Monichre",
    download: false,
  },
  {
    icon: <Twitter size={16} />,
    url: "https://twitter.com/monichre",
    download: false,
  },
  {
    icon: <Mail size={16} />,
    url: "liamhellis@gmail.com",
    download: false,
  },
  {
    icon: <Briefcase size={16} />,
    url: "/resume.pdf",
    download: true,
  },
];
