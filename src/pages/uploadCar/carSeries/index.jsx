import React, { useState, useEffect } from "react";
import "./index.less";
import Select from "../../../components/Select";
import Input1 from "../../../components/Input";
import { withRouter, useHistory } from "react-router-dom";
import { Tabs, Modal, Button, Upload } from "antd";
// import UploadComponent from "../../components/UploadComponent";
import UploadComponentShow from "../../../components/UploadComponentShow";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { checkImageWH } from "../../../config/uploadImg";

import {
  deletebrandlData,
  CarseriesData,
  deleteCarserieslData,
  uploadCarseriesData,
  updateCarseriesData
} from "../../../api/index";
const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export default function CarStyles(props) {
  //  单选
  const [value, setValue] = React.useState(1);
  const [fileList, setFileList] = useState([
   
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  // 更新或者编辑传递到父组件的数据
  const [name, setName] = useState("");
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");
  const [fileList3, setFileList3] = useState([]);
  const [fileList1, setFileList1] = useState([
   
  ]);
  useEffect(() => {
    getCarseriesData();
  }, []);
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
  const [brandId, setSeriesId] = useState(props.match.params.id);
  const [uid, setUid] = useState();

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

  // 获取文件列表
  const getCarseriesData = async () => {
    // 获取文件列表
    const data = [];
    const result = await CarseriesData({
      brandId: brandId
    });
    if (result.result == "SUCCESS") {
      result.data.map(Element => {
        data.push({
          brandName: Element.seriesName,
          minPrice: Element.minPrice,
          maxPrice: Element.maxPrice,
          imgid: Element.imgid,
          uid: Element.id,
          name: "image.png",
          status: "done",
          url: Element.imageUrl,
          brandId: Element.brandId
        });
      });
      setFileList1(data);

      console.log("文件", data);
    }
  };
  // 删除
  const deleteSeriesimg = async id => {
    console.log("id", id);
    await deleteCarserieslData([id]);
    getCarseriesData();
  };
  // 新增或编辑
  const editeSeriesimg = (Visible, title, id) => {
    if (title == "更新") {
      setId(id);
      fileList1.map(element => {
        if (element.uid == id) {
          setName(element.brandName);
          setminPrice(element.minPrice);
          setmaxPrice(element.maxPrice);
          setUid(element.uid);
        }
      });
    } else {
      // setName('')
    }
    setIsModalVisible(Visible);
    setTitle(title);
  };

  // 弹窗ok
  const handleOk = async () => {
    setIsModalVisible(false);
    // 更新
    if (title == "更新") {
      const formData = new FormData();
      fileList3.forEach(file => {
        formData.append("seriesPic", file.originFileObj);
      });
      formData.append("seriesName", name);
      formData.append("minPrice", minPrice);
      formData.append("maxPrice", maxPrice);
      formData.append("brandid", brandId);
      formData.append("id", uid);
      console.log("更新表单数据", formData);
      await updateCarseriesData(formData);
    } else {
      // 新增
      const formData = new FormData();
      fileList3.forEach(file => {
        formData.append("seriesPic", file.originFileObj);
      });
      setFileList3([]);
      setName("");
      setminPrice("");
      setmaxPrice("");
      formData.append("seriesName", name);
      formData.append("minPrice", minPrice);
      formData.append("maxPrice", maxPrice);
      formData.append("brandid", brandId);
      console.log("更新表单数据", formData);
      await uploadCarseriesData(formData);
    }
   
    getCarseriesData();
  };
  // 弹窗撤销
  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList3([]);
    setName("");
    setminPrice("");
    setmaxPrice("");
  };
  // 品牌名称变化
  const onNameChange = e => {
    setName(e.target.value);
  };
  const onminPriceChange = e => {
    setminPrice(e.target.value);
  };
  const onmaxPriceChange = e => {
    setmaxPrice(e.target.value);
  };
  // upload基础数据
  const goPage = id => {
    props.history.push("/uploadCar/carStyles/" + brandId + '/' + id);
  };
  const handleBeforeupload = file => {
    return checkImageWH(file, 290, 160).catch(err => {
      //请求失败
      return Upload.LIST_IGNORE;

    });
  };
  return (
    <div>
      <h3>车系名称：</h3>
      <Modal
        title={title}
        width="700px"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>车系名称:</h3>
        <Input1
          className="TextInput"
          placeholder="请输入名称"
          value={name}
          onChange={onNameChange}
        />
        <h3>价格区间:</h3>
        <div className="flex">
          <Input1
            className="TextInput"
            placeholder="请输入价格"
            value={minPrice}
            onChange={onminPriceChange}
          />
          <span> 至</span>
          <Input1
            className="TextInput"
            placeholder="请输入价格"
            value={maxPrice}
            onChange={onmaxPriceChange}
          />
        </div>

        <div key={Math.random()}>
          <Upload
            className="leftPosiionbrand"
            // {...propsSeries}
            maxCount={1}
            listType="picture-card"
            accept="image/*"
            action="#"
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
        </div>
      </Modal>

      <UploadComponentShow
        type="leftPosiionbrand"
        isNext={true}
        list={fileList1}
        deleteItem={id => {
          return deleteSeriesimg(id);
        }}
        editeItem={(Visible, title, id) => {
          return editeSeriesimg(Visible, title, id);
        }}
        goPage={id => {
          return goPage(id);
        }}
      ></UploadComponentShow>
    </div>
  );
}
