(async () => {
    const data = await API.currentUser()    //检测登录状态，登录成功显示用户信息

    //登录失败返回登录页面
    if (data.code) {
        alert('登录过期')
        location.href = './login.html'
        return
    }

    const user = data.data
    //获取dom
    const doms = {
        nickname: $('#nickname'),
        loginId: $('#loginId'),
        li: {
            chatContent: $('.li .chat-content'),
            chatDate: $('.li .chat-date')
        },
        me: {
            chatContent: $('.me .chat-content'),
            chatDate: $('.me .chat-date')
        },
        close: $('.close'),
        container: $('.chat-container'),
        input: $('#txtMsg'),
        form: $(".msg-container")
    }

    //点击x按钮，退出账号
    doms.close.onclick = () => {
        API.loginOut()
        location.href = './login.html'
    }

    //显示用户信息
    function setUserInf() {
        doms.nickname.innerText = user.nickname
        doms.loginId.innerText = user.loginId
    }
    setUserInf()


    //获取历史聊天记录
    async function getHistory() {
        const data = await API.getHistory()
        for (const obj of data.data) {
            addMessage(obj)
        }
        setContainerPosition()
    }
    await getHistory()


    //使聊天界面滚动到最底部
    function setContainerPosition() {
        doms.container.scrollTop = doms.container.scrollHeight
    }

    //根据消息对象，渲染页面
    function addMessage(mesObj) {
        const div = $$$('div')
        div.classList.add('chat-item')
        if (mesObj.from) {
            div.classList.add('me')
        }

        const img = $$$('img')
        img.classList.add('chat-avatar')
        img.src = mesObj.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg"

        const content = $$$('div')
        content.classList.add('chat-content')
        content.innerText = mesObj.content

        const date = $$$('div')
        date.classList.add('chat-date')
        date.innerText = formatDate(mesObj.createdAt)

        div.appendChild(img)
        div.appendChild(content)
        div.appendChild(date)

        doms.container.appendChild(div)
        setContainerPosition()
    }



    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }


    //用户发送
    async function sendMsg() {
        const content = doms.input.value.trim()
        if (!content) {
            return
        }
        addMessage({
            from: user.loginId,
            to: null,
            content: content,
            createdAt: Date.now()
        })
        doms.input.value = ''
        const resp = await API.sendChat(content)
        addMessage({
            from: null,
            to: user.loginId,
            ...resp.data
        })
    }
    doms.form.onsubmit = (e) => {
        e.preventDefault()
        sendMsg()
    }
})()