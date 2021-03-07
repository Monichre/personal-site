import React from "react";
import ReactParticles from "react-tsparticles";
import { ParticleBackground } from "./Particles.style";

export const Particles: React.FC = () => {
  return (
    <ParticleBackground>
      <ReactParticles
        className="particles"
        canvasClassName="particles-canvas"
        params={{
          particles: {
            color: {
              value: "#50e3c1",
            },
            number: {
              value: 60,
              density: {
                enable: true,
                value_area: 1500,
              },
            },
            line_linked: {
              enable: true,
              opacity: 0.02,
            },
            move: {
              direction: "right",
              speed: 0.05,
            },
            size: {
              value: 1,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05,
              },
            },
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              push: {
                particles_nb: 1,
              },
            },
          },
          retina_detect: true,
        }}
      />
    </ParticleBackground>
  );
};
