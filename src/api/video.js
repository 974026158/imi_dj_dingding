import http from "../utils/http.js";
// 播放视频 
export async function showVideo(reqHttp, reqId, reqToken) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/course/courseCatalogue/getCatalogueByCourse/" + reqId + "?TOKEN=" + reqToken
    })
    return res;
}
// 课程介绍
export async function introduceVideo(reqHttp, reqId, reqToken) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/resourcemanage/course/getByCourseId/" + reqId + "?TOKEN=" + reqToken
    })
    return res;
}
// 讲师信息
export async function introduceTeacher(reqHttp, reqId, typeId, reqToken) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/course/userStudyProgress/scormQuery/" + reqId + "/" + typeId + "?TOKEN=" + reqToken
    })
    return res;
}
// 课程评论
export async function discuss(reqHttp, reqId, reqToken, pageSize, pageNumber, iphone) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/course/courseDiscuss/getPageData?filter={courseId:" + reqId + "}&TOKEN=" + reqToken + "&pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&_=" + iphone
    })
    return res;
}
// 点赞 
export async function voteLike(reqHttp, reqToken, req) {
    const res = await http({
        method: 'post',
        url:  reqHttp + "/course/vote/save?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// 踩 
export async function vote(reqHttp, reqToken, req) {
    const res = await http({
        method: 'post',
        url:  reqHttp + "/course/vote/save?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// 创建评论
export async function addDiscuss(reqHttp, reqToken, req) {
    const res = await http({
        method: 'post',
        url:  reqHttp + "/course/courseDiscuss/save?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// 删除 
export async function deleteDiscuss(reqHttp, reqId, reqToken) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/courseDiscuss/deleteDiscuss/" + reqId + "?TOKEN=" + reqToken
    })
    return res;
}
// 展开评论删除 http://wsdx.sgcc.com.cn/api/course/courseDiscuss/deleteDiscussReply/2c93884172e44d86017332c243240029?TOKEN=f6b77683-e2cb-45a3-aea6-2531497812f1
export async function deleteDiscussReply(reqHttp, reqId, reqToken) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/courseDiscuss/deleteDiscussReply/" + reqId + "?TOKEN=" + reqToken
    })
    return res;
}
// 回复
export async function reply(reqHttp, reqToken, req) {
    const res = await http({
        method: 'post',
        url:  reqHttp + "/course/courseDiscuss/saveReply?TOKEN=" + reqToken,
        data: req
    })
    return res;
}
// 回复的返回信息
export async function replyReturn(reqHttp, reqId, reqToken, pageSize, pageNumber, iphone) {
    const res = await http({
        method: 'get',
        url: reqHttp + "/course/courseDiscuss/getReplyPageData?filter={displayId:" + reqId + "}&TOKEN=" + reqToken + "&pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&_=" + iphone
    })
    return res;
}
// 回复数量
export async function replyCount(reqHttp, reqId, reqToken) {
    const res = await http({
        method: 'post',
        url: reqHttp + "/course/courseDiscuss/getReplyCount/" + reqId + "?TOKEN=" + reqToken
    })
    return res;
}


