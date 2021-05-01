import styled from "styled-components";

export const StyledKubeWrapper = styled.section`
  width: 100px;
  height: 100px;
  margin: 30px auto;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -o-perspective: 1000px;
  perspective: 1000px;
  cursor: pointer;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 999;
  opacity: 0;
  transition: transform ease-in-out 0.3s, opacity ease-in-out 0.3s;
  transform: translate(-50%, -50%) scale(1.4);

  &.show {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
  }

  #cube {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition: -webkit-transform 0.24s;
    -moz-transition: -moz-transform 0.24s;
    -o-transition: -o-transform 0.24s;
    transition: transform 0.24s;
  }

  #cube figure {
    display: block;
    position: absolute;
    width: 100px;
    height: 100px;
    line-height: 97px;
    font-size: 60px;
    font-family: "BYekan";
    color: #fff;
    text-align: center;
  }

  #cube.panels-backface-invisible figure {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  #cube > figure {
    background: #303030;
  }

  #cube .front {
    -webkit-transform: translateZ(50px);
    -moz-transform: translateZ(50px);
    -o-transform: translateZ(50px);
    transform: translateZ(50px);
  }

  #cube .back {
    -webkit-transform: rotateX(-180deg) translateZ(50px);
    -moz-transform: rotateX(-180deg) translateZ(50px);
    -o-transform: rotateX(-180deg) translateZ(50px);
    transform: rotateX(-180deg) translateZ(50px);
  }

  #cube .right {
    -webkit-transform: rotateY(90deg) translateZ(50px);
    -moz-transform: rotateY(90deg) translateZ(50px);
    -o-transform: rotateY(90deg) translateZ(50px);
    transform: rotateY(90deg) translateZ(50px);
  }

  #cube .left {
    -webkit-transform: rotateY(-90deg) translateZ(50px);
    -moz-transform: rotateY(-90deg) translateZ(50px);
    -o-transform: rotateY(-90deg) translateZ(50px);
    transform: rotateY(-90deg) translateZ(50px);
  }

  #cube .top {
    -webkit-transform: rotateX(90deg) translateZ(50px);
    -moz-transform: rotateX(90deg) translateZ(50px);
    -o-transform: rotateX(90deg) translateZ(50px);
    transform: rotateX(90deg) translateZ(50px);
  }

  #cube .bottom {
    -webkit-transform: rotateX(-90deg) translateZ(50px);
    -moz-transform: rotateX(-90deg) translateZ(50px);
    -o-transform: rotateX(-90deg) translateZ(50px);
    transform: rotateX(-90deg) translateZ(50px);
  }

  #cube.show-spinning {
    -webkit-transform: translateZ(-50px) rotateX(20deg) rotateY(20deg);
    -moz-transform: translateZ(-50px) rotateX(20deg) rotateY(20deg);
    -o-transform: translateZ(-50px) rotateX(20deg) rotateY(20deg);
    transform: translateZ(-50px) rotateX(20deg) rotateY(20deg);
  }

  #cube.show-1 {
    -webkit-transform: translateZ(-50px);
    -moz-transform: translateZ(-50px);
    -o-transform: translateZ(-50px);
    transform: translateZ(-50px);
  }

  #cube.show-2 {
    -webkit-transform: translateZ(-50px) rotateX(-180deg);
    -moz-transform: translateZ(-50px) rotateX(-180deg);
    -o-transform: translateZ(-50px) rotateX(-180deg);
    transform: translateZ(-50px) rotateX(-180deg);
  }

  #cube.show-3 {
    -webkit-transform: translateZ(-50px) rotateY(-90deg);
    -moz-transform: translateZ(-50px) rotateY(-90deg);
    -o-transform: translateZ(-50px) rotateY(-90deg);
    transform: translateZ(-50px) rotateY(-90deg);
  }

  #cube.show-4 {
    -webkit-transform: translateZ(-50px) rotateY(90deg);
    -moz-transform: translateZ(-50px) rotateY(90deg);
    -o-transform: translateZ(-50px) rotateY(90deg);
    transform: translateZ(-50px) rotateY(90deg);
  }

  #cube.show-5 {
    -webkit-transform: translateZ(-50px) rotateX(-90deg);
    -moz-transform: translateZ(-50px) rotateX(-90deg);
    -o-transform: translateZ(-50px) rotateX(-90deg);
    transform: translateZ(-50px) rotateX(-90deg);
  }

  #cube.show-6 {
    -webkit-transform: translateZ(-50px) rotateX(90deg);
    -moz-transform: translateZ(-50px) rotateX(90deg);
    -o-transform: translateZ(-50px) rotateX(90deg);
    transform: translateZ(-50px) rotateX(90deg);
  }
`;
