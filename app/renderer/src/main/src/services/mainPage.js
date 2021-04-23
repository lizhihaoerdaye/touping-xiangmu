import request from '../utils/request';
import {baseUrl} from '../services/baseUrl';

// 获取标题
export function getHeader(){
    return request.get(`${baseUrl}/introduction/getHeader`)
}

// 获取介绍
export function getIntroduction(){
    return request.get(`${baseUrl}/introduction/getIntroduction`)
}

// 获取主页面窗口
export function getMainWins(params){
    return request.get(`${baseUrl}/window/getMainWins`)
}

// 最大化窗口
export function postSetFullScreen(params){
    return request.post(`${baseUrl}/window/setFullScreen`,{data:params})
}

// 窗口恢复正常
export function postCloseFullScreen(params){
    return request.post(`${baseUrl}/window/closeFullScreen`,{data:params})
}