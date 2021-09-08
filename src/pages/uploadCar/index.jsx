import React, { useState, useEffect } from "react";
import { Tabs, Modal, Button } from "antd";
// import UploadComponent from "../../components/UploadComponent";
import UploadComponentShow from "../../components/UploadComponentShow";
import "./index.less";
import Input1 from "../../components/Input";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "./index.less";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { checkImageWH } from "../../config/uploadImg";
// import { withRouter, useHistory } from "react-router-dom";
import {
  deletecarouselData,
  carouselData,
  uploadcarouselData,
  brandData,
  deletebrandlData,
  uploadbrandData,
  updatebrandData
} from "../../api/index";
const { TabPane } = Tabs;
const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export default function UploadCar(props) {
  // 是否显示弹窗
  useEffect(() => {
    getCarouselData();
    getBrandData();
  }, []);
  // tab
  function callback(key) {
    console.log(key);
  }
  const [fileList, setFileList] = useState([
   
  ]);
  // 回显数据
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const [fileList3, setFileList3] = useState([]);

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
  const [err1,seterr] = useState('')
  const handleBeforeupload = file => {
    return checkImageWH(file, 160, 160).catch(err => {
      //请求失败
      return Upload.LIST_IGNORE;

    });
  };
  const handleChange = ({ fileList }) => {
    fileList.forEach(item => {
      item.status = "done";
    });
    console.log("fileList3", fileList);
    setFileList3(fileList);
  };
  // 获取文件列表
  const getCarouselData = async () => {
    // 获取文件列表
    const data = [];
    const result = await carouselData();
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
  // // 删除焦点图
  // //  单选
  const deleteFocusimg = async id => {
    await deletecarouselData([id]);
    getCarouselData();
  };
  // // 上传服务器
  const uploadFocus = async () => {
    const formData = new FormData();
    fileList3.forEach(file => {
      console.log("focalPic", file);
      formData.append("focalPic", file.originFileObj);
      console.log("formData", formData.get("focalPic"));
    });
    console.log("formData", formData.get("focalPic"));
    await uploadcarouselData(formData);
    setFileList3([]);
    getCarouselData();
  };
  // 品牌有关数据及事件
  // 查看
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  // 更新或者编辑传递到父组件的数据
  const [name, setName] = useState("");
  const [fileList2, setFileList2] = useState([]);
  const [fileList1, setFileList1] = useState([
    
  ]);
  // 获取文件列表
  const getBrandData = async () => {
    // 获取文件列表
    const data = [];
    const result = await brandData();
    if (result.result == "SUCCESS") {
      result.data.map(Element => {
        data.push({
          brandName: Element.brandName,
          imgid: Element.imgid,
          uid: Element.id,
          name: "image.png",
          status: "done",
          url: Element.imagePath
        });
      });
      setFileList1(data);
      console.log("文件", data);
    }
  };
  // 删除
  const deleteBrandimg = async id => {
    console.log("id", id);
    await deletebrandlData([id]);
    getBrandData();
  };
  // 新增或编辑
  const editeBrandimg = (Visible, title, id) => {
    if (title == "更新") {
      setId(id);
      fileList1.map(element => {
        if (element.uid == id) {
          setName(element.brandName);
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
      fileList2.forEach(file => {
        formData.append("logoPic", file.originFileObj);
      });
      formData.append("brandName", name);
      formData.append("brandId", id);
      console.log("更新表单数据", formData);
      await updatebrandData(formData);
    } else {
      // 新增
      const formData = new FormData();
      fileList2.forEach(file => {
        formData.append("logoPic", file.originFileObj);
      });
      formData.append("brandName", name);
      console.log("更新表单数据", formData);
      await uploadbrandData(formData);
    }
    setFileList2([]);
    setName("");
    getBrandData();
  };
  // 弹窗撤销
  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList2([]);
    setName("");
  };
  // 品牌名称变化
  const onNameChange = e => {
    setName(e.target.value);
  };
  // upload基础数据
  const propsBrand = {
    onRemove: file => {
      setFileList2(fileList2 => {
        const index = fileList2.indexOf(file);
        const newFileList = fileList2.slice();
        newFileList.splice(index, 1);
        return {
          setFileList2: newFileList
        };
      });
    },
    beforeUpload: file => {
      // file.status = "done";
      console.log("filr", file);

      setFileList2([...fileList2, file]);
      return false;
    },
    fileList: fileList2
  };
  const goPage = id => {
    console.log("id", id);
    props.history.push("/uploadCar/brandDetail/" + id);
  };
  const handleChange2 = ({ fileList }) => {
    fileList.forEach(item => {
      item.status = "done";
    });
    setFileList2(fileList);
  };
 

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="焦点图" key="1">
          {/* <h3>焦点图：</h3> */}
          <div key={Math.random()} style={{ marginLeft: "10px" }}>
            <Upload
              className="leftPosiionbrand"
              accept="image/*"
              action="#"
              listType="picture-card"
              fileList={fileList3}
              beforeUpload={handleBeforeupload}
              onPreview={handlePreview}
              onChange={handleChange}
              multiple
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
              onClick={uploadFocus}
              disabled={fileList3.length > 0 ? false : true}
            >
              上传至服务器
            </Button>
          </div>

          <UploadComponentShow
            icon="0"
            type="leftPosiionbrand"
            list={fileList}
            deleteItem={id => {
              return deleteFocusimg(id);
            }}
            isNext={false}
          ></UploadComponentShow>
        </TabPane>
        <TabPane tab="品牌专区" key="2">
          {/* <h3 className="titlename">品牌：</h3> */}
          <Modal
            title={title}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>品牌名称：</p>
            <Input1
              style={{ flex: "auto", marginBottom: "10px" }}
              value={name}
              onChange={onNameChange}
            />
            <div key={Math.random()}>
              <Upload
                maxCount={1}
                className="leftPosiionbrand"
                // {...propsBrand}
                listType="picture-card"
                accept="image/*"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                fileList={fileList2}
                onPreview={handlePreview}
                onChange={handleChange2}
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
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </Modal>

          <UploadComponentShow
            type="leftPosiionbrand"
            isNext={true}
            list={fileList1}
            deleteItem={id => {
              return deleteBrandimg(id);
            }}
            editeItem={(Visible, title, id) => {
              return editeBrandimg(Visible, title, id);
            }}
            goPage={id => {
              return goPage(id);
            }}
          ></UploadComponentShow>
        </TabPane>
      </Tabs>
    </div>
  );
}
