/*
 * @description: 公用方法
 */

//文件压缩
const canvasDataURL = (
  file: File,
  callback: Function,
  quality: number = 0.7
): void => {
  //压缩转化为base64
  var reader = new FileReader(); //读取文件的对象
  reader.readAsDataURL(file); //对文件读取，读取完成后会将内容以base64的形式赋值给result属性
  reader.onload = function (e) {
    //读取完成的钩子
    const img: any = new Image();
    const canvas = document.createElement("canvas");
    const drawer: any = canvas.getContext("2d");
    let base64: any = this.result;
    img.src = this.result;
    //图片压缩转码
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
      convertBase64UrlToBlob(
        canvas.toDataURL("image/jpeg", quality),
        callback,
        base64
      );
    };
  };
};

// base64转文件
const convertBase64UrlToBlob = (
  urlData: String,
  callback: Function,
  base64: string
): void => {
  //将base64转化为文件格式
  const arr: any = urlData.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]); //atob方法用于解码base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  callback(
    new Blob([u8arr], {
      type: mime,
    }),
    base64
  );
};

// 计算文件大小 MB
const calcFileSize = (
  size: number | string,
  capacity: number = 1048576
): string => {
  if (!size) return String(size);
  let numSize: number = Number(size);
  return parseFloat(String(calcDiv(numSize, capacity))).toFixed(4);
};

//乘法精度
const calcMul = (num: number, num2: number): number => {
  var m = 0,
    s1 = num.toString(),
    s2 = num2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};
// 除法精度
const calcDiv = (num: number, num2: number): number => {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = num.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = num2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(num.toString().replace(".", ""));
  r2 = Number(num2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};
// 加法精度
const calcAdd = (num: number, num2: number): number => {
  var r1, r2, m;
  try {
    r1 = num.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (num * m + num2 * m) / m;
};
// 减法精度
const calcSub = (num: number, num2: number): string => {
  var r1, r2, m, n;
  try {
    r1 = num.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((num * m - num2 * m) / m).toFixed(n);
};
// 随机数生成
const rand = (min: number = 1000, max: number = 99999): string => {
  //随机数
  return String(Math.floor(Math.random() * (max - min)) + min);
};

const calc = {
  add: calcAdd,
  division: calcDiv,
  subtraction: calcSub,
  multiplication: calcMul,
  fileSize: calcFileSize,
};
export { canvasDataURL, calcFileSize, calc, rand };
