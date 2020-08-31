import http from "../utils/http.js";
// 学习笔记 首页至今进
export async function notes(req, reqToken, reqPageSize, reqPageNumber, reqPhone) {
    const res = await http({
        method: 'get',
        url: req + "/course/courseNote/getNotes?filter=&TOKEN=" + reqToken + "&pageSize=" + reqPageSize + "&pageNumber=" + reqPageNumber + "&_=" + reqPhone
    })
    return res;
}
// 视频中进 http://wsdx.sgcc.com.cn/api/course/courseNote/getPageData?filter={%22courseId%22:%222c9388166fc2478901700e431d660000%22}&TOKEN=1c7b4b25-b865-4cf2-8fc1-f3afcc3b4698&pageSize=20&pageNumber=1&_=1596437135910
export async function notesVideo(req, reqId, reqToken, reqPageSize, reqPageNumber, reqPhone) {
    const res = await http({
        method: 'get',
        url: req + "/course/courseNote/getPageData?filter={courseId:" + reqId + "}&TOKEN=" + reqToken + "&pageSize=" + reqPageSize + "&pageNumber=" + reqPageNumber + "&_=" + reqPhone
    })
    return res;
}
// // 修改笔记 items: [{noteId: "2c938841710341980171401d12020002", noteContent: "课程很有意思"}]
export async function editNotes(reqHttp, reqToken, req) {
    const res = await http({
        method: 'post',
        url:  reqHttp + "/course/courseNote/update?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// 删除笔记
export async function deleteNotes(reqHttp, reqId, reqToken, req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/courseNote/delete/" + reqId + "?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// // 分享笔记
export async function shareNotes(reqHttp, reqId, reqToken, req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/courseNote/share/" + reqId + "?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// // 取消分享
export async function cancelshareNotes(reqHttp, reqId, reqToken, req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/courseNote/cancelshare/" + reqId + "?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// 添加笔记http://wsdx.sgcc.com.cn/api/course/courseNote/save?TOKEN=1c7b4b25-b865-4cf2-8fc1-f3afcc3b4698
// {items: [{courseId: "2c9388166fc2478901700e431d660000", noteContent: "123"}]}
export async function addNotes(reqHttp, reqToken, req) {
    const res = await http({
        method: 'post',
        url:  reqHttp + "/course/courseNote/save?TOKEN=" + reqToken,
        data: req
    })
    return res;
}