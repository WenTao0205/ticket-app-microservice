import COS from 'cos-js-sdk-v5'

export const uploadPic = async (file, fileName) => {
  const cos = new COS({
    SecretId: 'AKIDKUTP4TcaK7gBUcWEj8KWoreHn7BF5IKA',
    SecretKey: 'qUs04ziEUK0Rc6KNArOipmU8dtzsXwHQ'
  })

  return new Promise((resolve, reject) => {
    cos.uploadFile({
      Bucket: 'ticketing-app-1317423947',
      Region: 'ap-guangzhou',
      Key: fileName,
      Body: file,
      SliceSize: 1024 * 1024 * 4,
      onProgress: progressData => {
        console.log(JSON.stringify(progressData))
      },
      onFileFinish: function (err, data, options) {
        console.log(options.Key + '上传' + (err ? '失败' : '完成'));
      },
    }, (err, data) => {
      resolve(data)
      reject(err)
    })
  })
}

export const deletePic = async (fileName) => {
  const cos = new COS({
    SecretId: 'AKIDKUTP4TcaK7gBUcWEj8KWoreHn7BF5IKA',
    SecretKey: 'qUs04ziEUK0Rc6KNArOipmU8dtzsXwHQ'
  })

  return new Promise((resolve, reject) => {
    cos.deleteObject({
      Bucket: 'ticketing-app-1317423947',
      Region: 'ap-guangzhou',
      Key: fileName
    }, (err, data) => {
      resolve(data)
      reject(err)
    })
  })
}