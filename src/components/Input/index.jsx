import React from "react";
import { Input } from "antd";
import "./index.less";
const { Search } = Input;
const { TextArea } = Input;

function RebuildInput(props) {
  return (
    <div>
      {props.title ? <span className="leftText">{props.title}</span> : ""}
      <Input {...props} className={props.className} />
    </div>
  );
}
RebuildInput.Search = Search;
RebuildInput.TextArea = TextArea;
export default RebuildInput;
