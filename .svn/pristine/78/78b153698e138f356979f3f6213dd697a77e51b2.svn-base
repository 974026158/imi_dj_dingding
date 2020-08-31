import http from "../utils/http.js";
export async function finishedCourses(req, reqToken) {
    const res = await http({
        method: 'get',
        url: req + "/resourcemanage/course/getFinishedCourses?TOKEN=" + reqToken
    })
    return res;
}
export async function unFinishedCourses(req, reqToken) {
    const res = await http({
        method: 'get',
        url: req + "/resourcemanage/course/getUnfinishedCourses?TOKEN=" + reqToken
    })
    return res;
}
export async function catalogCourses(req, reqId, reqToken) {
    const res = await http({
        method: 'get',
        url: req + "/resourcemanage/course/getCatalogCourses/" + reqId + "?TOKEN=" + reqToken
    })
    return res;
}
export async function countAndTime(req, reqId, reqToken) {
    const res = await http({
        method: 'get',
        url: req + "/resourcemanage/course/getCountAndTime/" + reqId + "?TOKEN=" + reqToken
    })
    return res;
}
//http://wsdx.sgcc.com.cn/api/resourcemanage/course/getUserStudyCourseByCatalog/" + this.catalogId + "?TOKEN=" + this.$token + "&pageSize=5&pageNumber=1"
export async function studyCourseByCatalog(req, reqId, reqToken, pageSize, pageNumber) {
    const res = await http({
        method: 'get',
        url: req + "/resourcemanage/course/getUserStudyCourseByCatalog/" + reqId + "?TOKEN=" + reqToken + "&pageSize=" + pageSize + "&pageNumber=" + pageNumber
    })
    return res;
}