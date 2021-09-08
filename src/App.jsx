import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import "./App.less";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
// 引入页面组件
import MyConpaign from "./pages/myCampaign";
import UploadCar from "./pages/uploadCar";
import CreateCampaign from "./pages/createCampaign";
import BrandDetail from "./pages/uploadCar/brandDetail";
import CarSeries from "./pages/uploadCar/carSeries";
import CarStyles from "./pages/uploadCar/carStyles";
import leftMenuImg from "./assets/images/zp9.png";
import MenuComponent from "./components/menu";

const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Sider>
            <div className="leftMenuTitle">享有车</div>
            <div className="loginInfo">
              <div className="img1">
                <img src={leftMenuImg} alt="" />
              </div>
              <div className="name">Hunter</div>
              <div className="address">钟难街江山路旗舰店</div>
            </div>
            <MenuComponent></MenuComponent>
          </Sider>
          <Layout>
            <Header>
              <div className="header">
                <div className="headerInfo">Hi Hunter，欢迎来到享有车后台</div>
                <div>
                  <div className="headerCity">北京市</div>
                  <div className="headerMess">通知</div>
                </div>
              </div>
            </Header>
            <Content>
              <Switch>
                <Redirect from="/" exact to="/uploadFocusData" />
                <Route path="/myCampaign" component={MyConpaign}></Route>
                <Route path="/uploadCar/main" component={UploadCar}></Route>
                <Route path="/uploadCar/brandDetail/:id" component={BrandDetail}></Route>
                <Route path="/uploadCar/carSeries/:id" component={CarSeries}></Route>
                <Route path="/uploadCar/carStyles/:brandId/:id" component={CarStyles}></Route>
                
                <Route
                  path="/createCampaign"
                  component={CreateCampaign}
                ></Route>
                
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
