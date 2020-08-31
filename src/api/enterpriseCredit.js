import http from "../utils/http.js";
// // 总课时
export async function classHourTotal(req, reqToken) {
    const res = await http({
        method: 'get',
        url: req + "/statement/course/getAnnualAssessmentTime?TOKEN=" + reqToken
    })
    return res;
}
// // 已修课时
export async function classHouralready(reqHttp, reqTime, reqToken) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/statement/course/getEarnedPeriod/" + reqTime + "?TOKEN=" + reqToken
    })
    return res;
}
// // 必修课时
export async function classHourcompulsory(reqHttp, reqToken) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/resourcemanage/course/getCourseTotalTime?TOKEN=" + reqToken
    })
    return res;
}
// // 选修课时
export async function classHourelective(reqHttp, reqKey, reqToken) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/resourcemanage/course/getFinishedTimeAndTotalTime/" + reqKey + "?TOKEN=" + reqToken
    })
    return res;
}
// 微课 http://wsdx.sgcc.com.cn/api/resourcemanage/course/getMicCourses?TOKEN=a46116c2-a5f2-434d-b67b-1bb272b4da8d   getCatalogCourses
// export async function micCourses(reqHttp, reqToken) {
//     const res = await http({
//         method: 'get',
//         url: reqHttp + "/resourcemanage/course/getMicCourses?TOKEN=" + reqToken
//     })
//     return res;
// }
// http://wsdx.sgcc.com.cn/api/resourcemanage/course/getCatalogCourses/3?TOKEN=c5a99cf6-e186-4469-91f4-83e98e223671
export async function micCourses(reqHttp, reqToken) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/resourcemanage/course/getCatalogCourses/3?TOKEN=" + reqToken
    })
    return res;
}
// 微课分类 http://wsdx.sgcc.com.cn/api/resourcemanage/course/getUserStudyCourseByCatalog/2c938816731fe32401739ea4ff780003?filter=null&TOKEN=c5a99cf6-e186-4469-91f4-83e98e223671&pageSize=5&pageNumber=1&_=1596425248369
// classification
export async function classification(reqHttp, reqId, reqToken, pageSize, pageNumber, phone) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/resourcemanage/course/getUserStudyCourseByCatalog/" + reqId + "?filter=null&TOKEN=" + reqToken + "&pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&_=" + phone
    })
    return res;
}