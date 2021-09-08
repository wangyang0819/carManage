import React,{useState} from 'react'
import { Menu, } from "antd";
import {Link,withRouter} from 'react-router-dom';
import './index.less'
 function MenuComponent(props) {
  const [collapsed,setCollapsed] =useState(false) 
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  };
  return (
    <div style={{ width: 200 }}>
         <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1">
          <Link to='/myCampaign'>我的活动</Link>
            
          </Menu.Item>
          <Menu.Item key="2">
          <Link to='/uploadCar/main'>上传展车</Link>

            
          </Menu.Item>
          <Menu.Item key="3" >n
          <Link to='/createCampaign'>创建活动</Link>

            
          </Menu.Item>
         </Menu>
     
    </div>
  )
}
export default MenuComponent
