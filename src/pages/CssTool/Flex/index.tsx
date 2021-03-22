// cssTool Flex
import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  InputNumber,
  Radio,
  RadioChangeEvent,
  Switch,
  message,
  Col,
  Row,
} from "antd";

// flex container interface
interface containerMap_row {
  "flex-direction": string[];
  "flex-wrap": string[];
  "justify-content": string[];
  "align-items": string[];
  "align-content": string[];
}

export default function index() {
  // 控制行数
  const [RowNum, setRowNum] = useState<number>(1);
  // 控制列数
  const [ColNum, setColNum] = useState<number>(10);
  const [Height, setHeight] = useState<number>(0);
  // Container 控制容器样式
  const [ContainerStyle, setContainerStyle] = useState<React.CSSProperties>({});
  // 控制 reflect
  const [SwitchReflect, setSwitchReflect] = useState<boolean>(true);
  // 对齐方式 justify
  const alignment_justify: string[] = [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
  ];
  // 对齐方式 align
  const alignment_align: string[] = [
    "flex-start",
    "flex-end",
    "center",
    "stretch",
  ];

  // flex容器的属性
  const containerMap_row: containerMap_row = {
    "flex-direction": ["row", "row-reverse", "column", "column-reverse"],
    "flex-wrap": ["nowrap", "wrap", "wrap-reverse"],
    "justify-content": [...alignment_justify],
    "align-items": [...alignment_align, "baseline"],
    "align-content": [...alignment_align, "space-between", "space-around"],
  };
  const itemMap_col: {} = {
    "align-self": ["auto", ...alignment_align],
  };
  const defaultValue: any = {
    "flex-direction": "row",
    "flex-wrap": "nowrap",
    "justify-content": "space-around",
    "align-items": "flex-end",
    "align-content": "center",
  };

  // 选项改变
  const handleChange_container = (key: string, e: RadioChangeEvent) => {
    let match = key.match(/(.+)-(.+)/),
      value: RegExpMatchArray;
    if (match != null) {
      value = match;
      let toUpper: string =
        value[2].charAt(0).toUpperCase() + value[2].slice(1);
      setContainerStyle((state) => ({
        ...state,
        ...{ [value[1] + toUpper]: e.target.value },
      }));
    }
  };
  //开关控制阴影
  const handleSwitch = (checked: boolean) => {
    setSwitchReflect(checked);
  };
  // 输入框输入值
  const handleInput = (e: string | number | null | undefined) => {
    if (typeof e === "number") {
      setHeight(e);
      console.log("ContainerStyle", !ContainerStyle);
      if (!ContainerStyle.flexWrap || ContainerStyle["flexWrap"] === "nowrap") {
        message.info(
          "如果需要查看align-content属性，需要设置flex-wrap不能为nowrap"
        );
      }
    }
  };
  const handleRowOrCol = (
    e: string | number | null | undefined,
    type: string
  ): void => {
    if (typeof e === "number") {
      switch (type) {
        case "row":
          setRowNum(e);
          break;
        case "col":
          setColNum(e);
          break;
      }
    }
  };
  return (
    <>
      {console.log("ContainerStyle :>> ", ContainerStyle)}
      {/* 控制区域 */}
      <div>
        <h2>容器:</h2>
        <div>
          {Object.entries(containerMap_row).map(([key, value]) => (
            <div key={key} className={styles["flex-control"]}>
              <span className="font-16 font-w-b">{key}:</span>
              <div>
                <Radio.Group
                  defaultValue={defaultValue[key]}
                  buttonStyle="solid"
                  onChange={(element) => handleChange_container(key, element)}
                >
                  {value.map((e: string) => (
                    <Radio.Button value={e} key={e}>
                      {e}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
            </div>
          ))}
          <div>
            <Row gutter={16}>
              <Col span={6}>
                <span className="font-16 font-w-b">
                  容器高度(align-content)：
                </span>
                <InputNumber
                  min={0}
                  max={200}
                  defaultValue={0}
                  onChange={handleInput}
                />
                <span className="font-16 font-w-b"> vh</span>
              </Col>
              <Col span={2} />
              <Col span={4}>
                <span className="font-16 font-w-b">行数(row)：</span>
                <InputNumber
                  min={0}
                  max={100}
                  defaultValue={typeof RowNum === 'number' ? RowNum : 0}
                  onChange={(e) => handleRowOrCol(e, "row")}
                />
              </Col>
              <Col span={6}>
                <span className="font-16 font-w-b">列数(col)：</span>
                <InputNumber
                  min={0}
                  max={100}
                  defaultValue={typeof ColNum === 'number' ? ColNum : 0}
                  onChange={(e) => handleRowOrCol(e, "col")}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* 显示区域 */}
      <div className={styles["flex-box"]}>
        <div className={styles["flex-box_switch"]}>
          <Switch defaultChecked onChange={handleSwitch} />
        </div>
        {new Array(RowNum).fill("").map((_e, i) => (
          <div
            className={styles["flex-box_row"]}
            key={`row-${i}`}
            style={{
              height: Height == 0 ? "100%" : Height + "vh",
              ...ContainerStyle,
            }}
          >
            {new Array(ColNum).fill("").map((_e, i) => (
              <div
                className={[
                  styles["flex-box_col"],
                  SwitchReflect ? styles["ON"] : styles["OFF"],
                ].join(" ")}
                key={`col-${i}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
