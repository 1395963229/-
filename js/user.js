

class dataVerifier {

    /**
     * 
     * @param {string} inpDom 验证表单的css选择器
     * @param {Function} dataVerifyFn 验证表单函数，返回错误消息，若没有错误消息，则验证成功
     */
    constructor(inpDom, dataVerifyFn) {
        this.dataVerifyFn = dataVerifyFn
        this.input = $(inpDom)
        this.p = this.input.nextElementSibling
        this.input.onblur = () => {
            this.verifyFn()
        }
    }

    //失去焦点验证函数,成功返回true，失败返回false
    async verifyFn() {
        const err = await this.dataVerifyFn(this.input.value)
        if (err) {
            this.p.innerHTML = err
            return false
        } else {
            this.p.innerHTML = ''
            return true
        }
    }

    //静态方法，对传入的所有的验证进行验证
    static async verifyFn(...verifyAll) {
        const proms = verifyAll.map(el => el.verifyFn())
        const arr = await Promise.all(proms)
        return arr.every(a => a)
    }
}


