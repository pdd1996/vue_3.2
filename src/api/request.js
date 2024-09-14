import axios from 'axios'

const service = axios.create({
  // 基础路径
  baseURL: '',
  timeout: 5000
})

export default service
