import React from "react";
import { Menu } from "antd";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  PictureOutlined,
  EditOutlined,
  ToolOutlined,
  TableOutlined,
} from "@ant-design/icons";

import Index from "@/pages/index";
import Shorthand from "@/pages/Shorthand";
import Color from "@/pages/Color";
import styles from './index.module.scss'
const { SubMenu } = Menu;

export default class Layout extends React.Component {
  state = {
    current: "compress",
  };
  componentDidMount() {
    const path = window.location.pathname.slice(1);
    this.setState({ current: path });
    console.log("window.href :>> ", path);
  }
  handleClick = (e: { key: any }) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Router>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* logo占位 */}
          <Menu.Item>LOGO</Menu.Item>
          {/* 图片压缩 */}
          <Menu.Item key="compress" icon={<PictureOutlined />}>
            <Link to="/">图片处理</Link>
          </Menu.Item>
          {/* 速录,用于快速记录 */}
          <Menu.Item key="shorthand" icon={<EditOutlined />}>
            <Link to="/shorthand">速记</Link>
          </Menu.Item>
          {/* 基本工具 */}
          <SubMenu key="tool" icon={<ToolOutlined />} title="实用工具">
            <Menu.Item key="color">
              <Link to="/color">拾色器</Link>
            </Menu.Item>
            <Menu.Item key="ruler">尺寸测量</Menu.Item>
            <Menu.ItemGroup title="待开发">
              <Menu.Item key="paintings" disabled title="还未开发哦">
                画板
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          {/* css 布局和样式快速查看 */}
          <SubMenu key="cssTool" icon={<TableOutlined />} title="CSS 测试工具">
            <Menu.ItemGroup title="布局">
              <Menu.Item key="flex">flex</Menu.Item>
              <Menu.Item key="grid">grid</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="样式">
              <Menu.Item key="shadow">阴影</Menu.Item>
              <Menu.Item key="filter">滤镜</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <main className={styles.content}>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/shorthand" exact component={Shorthand} />
            {/* 基本工具 begin */}
            <Route path="/color" exact component={Color} />
            <Route path="*" component={Index} />
          </Switch>
        </main>
      </Router>
    );
  }
}
