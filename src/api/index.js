/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from "jsonp";
import { message } from "antd";
import ajax from "./ajax";

const BASE = "";
// const BASE = 'http://s686.nat300.top'
// 查看焦点图
export const carouselData = () => {
  return ajax(BASE + "/car/focal/focals", {}, "GET");
};
// 删除焦点图
export const deletecarouselData = a => {
  console.log("delete焦点图", a, JSON.stringify(a));
  return ajax(BASE + "/car/focal/delete", JSON.stringify(a), "POST");
};
//上传焦点图
export const uploadcarouselData = file => {
  console.log("上传焦点图", file);
  return ajax(BASE + "/car/focal/save", file, "POST");
};
// 查看品牌
export const brandData = () => {
  return ajax(BASE + "/car/brand/brands", {}, "GET");
};
// 删除品牌
export const deletebrandlData = a => {
  console.log("slkdcslck", a);
  return ajax(BASE + "/car/brand/delete", a, "DELETE");
};
//上传品牌
export const uploadbrandData = file => {
  return ajax(BASE + "/car/brand/save", file, "POST");
};
//更新品牌
export const updatebrandData = file => {
  return ajax(BASE + "/car/brand/update", file, "POST");
};
// 品牌专区

// 查看
export const zonesData = brandId => {
  return ajax(BASE + "/car/brand_zone/brand_zones", { brandId }, "GET");
};
// 删除
export const deletezonesData = a => {
  return ajax(BASE + " /car/brand_zone/delete", a, "POST");
};
//上传
export const uploadzonesData = file => {
  return ajax(BASE + "/car/brand_zone/save", file, "POST");
};
// 车系相关
// 查看车系
export const CarseriesData = (series) => {
  return ajax(BASE + "/car/series/brand_series", series, "GET");
};
// 删除车系
export const deleteCarserieslData = a => {
 
  return ajax(BASE + "/car/series/delete", a, "DELETE");
};
//上传车系
export const uploadCarseriesData = file => {
  return ajax(BASE + "/car/series/save", file, "POST");
};
//更新车系
export const updateCarseriesData = file => {
  return ajax(BASE + "/car/series/update", file, "POST");
};



// 车款相关
// 获取该车系下所有车款
export const CarStylesData = (series) => {
  return ajax(BASE + "/car/style/models", series, "GET");
};
// 新增或修改 车款基础信息
export const uploadCarStylesBaseData = basedata => {
  return ajax(BASE + "/car/style/save", basedata, "POST");
};
// 根据车款id新增车款图片
export const uploadCarStylesImgData = imgdata => {
  return ajax(BASE + "/car/style/save/images", imgdata, "POST");
};
// 根据车系id删除车款图片
export const deleteCarStylesImglData = a => {
  return ajax(BASE + "/car/style/delete/images", a, "POST");
};
// 新增或修改车款的参数
export const uploadCarStylesparamsData = basedata => {
  return ajax(BASE + "/car/style/save/params", basedata, "POST");
};
//根据车款参数id删除车款参数
export const deleteCarStylesparamsData = basedata => {
  return ajax(BASE + "/car/style/delete/params", basedata, "POST");
};