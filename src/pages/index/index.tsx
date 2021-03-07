import React, { useState } from "react";
import {
  Upload,
  message,
  Image as Img,
  Button,
  Slider,
  InputNumber,
  Row,
  Col,
  Spin,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { RcFile, UploadProps } from "antd/lib/upload";
import styles from "./index.module.scss";
const { Dragger } = Upload;
import { canvasDataURL, calc, rand } from "@/common/utils";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function index() {
  // 文件列表
  const [fileListState, setFileListState] = useState<RcFile[]>([]);
  // 压缩率控制
  const [IntegerStep, setIntegerStep] = useState<number>(50);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);
  const UploadProps: UploadProps = {
    name: "file",
    multiple: true,
    listType: "picture",
    action: "/",
    showUploadList: false,
    onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file: RcFile) => {
      canvasDataURL(
        file,
        (blob: Blob, base64: any) => {
          let uploadFile: any = new File([blob], file.name, {
            type: file.type,
          });
          uploadFile.uid = file.uid;
          uploadFile.src = base64;
          uploadFile.originalSize = file.size;
          setFileListState((state) => [...state, uploadFile]);
        },
        calc.division(IntegerStep, 100)
      );
      return false;
    },
  };
  // 下载全部按钮
  const handelDownload: Function = (): void => {
    if (fileListState.length === 0) {
      message.error("你还没添加文件呢");
      return;
    }
    setLoading(true);
    download(fileListState);
  };
  // 控制压缩率
  const handelSliderChange = (e: string | number | null | undefined): void => {
    if (typeof e === "number") setIntegerStep(e);
  };

  //下载
  const download = (imgList: Array<RcFile>): void => {
    const zip = new JSZip();
    let file_name = "download.zip";
    let imageFolder: any = zip.folder("image");
    let nameList: string[] = [];
    imgList.forEach((item: any, index: number, array: Array<RcFile>) => {
      file_name = "";
      let img: any = new Image();
      img.setAttribute("crossOrigin", "Anonymous");
      let url = URL.createObjectURL(item);
      img.src = url;
      // 检测图片名字
      let name: string = item.name;
      if (nameList.includes(name)) {
        name = `${name.slice(0, name.lastIndexOf("."))}-${String(
          new Date().valueOf() + rand()
        )}${name.slice(name.lastIndexOf("."))}`;
      }
      nameList.push(name);

      // 生成图片
      // TODO: 更换方法
      img.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx: any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        let imgData = canvas.toDataURL();
        let img_arr = imgData.split(",");
        imageFolder.file(name, img_arr[1], {
          base64: true,
        });
        URL.revokeObjectURL(url);
        if (index + 1 === array.length) {
          zip.file("README.md", "# 如果此网站使用的还可以请给个star，谢谢!!!");
          zip
            .generateAsync({ type: "blob" })
            .then(function (content) {
              message.info("下载中");
              saveAs(content, file_name);
              setLoading(false);
            })
            .catch((err) => {
              message.error("下载失败");
              setLoading(true);
            });
        }
      };
    });
  };

  return (
    <Spin spinning={loading}>
      {/* 功能选择区 */}
      <div className={styles["index-tool"]}>
        <Row align="middle">
          <Col span={1}>压缩率: </Col>
          <Col span={10}>
            <Slider
              min={1}
              max={100}
              onChange={handelSliderChange}
              value={typeof IntegerStep === "number" ? IntegerStep : 0}
            />
          </Col>
          <Col span={2}>
            <InputNumber
              min={1}
              max={100}
              style={{ margin: "0 16px" }}
              value={IntegerStep}
              onChange={handelSliderChange}
            />
          </Col>
          <Col span={2}>
            <Button onClick={() => handelDownload()}>下载全部</Button>
          </Col>
        </Row>
      </div>
      <Dragger {...UploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽图片到此区域</p>
      </Dragger>
      {/* 显示处理完的图片列表 */}
      <div className={styles["index-list"]}>
        {fileListState.map((e: any) => (
          <div key={e.uid}>
            <Img width={200} src={e.src} />
            <div>{e.name}</div>
            <div>原始大小：{calc.fileSize(e.originalSize)}MB</div>
            <div>压缩后大小：{calc.fileSize(e.size)}MB</div>
            <a href={e.src} download={e.name}>
              下载
            </a>
          </div>
        ))}
      </div>
    </Spin>
  );
}
