import request from '../utils/request';
import {baseUrl} from '../services/baseUrl';

// 获取标题
export function getHeader(){
    return request.get(`${baseUrl}/introduction/getHeader`)
}

// 更新标题
export function postHeader(params){
    return request.post(`${baseUrl}/introduction/updateIntroduction`,{data:params})
}


// 获取介绍
export function getIntroduction(){
    return request.get(`${baseUrl}/introduction/getIntroduction`)
}

// 更新介绍
export function postIntroduction(params){
    return request.post(`${baseUrl}/introduction/updateIntroduction`,{data:params})
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


// 获取所有视频源
export function getVideoSources(params){
    return request.get(`${baseUrl}/videoSource/getVideoSources`)
}

// 更新视频源
export function postUpdateVideoSources(params){
    return request.post(`${baseUrl}/videoSource/updateVideoSources`,{data:params})
}

// 窗口更换视频源
export function postSwitchSignal(params){
    return request.post(`${baseUrl}/window/switchSignal`,{data:params})
}

// 关闭屏幕
export function postCloseScreen(){
    return request.post(`${baseUrl}/serail/off`)
}

// 打开屏幕
export function postOpenScreen(){
    return request.post(`${baseUrl}/serail/on`)
}

// 打开屏幕
export function postInitWindow(){
    return request.post(`${baseUrl}/window/initWindow`)
}

// 获取两分屏页面窗口
export function getSplitScreenWins(params){
    return request.get(`${baseUrl}/window/getSplitScreenWins`)
}


// 切换为两分屏
export function postSetSplitScreen(params){
    return request.post(`${baseUrl}/window/setSplitScreen` )
}

// 关闭两分屏
export function postCloseSplitScreen(params){
    return request.post(`${baseUrl}/window/closeSplitScreen` )
}