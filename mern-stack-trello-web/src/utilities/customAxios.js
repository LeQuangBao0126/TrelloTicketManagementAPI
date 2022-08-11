import axios from 'axios'
import {toast }   from 'react-toastify';


let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// Kỹ thuật dùng javascript kết hợp css pointer-event để chặn user click nhanh tại bất kỳ chỗ nào có hành động click gọi api
// Đây là một kỹ thuật rất hay mà không phải dev nào cũng biết.
const updateSendingStatus = (sending = true) => {
  const submits = document.querySelectorAll('.tqd-send')
  for (let i = 0; i < submits.length; i++) {
    if (sending) submits[i].classList.add('tqd-waiting')
    else submits[i].classList.remove('tqd-waiting')
  }
}

authorizedAxiosInstance.interceptors.request.use((config) => {
    // măc định của axios 200 -> 299 , 
    // them mã điều hướng 302 nữa
    config.validateStatus = (status)=>{
        return (status >= 200 && status < 300) || status === 302
    }
    updateSendingStatus(true) // nhớ thêm class tqd-send vào button add card
    return config
}, (error) => {
    return Promise.reject(error)
})

authorizedAxiosInstance.interceptors.response.use((response) => {
    // chuyển hướng url từ phía backend nếu cần
    if(response?.status === 302) {
        location.replace(response?.headers?.location)
    }
    updateSendingStatus(false)
    return response
}, (error) => {
    updateSendingStatus(false)
    let errorMessage = error?.message
    if (error?.response?.data?.errors) {
        errorMessage = error?.response?.data?.errors
    }
    toast(errorMessage)
    return Promise.reject(error)
})

export default authorizedAxiosInstance