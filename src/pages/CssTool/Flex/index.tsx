// cssTool Flex
import React, { useState } from "react";
import styles from "./index.module.scss";
import { Radio } from "antd";
import { Interface } from "readline";

export default function index() {
  // 控制行数
  const [RowNum, setRowNum] = useState<number>(2);
  // 控制列数
  const [ColNum, setColNum] = useState<number>(5);
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
  // flex container interface
  interface containerMap_row {
    "flex-direction": string[];
    "flex-wrap": string[];
    "justify-content": string[];
    "align-items": string[];
    "align-content": string[];
  }
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
  return (
    <>
      {/* 控制区域 */}
      <div>
        <h2>容器:</h2>
        <div>
          {Object.entries(containerMap_row).map(([key, value]) => (
            <div key={key} className={styles['flex-control']}>
              <span className='font-16 font-w-b'>{key}:</span>
              <div>
                <Radio.Group defaultValue={value[0]} buttonStyle="solid">
                  {value.map((e: string) => (
                    <Radio.Button value={e} key={e}>
                      {e}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 显示区域 */}
      <div className={styles["flex-box"]}>
        {new Array(RowNum).fill("").map((_e, i) => (
          <div className={styles["flex-box_row"]} key={`row-${i}`}>
            {new Array(ColNum).fill("").map((_e, i) => (
              <div className={styles["flex-box_col"]} key={`col-${i}`}>
                {i + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
