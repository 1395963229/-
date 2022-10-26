var API = (function () {
    const BASE_URL = 'https://study.duyiedu.com'
    const TOKEN_KEY = 'token'

    function get(path) {
        const headers = {}
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            headers.authorization = `Bearer ${token}`
        }
        return fetch(BASE_URL + path, { headers })
    }


    function post(path, userInfo) {
        const headers = {
            'Content-Type': 'application/json'
        }
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            headers.authorization = `Bearer ${token}`
        }
        return fetch(BASE_URL + path, {
            method: 'POST',
            headers,
            body: JSON.stringify(userInfo)
        })
    }





    //注册
    async function loginUser(userInfo) {
        const obj = await post('/api/user/reg', userInfo)
        return await obj.json()
    }

    //登录
    async function loginIn(userInfo) {
        const obj = await post('/api/user/login', userInfo)
        const result = await obj.json()
        //将响应头中的令牌保存 保存到本地存储（localStorage)
        if (result.code === 0) {//登录成功
            const token = obj.headers.get('authorization')
            localStorage.setItem(TOKEN_KEY, token)
        }
        return result
    }


    //验证账号  
    async function existsUser(loginId) {
        const obj = await get('/api/user/exists?loginId=' + loginId)
        return await obj.json()
    }

    //当前用户登录信息
    async function currentUser() {
        const obj = await get('/api/user/profile')
        return await obj.json()
    }


    //发送消息
    async function sendChat(content) {
        const resp = await post('/api/chat', {
            content,
        });
        return await resp.json();
    }


    //获取历史消息记录
    async function getHistory() {
        const obj = await get('/api/chat/history')
        return obj.json()
    }

    //退出登录
    function loginOut() {
        localStorage.removeItem(TOKEN_KEY)
    }


    return {
        loginIn, loginOut, loginUser, existsUser, currentUser, sendChat, getHistory
    }
})()