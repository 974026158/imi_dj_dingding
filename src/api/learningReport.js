import http from "../utils/http.js";
// // 登陆次数
export async function getLoginFrequency(reqHttp, reqYear,reqToken,req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/statement/loginHistory/getUserLoginCountByYear/" + reqYear + "?TOKEN=" + reqToken,
        data:req
    })
    return res;
}
// // 学时情况
export async function classHours(reqHttp, reqYear,reqToken) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/resourcemanage/course/getLearningStatistics/" + reqYear + "?TOKEN=" + reqToken
    })
    return res;
}
// // echarts
export async function getEcharts(reqHttp, reqYear,reqToken,req) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/statement/loginHistory/getYearUserActiveness/" + reqYear + "?TOKEN=" + reqToken,
        data:req
    })
    return res;
}