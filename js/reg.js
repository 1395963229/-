const loginIdVerify = new dataVerifier('#txtLoginId', async function (val) {
    if (!val) {
        return '账号不能为空'
    }
    const resp = await API.existsUser(val)
    if (resp.data) {
        return '该账号名已被占用'
    }
})


const txtNicknameVerify = new dataVerifier('#txtNickname', function (val) {
    if (!val) {
        return '账号不能为空'
    }
})

const txtLoginPwdVerify = new dataVerifier('#txtLoginPwd', function (val) {
    if (!val) {
        return '密码不能为空'
    }
})

const txtLoginPwdConfirmVerify = new dataVerifier('#txtLoginPwdConfirm', function (val) {
    if (!val) {
        return '密码不能为空'
    }
    if (val !== txtLoginPwdVerify.input.value) {
        return '两次密码不一致'
    }
})

const form = $('.user-form')
form.onsubmit = async (e) => {
    e.preventDefault()
    const result = await dataVerifier.verifyFn(loginIdVerify, txtNicknameVerify, txtLoginPwdVerify, txtLoginPwdConfirmVerify)
    if (!result) {
        return
    }
    const obj = Object.fromEntries(new FormData(form))
    const data = await API.loginUser(obj)
    if (data.code === 0) {
        alert('注册成功')
        location.href = './login.html'
    } else {
        alert('无法注册')
    }

}