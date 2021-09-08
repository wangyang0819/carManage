import React, { useState, useEffect } from "react";
import { Tabs, Modal } from "antd";
// import UploadComponent from "../../components/UploadComponent";
import UploadComponentShow from "../../components/UploadComponentShow";
import "./index.less";
import Input1 from "../../components/Input";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "./index.less";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
// import { withRouter, useHistory } from "react-router-dom";
import {
  deletecarouselData,
  carouselData,
  uploadcarouselData,
  brandData,
  deletebrandlData,
  uploadbrandData,
  updatebrandData,
} from "../../api/index";
const { TabPane } = Tabs;
const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
export default function UploadCar() {
  // 是否显示弹窗
  useEffect(() => {
    // getCarouselData();
    getBrandData();
  }, []);
  // tab
  function callback(key) {
    console.log(key);
  }
  // // // 初始化文件
  // const getCarouselData = async () => {
  //   // 获取文件列表
  //   const data = [];
  //   const result = await carouselData();
  //   if (result.result == "SUCCESS") {
  //     result.data.map(Element => {
  //       data.push({
  //         uid: Element.id,
  //         name: "image.png",
  //         status: "done",
  //         url: Element.imageurl
  //       });
  //     });
  //     setFileList(data);
  //     console.log("文件", data);
  //   }
  // };
  // // 删除焦点图
  // //  单选
  // const deleteFocusimg = async id => {
  //   await deletecarouselData(id);
  //   getCarouselData();
  // };
  // const editeFocusimg = id => {
  //   console.log("id1", id);
  // };
  // // 上传服务器
  // const uploadFocusimg = async fileList => {
  //   const formData = new FormData();
  //   fileList.forEach(file => {
  //     console.log("fileList1111", file);
  //     formData.append("focalPic", file);
  //   });
  //   console.log("formData", formData);
  //   await uploadcarouselData(formData);
  //   getCarouselData();
  // };
  // 品牌有关数据及事件
  // 查看
  const [fileList1, setFileList1] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const getBrandData = async () => {
    // 获取文件列表
    const data = [];
    const result = await brandData();
    if (result.result == "SUCCESS") {
      result.data.map((Element) => {
        data.push({
          brandName: Element.brandName,
          imgid: Element.imgid,
          uid: Element.id,
          name: "image.png",
          status: "done",
          url: Element.imagePath,
        });
      });
      setFileList1(data);
      console.log("文件", data);
    }
  };
  // 删除
  const deleteBrandimg = async (id) => {
    console.log("id", id);
    await deletebrandlData(id);
    getBrandData();
  };
  // 更新或者编辑传递到父组件的数据
  const [name, setName] = useState("");
  const [fileList2, setFileList2] = useState([]);
  const handleChange = async ({ file, fileList }) => {
    if (title == "更新") {
      const formData = new FormData();
      // newFile.forEach(file => {
      formData.append("logoPic", file);
      // });
      formData.append("brandName", name);
      formData.append("brandId", id);
      console.log("更新表单数据", formData);

      await updatebrandData(formData);
    } else {
      // 新增
      //   const formData = new FormData();
      //   newFile.forEach(file => {
      //     formData.append("logoPic", file);
      //   });
      //   formData.append("brandName", name);
      // console.log('上传表单数据',formData)
      //   await uploadbrandData(formData);
    }
    getBrandData();
  };

  const editeBrandimg = (Visible, title, id) => {
    if (title == "更新") {
      setId(id);
      fileList1.map((element) => {
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
  // 新建或者编辑
  // 弹窗ok
  const handleOk = async () => {
    // setIsModalVisible(false);
    const formData = new FormData();
    fileList2.forEach(file => {
      formData.append('logoPic', file);
    });
    formData.append("brandName", name);
    formData.append("brandId", id);
    console.log("更新表单数据", formData);
    await updatebrandData(formData);
    getBrandData();
    // 更新
  };
  // 弹窗撤销
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // 品牌名称变化
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onFileChange = ({ fileList }) => {
    setFileList2(fileList);
  };
  const beforeUpload = (file) => {
    setFileList2([...fileList2, file]);
    console.log('222',fileList2)
    return false;
  };
  
   
  const props = {
    onRemove: file => {
      setFileList2(fileList2 => {
        const index = fileList2.indexOf(file);
        const newFileList = fileList2.slice();
        newFileList.splice(index, 1);
        return {
          setFileList2: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setFileList2(fileList2 => ({
        fileList2: [...fileList2, file],
      }));
      return false;
    },
    fileList2,
  };
  
  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="焦点图" key="1">
          <h3>焦点图：</h3>
          {/* <UploadComponent
            type="leftPosiionbrand"
            data={propsDatabrand}
            icon="1"
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            accept="image/*"
            uploadFocusData={fileList => {
              return uploadBrandimg(fileList);
            }}
          ></UploadComponent>
          <Upload
            type="leftPosiion"
            data={propsData}
            icon="0"
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            accept="image/*"
            multiple={true}
            list={fileList}
            deleteItem={id => {
              return deleteFocusimg(id);
            }}
            editeItem={id => {
              return editeFocusimg(id);
            }}
            uploadFocusData={fileList => {
              return uploadFocusimg(fileList);
            }}
          ></Upload>
         */}
        </TabPane>
        <TabPane tab="品牌专区" key="2">
          <h3>品牌：</h3>
          <Modal
            title={title}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>品牌名称：</p>
            {name}

            <Input1
              style={{ flex: "auto", marginBottom: "10px" }}
              value={name}
              onChange={onNameChange}
            />
            
            <ImgCrop rotate>
              <div key={Math.random()}>
                <Upload
                  listType="picture-card"
                  type="image/png"
                  className="leftPosiionbrand"
                  {...props}
                >
                  {uploadButton}
                </Upload>
              </div>
            </ImgCrop>
          </Modal>

          <UploadComponentShow
            type="leftPosiionbrand"
            list={fileList1}
            deleteItem={(id) => {
              return deleteBrandimg(id);
            }}
            editeItem={(Visible, title, id) => {
              return editeBrandimg(Visible, title, id);
            }}
          ></UploadComponentShow>
        </TabPane>
      </Tabs>
    </div>
  );
}
