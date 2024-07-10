<template>
    <div></div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const authenticationModule = 'authenticationModule'
const accountModule = 'accountModule'

export default {
    computed: {
        ...mapState(accountModule, ['isAdmin'])
    },
    methods: {
        ...mapActions(authenticationModule, [
            'requestAccessTokenToDjangoRedirection',
            'requestUserInfoToDjango',
            'requestAddRedisAccessTokenToDjango',
        ]),
        ...mapActions(accountModule, [
            'requestEmailDuplicationCheckToDjango',
            'requestRoleTypeToDjango'
        ]),
        async setRedirectData () {
            const code = this.$route.query.code

            await this.requestAccessTokenToDjangoRedirection({ code })
            const userInfo = await this.requestUserInfoToDjango()
            const email = userInfo.kakao_account.email
            console.log('email:', email)

            const isEmailDuplication = 
                await this.requestEmailDuplicationCheckToDjango(email)

            if (isEmailDuplication === true) {
                console.log('기존 가입 고객입니다!')
                alert('로그인에 성공하였습니다!')

                const accessToken = localStorage.getItem("accessToken");

                if (accessToken) {
                    await this.requestAddRedisAccessTokenToDjango({ email, accessToken });
                } else {
                    console.error('AccessToken is missing');
                }
                
                const response = await this.requestRoleTypeToDjango()
                if (response === 'ADMIN') {
                    console.log('response:', response)
                    this.$store.state.accountModule.isAdmin = true
                    localStorage.setItem('isAdmin', true)
                }

                this.$router.push('/')

            } else {
                console.log('신규 가입 고객입니다!')
                alert('신규 가입 고객입니다!')

                this.$router.push('/account/register')
            }
        }
    },
    async created () {
        await this.setRedirectData()
    }
}
</script>