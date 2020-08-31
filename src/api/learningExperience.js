import http from "../utils/http.js";
// // 学习心得
export async function experience(req, reqToken, reqPageSize, reqPageNumber, reqPhone) {
    const res = await http({
        method: 'get',
        url: req + "/course/userHarvest/getHarvests?filter=&TOKEN=" + reqToken + "&pageSize=" + reqPageSize + "&pageNumber=" + reqPageNumber + "&_=" + reqPhone
    })
    return res;
}
// 视频跳转学习心得
// http://wsdx.sgcc.com.cn/api/course/userHarvest/getPageData?filter={%22courseId%22:%222c9388166fc2478901700e431d660000%22}&TOKEN=1c7b4b25-b865-4cf2-8fc1-f3afcc3b4698&pageSize=20&pageNumber=1&_=1596439276184
export async function experienceVideo(req, reqid, reqToken, reqPageSize, reqPageNumber, reqPhone) {
    const res = await http({
        method: 'get',
        url: req + "/course/userHarvest/getPageData?filter={courseId:" + reqid + "}&TOKEN=" + reqToken + "&pageSize=" + reqPageSize + "&pageNumber=" + reqPageNumber + "&_=" + reqPhone
    })
    return res;
}
// 编辑心得
export async function editExperience(reqHttp, reqToken, req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/userHarvest/update?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
//删除心得
export async function deleteExperience(reqHttp, reqId, reqToken, req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/userHarvest/delete/" + reqId + "?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// // 分享心得
export async function shareExperience(reqHttp, reqId, reqToken, req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/userHarvest/share/" + reqId + "?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// 取消分享
export async function cancelShareExperience(reqHttp, reqId, reqToken, req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/userHarvest/cancelshare/" + reqId + "?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// // 创建心得 	"items": [{"courseId": ["2c9388166bad7697016bbb8047be0007"], "harvestTitle": "123", "harvestContent": "很好1"}]
export async function addExperience(reqHttp, reqToken, req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/userHarvest/save?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// http://wsdx.sgcc.com.cn/api/course/userHarvest/save?TOKEN=03c626a7-bb37-4086-bc8d-6caf10001d8b