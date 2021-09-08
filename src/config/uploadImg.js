import { Modal } from "antd";
//checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject阻止图片上传
export function checkImageWH(file, width, height) {
  return new Promise(function(resolve, reject) {
    let filereader = new FileReader()
    filereader.onload = e => {
      let src = e.target.result
      const image = new Image()
      image.onload = function() {
        if (width && this.width / this.height !== width / height) {
          // debugger
          Modal.error({
            // title: '上传图片的宽高不符合要求，请重传',
            title: '请上传宽为' + width + '高为' + height + '的图片',
          })
          reject(1)
          // } else if (height && this.height !== height) {
          //   Modal.error({
          //     title: '请上传高为' + height + '的图片',
          //   })
          //   reject()
        } else {
          resolve()
        }
      }
      image.onerror = reject
      image.src = src
    }
    filereader.readAsDataURL(file)
  })
}