import React, { useState, useEffect } from "react";
import "./index.less";
import {
  zonesData,
  deletezonesData,
  uploadzonesData
} from "../../../api/index";
import { Modal, Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UploadComponentShow from "../../../components/UploadComponentShow";
import { withRouter } from "react-router-dom";
import { checkImageWH } from "../../../config/uploadImg";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export default function BrandDetail(props) {
  //  单选
  const [fileList, setFileList] = useState([
   
  ]);
  // 回显数据
  const [fileList3, setFileList3] = useState([]);
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState("");
  const [previewTitle, setpreviewTitle] = useState("");
  const handleCancel1 = () => {
    setpreviewVisible(false);
  };
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setpreviewImage(file.url || file.preview);
    setpreviewVisible(true);
    setpreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList }) => {
    fileList.forEach(item => {
      item.status = "done";
    });
    console.log("fileList3", fileList);
    setFileList3(fileList);
  };
  // // 初始化文件
  const [brandId, setBrandId] = useState(props.match.params.id);
  // // 初始化文件
  const getzoneslData = async () => {
    // 获取文件列表
    const data = [];
    const result = await zonesData(brandId);
    if (result.result == "SUCCESS") {
      result.data.map(Element => {
        data.push({
          uid: Element.id,
          name: "image.png",
          status: "done",
          url: Element.imageurl
        });
      });
      setFileList(data);
      console.log("文件", data);
    }
  };
  // 删除焦点图
  const deleteZoneslData = async id => {
    await deletezonesData([id]);
    getzoneslData();
  };
  // 初始化调用函数
  useEffect(() => {
    getzoneslData();
  }, []);
  // 上传服务器
  const uploadZonesimg = async () => {
    const formData = new FormData();
    fileList3.forEach(file => {
      console.log("focalPic", file);
      formData.append("branZonePic", file.originFileObj);
    });
    formData.append("brandId", brandId);

    console.log("formData", formData);
    await uploadzonesData(formData);
    getzoneslData();
  };
  const goPage = id => {
    console.log("id", id);
    props.history.push("/uploadCar/carSeries/" + brandId);
  };
  const handleBeforeupload = file => {
    return checkImageWH(file, 290, 160).catch(err => {
      //请求失败
      return Upload.LIST_IGNORE;

    });
  };
  return (
    <div>
      <h3>品牌专区：</h3>
      <div key={Math.random()} style={{ marginLeft: "10px" }}>
        <Upload
          className="leftPosiionbrand"
          accept="image/*"
          action="#"
          multiple
          listType="picture-card"
          fileList={fileList3}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={handleBeforeupload}
        >
          {uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel1}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <Button
          type="primary"
          onClick={uploadZonesimg}
          disabled={fileList3.length > 0 ? false : true}
        >

          上传至服务器

        </Button>
      </div>
      <UploadComponentShow
        icon="0"
        isNext={true}
        type="leftPosiionbrand"
        list={fileList}
        deleteItem={id => {
          return deleteZoneslData(id);
        }}
        goPage={id => {
          return goPage(id);
        }}
      ></UploadComponentShow>
    </div>
  );
}
