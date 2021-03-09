import styled, { css } from "styled-components";
export const ParticleBackground = styled.div`
  height: 100%;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: transparent;

  .particles {
    .particles-canvas {
      /* height: 100vh !important;
      width: 100vw; */
    }
  }
`;
