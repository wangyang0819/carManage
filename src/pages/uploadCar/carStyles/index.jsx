import React, { useContext, useState, useEffect, useRef } from "react";
import "./index.less";
import Select from "../../../components/Select";
import Input1 from "../../../components/Input";
import { withRouter, useHistory } from "react-router-dom";
import moment from "moment";
import { checkImageWH } from "../../../config/uploadImg";

import {
  Tabs,
  Modal,
  Button,
  Upload,
  Table,
  Input,
  Popconfirm,
  Form,
  DatePicker
} from "antd";
// import UploadComponent from "../../components/UploadComponent";
import UploadComponentShow from "../../../components/UploadComponentShow";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import {
  deletebrandlData,
  CarStylesData,
  uploadCarStylesBaseData,
  uploadCarStylesImgData,
  deleteCarStylesImglData,
  uploadCarStylesparamsData,
  deleteCarStylesparamsData,
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
    getCarStylesData();
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
  const [seriesId, setSeriesId] = useState(props.match.params.id);
  const [brandId, setBrandId] = useState(props.match.params.brandId);
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
  const getCarStylesData = async () => {
    // 获取文件列表
    const data = [];
    const result = await CarStylesData({
      seriesId: seriesId
    });
    if (result.result == "SUCCESS") {
      result.data.map(Element => {
        data.push({
          brandName: Element.name,
          itemList: Element,
          uid: Element.id,
          seriesid: Element.seriesid,
          name: "image.png",
          status: "done",
          imagePathList: Element.imagePathList,
          seriesId: Element.brandid
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
    getCarStylesData();
  };
  // 新增或编辑
  const editeSeriesimg = (Visible, title, id) => {
    if (title == "更新") {
      setId(id);
      fileList1.map(element => {
        if (element.uid == id) {
          setName(element.brandName);
          setonPriceChange(element.itemList.price);
          setonpreferenceChange(element.itemList.preference);
          setontimeToMarketChange(element.itemList.timeToMarket);
          element.itemList.paramList.forEach(item => {
            item.key = item.id;
          });
          setdataSource(element.itemList.paramList);
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
      // 编辑表格基础数据
      const formData1 = new FormData();
      formData1.append("brandid", brandId);
      formData1.append("seriesid", seriesId);
      formData1.append("Price", Price);
      formData1.append("preference", preference);
      formData1.append("timeToMarket", timeToMarket);
      formData1.append("name", name);
      formData1.append("id", id);
      const result = await uploadCarStylesBaseData(formData1);

      if (result.result == "SUCCESS") {
        // 图片上传
        const formData = new FormData();
        fileList3.forEach(file => {
          formData.append("carStylePics", file.originFileObj);
        });

        formData.append("carStyleId", result.data.styleid);
        await uploadCarStylesImgData(formData);
        // 参数上传
        console.log(dataSource);
        const params1 = [];
        const params2 = [];
        dataSource.forEach(Element => {
          if (Element.id) {
            //  修改
            params2.push({
              id: id,
              parameterName: Element.parameterName,
              parameterData: Element.parameterData,
              carsytleid: result.data.styleid
            });
          } else {
            //  新增
            params2.push({
              parameterName: Element.parameterName,
              parameterData: Element.parameterData,
              carsytleid: result.data.styleid
            });
          }
        });
        // 修改
        await uploadCarStylesparamsData(params1);
        // 新增
        await uploadCarStylesparamsData(params2);
      }
    } else {
      // 新增
      // 表格基础数据
      const formData1 = new FormData();
      formData1.append("brandid", brandId);
      formData1.append("seriesid", seriesId);
      formData1.append("Price", Price);
      formData1.append("preference", preference);
      formData1.append("timeToMarket", timeToMarket);
      formData1.append("name", name);
      const result = await uploadCarStylesBaseData(formData1);
      if (result.result == "SUCCESS") {
        // 图片上传
        const formData = new FormData();
        fileList3.forEach(file => {
          formData.append("carStylePics", file.originFileObj);
        });

        formData.append("carStyleId", result.data.styleid);
        await uploadCarStylesImgData(formData);
        // 参数上传
        console.log(dataSource);
        const params = [];
        dataSource.forEach(Element => {
          params.push({
            parameterName: Element.parameterName,
            parameterData: Element.parameterData,
            carsytleid: result.data.styleid
          });
        });
        await uploadCarStylesparamsData(params);
      }
    }
    setFileList3([]);
    setName("");
    setdataSource("");
    setonPriceChange("");
    setonpreferenceChange("");
    setontimeToMarketChange("");
    getCarStylesData();
  };
  // 弹窗撤销
  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList3([]);
    setName("");
    setdataSource("");

    setonPriceChange("");
    setonpreferenceChange("");
    setontimeToMarketChange("");
  };
  // 品牌名称变化
  const [Price, setonPriceChange] = useState("");
  const [preference, setonpreferenceChange] = useState("");
  const now = moment()
    .locale("zh-cn")
    .format("YYYY/MM/DD");
  const [timeToMarket, setontimeToMarketChange] = useState(now);
  const dateFormat = "YYYY/MM/DD";
  const onNameChange = e => {
    setName(e.target.value);
  };
  const onPriceChange = e => {
    setonPriceChange(e.target.value);
  };
  const onpreferenceChange = e => {
    setonpreferenceChange(e.target.value);
  };
  const ontimeToMarketChange = (date, dateString) => {
    console.log("date", dateString);
    setontimeToMarketChange(dateString);
  };
  // upload基础数据
  const goPage = id => {
    props.history.push("/uploadCar/carStyles/" + id);
  };
  // 车款参数信息
  const [count, setcount] = useState(2);
  // {
  //   key: "0",
  //   parameterName: "Edward King 0",
  //   parameterData: "32"
  // },
  // {
  //   key: "1",
  //   parameterName: "Edward King 1",
  //   parameterData: "32"
  // }
  const [dataSource, setdataSource] = useState([]);
  const column = [
    {
      title: "parameterName",
      dataIndex: "parameterName",
      width: "30%",
      editable: true
    },
    {
      title: "parameterData",
      dataIndex: "parameterData"
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null
    }
  ];

  // 车款参数
  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  const columns1 = [
    {
      title: "parameterName",
      dataIndex: "parameterName",
      width: "30%",
      editable: true
    },
    {
      title: "parameterData",
      dataIndex: "parameterData",
      editable: true
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null
    }
  ];
  const handleDelete = key => {
    dataSource.forEach(async Element => {
      if (Element.id && Element.key == key) {
        await deleteCarStylesparamsData([Element.id]);
      } else {
        const data = dataSource.filter(item => {
          return item.key !== key;
        });
        console.log("1212", dataSource);
        setdataSource(data);
      }
    });
  };
  const handleAdd = () => {
    const newData = {
      key: count,
      parameterName: "",
      parameterData: ""
    };
    setdataSource([...dataSource, newData]);
    setcount(count + 1);
    console.log("dataSource", dataSource);
  };
  const handleSave = row => {
    console.log("row", row);
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setdataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };
  const columns = columns1.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave
      })
    };
  });
  const handleBeforeupload = file => {
    return checkImageWH(file, 290, 160).catch(err => {
      //请求失败
      return Upload.LIST_IGNORE;

    });
  };
  return (
    <div>
      <h3>车款名称：</h3>
      <Modal
      
        title={title}
        width="800px"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>车款名称:</h3>
        <Input1
          className="TextInput"
          placeholder="请输入名称"
          value={name}
          onChange={onNameChange}
        />
        <h3>车款价格:</h3>
        <div className="flex">
          <Input1
            className="TextInput"
            placeholder="请输入车款价格"
            value={Price}
            onChange={onPriceChange}
          />
        </div>
        <h3>优惠幅度:</h3>
        <div className="flex">
          <Input1
            className="TextInput"
            placeholder="请输入优惠幅度"
            value={preference}
            onChange={onpreferenceChange}
          />
        </div>
        <h3>上市时间:</h3>
        <div className="flex">
          {/* <Input1
            className="TextInput"
            placeholder="请选择上市时间"
            value={timeToMarket}
            onChange={ontimeToMarketChange}
          /> */}

          <DatePicker
            className="TextInput"
            value={moment(timeToMarket, dateFormat)}
            format={dateFormat}
            onChange={ontimeToMarketChange}
          />
        </div>
        <div key={Math.random()} style={{marginTop:'20px'}}>
          <Upload
            className="leftPosiionbrand"
            // {...propsSeries}
            listType="picture-card"
            accept="image/*"
            action="#"
            multiple
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

        <h3>车款参数</h3>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16
          }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </Modal>

      <UploadComponentShow
      isNext={false}
        type="leftPosiionbrand"
        mult="true"
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
