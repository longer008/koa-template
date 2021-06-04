const os = require('os');

/**
 * 获取当前机器的ip地址
 */
export function getIpAddress() {
  var networkFaces=os.networkInterfaces()

  for (var dev in networkFaces) {
    let networkFace = networkFaces[dev]

    for (let i = 0; i < networkFace.length; i++) {
      let {family, address, internal} = networkFace[i]

      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return address
      }
    }
  }
}

