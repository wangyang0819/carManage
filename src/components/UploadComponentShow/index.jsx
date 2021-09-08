import React, { useState } from "react";
import { Button, Radio } from "antd";
import "./index.less";
import { withRouter } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

function UploadComponent(props) {
  const [value, setValue] = React.useState("");
  const [isDisable, setisDisable] = React.useState(true);
  const onChange = e => {
    console.log("checked = ", e.target.value);
    setValue(e.target.value);
    setisDisable(false);
  };
  const deleteItem = id => {
    props.deleteItem(id);
  };
  const editeItem = () => {
    props.editeItem(true, "更新", value);
    console.log("djskjdfkvnf", value);
  };
  const createItem = () => {
    props.editeItem(true, "新增");
    console.log("skjdksdk", "新增111");
  };
  const goPage = () => {
    props.goPage(value);
  };
  return (
    <div className="imgSpace">
      {/* 编辑 更新 */}
      {props.icon != 0 ? (
        <div className="eventClass">
          <Button type="danger" onClick={createItem}>
            新增
          </Button>

          <Button
            type="primary"
            onClick={editeItem}
            disabled={value == "" ? true : false}
          >
            编辑
          </Button>
        </div>
      ) : null}
      <div style={{ width: "800px", marginTop: "20px" }}>
        {props.mult == "true" ? (
          <Radio.Group onChange={onChange} defaultValue={value} className="specialRadio">
            {props.list.map(item => {
              return (
                <div style={{ marginBottom:'20px'}}>
                  <Radio value={item.uid} key={item.id} className="multname" >
                    {item.brandName ? (
                      <span className="brandname" >{item.brandName}</span>
                    ) : null}
                  </Radio>

                  <div style={{display:"flex"}}>
                    {item.imagePathList &&
                      item.imagePathList.map(item1 => {
                        return (
                          <div style={{marginRight:"10px"}}>
                            <DeleteOutlined
                              onClick={() => {
                                return deleteItem(item1.id);
                              }}
                            />
                            <img
                              className="uploadImg"
                              src={item1.imageurl}
                              alt=""
                            />
                            <br></br>
                            <br></br>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </Radio.Group>
        ) : (
          <Radio.Group onChange={onChange} defaultValue={value}>
            {props.list.map(item => {
              return (
                <Radio value={item.uid} key={item.uid}>
                  <DeleteOutlined
                    onClick={() => {
                      return deleteItem(item.uid);
                    }}
                  />
                  <img className="uploadImg" src={item.url} alt="" />
                  <br></br>
                  <br></br>
                  {item.brandName ? (
                    <span className="brandname">{item.brandName}</span>
                  ) : null}
                </Radio>
              );
            })}
          </Radio.Group>
        )}
      </div>
      {props.isNext ? (
        <Button
          className="nextbutton"
          type="primary"
          onClick={goPage}
          style={{ marginTop: "20px" }}
          disabled={isDisable && props.icon != 0}
        >
          下一步{isDisable}
        </Button>
      ) : null}
    </div>
  );
}
export default withRouter(UploadComponent);
