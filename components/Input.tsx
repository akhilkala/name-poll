import React, { ReactElement } from "react";
import { InputState } from "../hooks/useInputState";

interface Props {
  state: InputState;
  name: string;
}

export default function Input({ state, name }: Props): ReactElement {
  return (
    <div className="input">
      <label htmlFor={name.toLowerCase()}>{name}</label>
      <input
        id={name.toLowerCase()}
        type="text"
        value={state.value}
        onChange={state.handleChange}
      />
    </div>
  );
}
