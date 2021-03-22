import React, { Suspense, lazy } from "react";

import { Menu, Skeleton, Button } from "antd";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  PictureOutlined,
  EditOutlined,
  ToolOutlined,
  TableOutlined,
} from "@ant-design/icons";

// 首页-图片处理
const Index = lazy(() => import("@/pages/index"));
// import Index from '@/pages/index'
// 速记
const Shorthand = lazy(() => import("@/pages/Shorthand"));
// import Shorthand from '@/pages/Shorthand'

// 颜色处理
const Color = lazy(() => import("@/pages/Color"));
// import Color from '@/pages/Color'

//#region  css测试工具
// flex
const Flex = lazy(() => import("@/pages/CssTool/Flex"));
// import Flex from '@/pages/CssTool/Flex'

//#endregion
import styles from "./index.module.scss";

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
      <>
        <Router>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* logo占位 */}
            <div>
              <Link to="/" className={styles['none']}>首页</Link>
            </div>
            {/* 图片压缩 */}
            <Menu.Item key="compress" icon={<PictureOutlined />}>
              <Link to="/">图片处理</Link>
            </Menu.Item>
            {/* 速录,用于快速记录 */}
            <Menu.Item
              key="shorthand"
              title="还未开发哦"
              icon={<EditOutlined />}
            >
              <Link to="/shorthand">速记</Link>
            </Menu.Item>
            {/* 基本工具 */}
            <SubMenu
              key="tool"
              icon={<ToolOutlined />}
              title="实用工具"
              disabled
            >
              <Menu.Item key="color" disabled title="还未开发哦">
                <Link to="/color">拾色器</Link>
              </Menu.Item>
              <Menu.Item key="ruler" disabled title="还未开发哦">
                尺寸测量
              </Menu.Item>
              <Menu.ItemGroup title="待开发">
                <Menu.Item key="paintings" disabled title="还未开发哦">
                  画板
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            {/* css 布局和样式快速查看 */}
            <SubMenu
              key="css-tool"
              icon={<TableOutlined />}
              title="CSS 测试工具"
            >
              <Menu.ItemGroup title="布局">
                <Menu.Item key="flex">
                  <Link to="/css-tool/flex">flex</Link>
                </Menu.Item>
                <Menu.Item key="grid" disabled title="还未开发哦">
                  grid
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="样式">
                <Menu.Item key="shadow" disabled title="还未开发哦">
                  阴影
                </Menu.Item>
                <Menu.Item key="filter" disabled title="还未开发哦">
                  滤镜
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
          <main className={styles.content}>
            <Suspense fallback={<Skeleton active />}>
              <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/shorthand" exact component={Shorthand} />
                {/* 基本工具 begin */}
                <Route path="/color" exact component={Color} />

                {/* css测试工具 begin */}
                <Route path={`/css-tool`} exact component={Flex} />
                <Route path={`/css-tool/flex`} exact component={Flex} />
                {/* css测试工具 end */}
                <Route path="*" component={Index} />
              </Switch>
            </Suspense>
          </main>
          <div className={styles["footer"]}>
            <div>© 2021 
            <Button
                type="link"
                href="https://github.com/magicNull"
                target="_block"
              >
                Magic
              </Button>
            </div>
            <div>
              GitHub:
              <Button
                type="link"
                href="https://github.com/magicNull/magic-tool"
                target="_block"
              >
                magic-tool
              </Button>
            </div>
            
          </div>
        </Router>
      </>
    );
  }
}
