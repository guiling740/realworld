import request from '../utils/request'

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}
// 获取关注的用户文章列表
export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        // Authorization: Token jwt.token.here
        headers: {
            Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTM0MzQxLCJ1c2VybmFtZSI6InhpYW9taW5ncWlhbmciLCJleHAiOjE2MTYxNDc1MTl9.l51y7jieWfPOnWryHD6hXi5kj-EODly-qrkX0p_h7Ws`
        },
        params
    })
}
