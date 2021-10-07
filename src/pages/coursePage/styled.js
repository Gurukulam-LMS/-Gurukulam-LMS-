import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
export const Buttons = styled(Button)`
  background: white;
  border: 1px solid #fd262a;
  color: #fd262a;
  margin: 0;
  margin-left: 0.7em;
  margin-top: 1em;
  border-radius: 0.6em;
  width: max-content;
  ${(props) =>
    props.fill === "true" &&
    css`
      background: blue;
      border: 1px solid blue;
      color: #fff;
    `}
  :hover {
    background: #fd262a;
    color: white;
    border: 1px solid #fd262a;
  }
`;
