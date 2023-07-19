import request from '@/utils/request'

function getIp() {
  return request.post('/ip')
}

export default {
  getIp,
}
