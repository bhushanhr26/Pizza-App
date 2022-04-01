import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../action/index";
export default function Inc() {
  const myState = useSelector((state) => state.changeTheNumber);
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex" }}>
      <div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
      </div>
      <div style={{ margin: "10px" }}>{myState}</div>
      <div>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}
