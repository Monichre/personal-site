import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useRef,
} from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { JssProvider } from "react-jss";
// import AnimatedCursor from "react-animated-cursor";
import styled from "styled-components";
import { Particles } from "../Particles/Particles";
import Menu from "../Menu";

import { useGithubData } from "./github-data.hooks";

/* eslint-disable react-hooks/exhaustive-deps */
/**
 * useEventListener
 * Hook for handling EventListeners
 * @return {object} width, height
 */
export function useEventListener(eventName: any, handler: any) {
  // Create a ref that stores handler
  const savedHandler: any = useRef();

  // Update ref.current value if handler changes.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      if (typeof window !== `undefined`) {
        // Create event listener that calls handler function stored in ref
        const eventListener = (event: any) => savedHandler.current(window);

        // Add event listener
        window.addEventListener(eventName, eventListener);
      }

      // Remove event listener on cleanup
      return () => {
        if (typeof window !== `undefined`) {
          const eventListener = (event: any) => savedHandler.current(window);
          window.removeEventListener(eventName, eventListener);
        }
      };
    },
    [eventName] // Re-run if eventName or element changes
  );
}
function CursorCore({
  color = "220, 90, 90",
  outerAlpha = 0.3,
  innerSize = 8,
  innerScale = 0.7,
  outerSize = 8,
  outerScale = 5,
}) {
  const cursorOuterRef: any = useRef();
  const cursorInnerRef: any = useRef();
  const requestRef: any = useRef();
  const previousTimeRef: any = useRef();
  const [coords, setCoords]: any = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible]: any = useState(false);
  const [isActive, setIsActive]: any = useState(false);
  const [isActiveClickable, setIsActiveClickable]: any = useState(false);
  let endX: any = useRef(0);
  let endY: any = useRef(0);

  // Primary Mouse Move event
  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    cursorInnerRef.current.style.top = clientY + "px";
    cursorInnerRef.current.style.left = clientX + "px";
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  // Outer Cursor Animation Delay
  const animateOuterCursor = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8;
        coords.y += (endY.current - coords.y) / 8;
        cursorOuterRef.current.style.top = coords.y + "px";
        cursorOuterRef.current.style.left = coords.x + "px";
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [requestRef] // eslint-disable-line
  );

  // RAF for animateOuterCursor
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [animateOuterCursor]);

  // Mouse Events State updates
  const onMouseDown = useCallback(() => {
    setIsActive(true);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsActive(false);
  }, []);

  const onMouseEnterViewport = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onMouseLeaveViewport = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEventListener("mousemove", onMouseMove);
  useEventListener("mousedown", onMouseDown);
  useEventListener("mouseup", onMouseUp);
  useEventListener("mouseover", onMouseEnterViewport);
  useEventListener("mouseout", onMouseLeaveViewport);

  // Cursors Hover/Active State
  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `translateZ(0) scale(${innerScale})`;
      cursorOuterRef.current.style.transform = `translateZ(0) scale(${outerScale})`;
    } else {
      cursorInnerRef.current.style.transform = "translateZ(0) scale(1)";
      cursorOuterRef.current.style.transform = "translateZ(0) scale(1)";
    }
  }, [innerScale, outerScale, isActive]);

  // Cursors Click States
  useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `translateZ(0) scale(${
        innerScale * 1.2
      })`;
      cursorOuterRef.current.style.transform = `translateZ(0) scale(${
        outerScale * 1.4
      })`;
    }
  }, [innerScale, outerScale, isActiveClickable]);

  // Cursor Visibility State
  useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1;
      cursorOuterRef.current.style.opacity = 1;
    } else {
      cursorInnerRef.current.style.opacity = 0;
      cursorOuterRef.current.style.opacity = 0;
    }
  }, [isVisible]);

  // Target all possible clickables
  useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    );
    clickables.forEach((el: any) => {
      el.style.cursor = "none";

      el.addEventListener("mouseover", () => {
        setIsActive(true);
      });
      el.addEventListener("click", () => {
        setIsActive(true);
        setIsActiveClickable(false);
      });
      el.addEventListener("mousedown", () => {
        setIsActiveClickable(true);
      });
      el.addEventListener("mouseup", () => {
        setIsActive(true);
      });
      el.addEventListener("mouseout", () => {
        setIsActive(false);
        setIsActiveClickable(false);
      });
    });

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener("mouseover", () => {
          setIsActive(true);
        });
        el.removeEventListener("click", () => {
          setIsActive(true);
          setIsActiveClickable(false);
        });
        el.removeEventListener("mousedown", () => {
          setIsActiveClickable(true);
        });
        el.removeEventListener("mouseup", () => {
          setIsActive(true);
        });
        el.removeEventListener("mouseout", () => {
          setIsActive(false);
          setIsActiveClickable(false);
        });
      });
    };
  }, [isActive]);

  // Cursor Styles
  const styles = {
    cursorInner: {
      zIndex: 999,
      display: "block",
      position: "fixed",
      borderRadius: "50%",
      width: innerSize,
      height: innerSize,
      pointerEvents: "none",
      backgroundColor: `rgba(${color}, 1)`,
      transition: "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
      backfaceVisibility: "hidden",
      willChange: "transform",
    },
    cursorOuter: {
      zIndex: 999,
      display: "block",
      position: "fixed",
      borderRadius: "50%",
      pointerEvents: "none",
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
      backfaceVisibility: "hidden",
      willChange: "transform",
    },
  };

  // Hide / Show global cursor
  useEffect(() => {
    if (window && document) {
      document.body.style.cursor = "none";
    }
  }, []);

  return (
    <React.Fragment>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </React.Fragment>
  );
}

/**
 * AnimatedCursor
 * Calls and passes props to CursorCore if not a touch/mobile device.
 */
function AnimatedCursor({
  color = "220, 90, 90",
  outerAlpha = 0.3,
  innerSize = 8,
  outerSize = 8,
  outerScale = 5,
  innerScale = 0.7,
}) {
  return (
    <CursorCore
      color={color}
      outerAlpha={outerAlpha}
      innerSize={innerSize}
      innerScale={innerScale}
      outerSize={outerSize}
      outerScale={outerScale}
    />
  );
}

const AppWrap: any = styled.div`
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

export const AppContext = createContext({
  githubData: {},
});

const Layout: React.FC = ({ children }) => {
  const { githubData } = useGithubData();

  return (
    <AppContext.Provider value={{ githubData }}>
      <JssProvider id={{ minify: true }}>
        <GeistProvider themeType={"dark"}>
          <CssBaseline />
          <AppWrap>
            <Particles />

            <AnimatedCursor
              innerSize={8}
              outerSize={8}
              color="80, 227, 193"
              outerAlpha={0.4}
            />

            <Menu />
            {children}
          </AppWrap>
        </GeistProvider>
      </JssProvider>
    </AppContext.Provider>
  );
};

export default Layout;
