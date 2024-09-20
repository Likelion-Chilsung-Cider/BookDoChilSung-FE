import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://bookdochilsung-env.ap-northeast-2.elasticbeanstalk.com', // API 서버 주소
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
