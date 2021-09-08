import React from "react";
import { Select } from "antd";
import "./index.less";
const { Option } = Select;

function RebuildSelect(props) {
  return (
    <div className="home">
      {props.title ? (
        <span className="spanLeft">{props.title}</span>
      ) : props.titleSingle ? (
        <span className="spanSingle">{props.titleSingle}</span>
      ) : (
        ""
      )}
      {/* select ,cascader ,timepicker */}
      <Select
        className={props.className}
        placeholder={props.placeholder ? props.placeholder : "请选择选项"}
        maxTagCount={1}
        showArrow={true}
        // showSearch
        optionFilterProp="children"
        {...props}
        // filterOption={(input, option) => option.children.indexOf(input) >= 0}
      ></Select>
    </div>
  );

}
RebuildSelect.Option = Option;
export default RebuildSelect;
