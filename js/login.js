const loginIdVerify = new dataVerifier('#txtLoginId', async function (val) {
    if (!val) {
        return '账号不能为空'
    }
})



const txtLoginPwdVerify = new dataVerifier('#txtLoginPwd', function (val) {
    if (!val) {
        return '密码不能为空'
    }
})


const form = $('.user-form')
form.onsubmit = async (e) => {
    e.preventDefault()
    const result = await dataVerifier.verifyFn(loginIdVerify, txtLoginPwdVerify)
    if (!result) {
        return
    }
    const obj = Object.fromEntries(new FormData(form))
    const data = await API.loginIn(obj)
    if (data.code === 0) {
        alert('登录成功')
        location.href = './index.html'
    } else {
        alert('登录失败')
    }

}