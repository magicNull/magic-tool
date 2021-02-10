import React, { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
const { Dragger } = Upload;

export default function index() {
  const [fileListState, setFileListState] = useState<RcFile[]>([]);
  const props = {
    name: "file",
    multiple: true,
    action: "/",
    onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file: RcFile) => {
      setFileListState((state) => [...state, file]);
      return false;
    },
  };
  return (
    <div>
      {fileListState.length}
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽图片到此区域</p>
      </Dragger>
    </div>
  );
}
