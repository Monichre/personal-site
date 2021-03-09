import React from "react";
import { GeistUIThemes, Link, Spacer, Tooltip } from "@geist-ui/react";
import makeStyles from "./makeStyles";

import { social } from "../data/links";
import { ContactModal } from "./ContactModal/ContactModal";

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  header: {
    width: ui.layout.pageWidthWithMargin,
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: ui.palette.background,
    fontSize: 16,
    height: 60,
    zIndex: 15,
    position: "relative",
  },
  headerContent: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${ui.layout.pageMargin}`,
  },
  headerTitle: {
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
  },
  nav: {
    position: "sticky",
    top: 0,
    backgroundColor: ui.palette.background,
    borderBottom: `solid 1px ${ui.palette.accents_2}`,
    zIndex: 15,
  },
  navFixed: {
    borderBottom: ui.type === "light" && "none",
    boxShadow: ui.type === "light" && "rgba(0, 0, 0, 0.1) 0 0 15px 0",
  },
  navContent: {
    width: ui.layout.pageWidthWithMargin,
    maxWidth: "100%",
    height: "100%",
    margin: "0 auto",
    "& .tabs header": {
      padding: `0 ${ui.layout.pageMargin}`,
      borderBottom: "none !important",
      flexWrap: "nowrap !important",
      overflowY: "hidden",
      overflowX: "auto",
      overflow: "-moz-scrollbars-none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    "& .content": {
      display: "none !important",
    },
    "& .tab": {
      padding: "12px !important",
      margin: "0 !important",
      fontSize: "14px !important",
    },
  },
  sidebar: {
    display: "flex",
    alignItems: "center !important",
  },
  themeIcon: {
    width: "40px !important",
    height: "40px !important",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    marginRight: 5,
    padding: "0 !important",
  },
  popover: {
    width: "180px !important",
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.headerContent}>
        <div style={{ display: "flex" }}>
          <div className={classes.headerTitle}>Hi. I'm Liam</div>
        </div>
        <div className={classes.sidebar}>
          {social.map((link) => (
            <Tooltip text={link.tooltip} placement="bottom">
              <Link download={link.download} href={link.url}>
                {link.icon}
              </Link>
              <Spacer inline x={0.5} />
            </Tooltip>
          ))}
          <ContactModal />
        </div>
      </div>
    </div>
  );
};

export default Menu;
