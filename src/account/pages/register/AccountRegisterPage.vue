<template>
    <v-container class="register-container" fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card>
                    <v-card-title>
                        <span class="headline">신규 회원 신청</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="formValid" lazy-validation>
                            <v-text-field
                                    v-model="email"
                                    label="Email"
                                    required
                                    :rules="emailRules"
                                    :disabled="true"/>
                            <v-row align="center">
                                <v-col cols="10">
                                    <v-text-field
                                            v-model="nickname"
                                            label="Nickname"
                                            required
                                            :rules="nicknameRules"
                                            :error-message="nicknameErrorMessages"/>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn color="primary"
                                            @click="checkNicknameDuplication"
                                            class="check-button"
                                            small>
                                        중복 검사
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row align="center">
                                <v-col align-self="center">
                                    <v-text>사업자이시면 버튼을 눌러주세요</v-text>
                                </v-col>
                                <v-col>
                                    <v-checkbox 
                                    v-model="isBusiness"
                                    label="사업자"
                                    class="check"
                                    @click="checkBusiness"/>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" 
                                @click="submitForm" 
                                :disabled="!isValidForSubmission">
                            신청하기
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const authenticationModule = 'authenticationModule'
const accountModule = 'accountModule'

export default {
    data () {
        return {
            formValid: false,
            email: '',
            nickname: '',
            isBusiness: false,
            emailRules: [
                v => !!v || 'Email 은 필수입니다!',
                v => /.+@.+\..+/.test(v) || '유효한 Email 주소를 입력하세요!'
            ],
            nicknameRules: [v => !!v || 'Nickname은 필수입니다!'],
            nicknameErrorMessage: [],
            isNicknameValid: false,
        }
    },
    async created () {
        await this.requestUserInfo()
    },
    computed: {
        isValidForSubmission () {
            return this.formValid && this.isNicknameValid
        }
    },
    methods: {
        ...mapActions(authenticationModule, [
            'requestUserInfoToDjango',
            'requestAddRedisAccessTokenToDjango'
        ]),
        ...mapActions(accountModule, [
            'requestNicknameDuplicationCheckToDjango',
            'requestCreateNewAccountToDjango',
        ]),
        async requestUserInfo () {
            try {
                const userInfo = await this.requestUserInfoToDjango()
                this.email = userInfo.kakao_account.email
            } catch (error) {
                console.error('에러:', error)
                alert('사용자 정보를 가져오는데 실패하였습니다!')
            }
        },
        async checkNicknameDuplication () {
            console.log('닉네임 중복 검사 눌럿음')

            try {
                const isDuplicate = await this.requestNicknameDuplicationCheckToDjango({
                    newNickname: this.nickname.trim()
                })

                if (isDuplicate) {
                    this.nicknameErrorMessages = ['이 nickname은 이미 사용중입니다!']
                    this.isNicknameValid = false
                } else {
                    this.nicknameErrorMessages = []
                    this.isNicknameValid = true
                }
            } catch (error) {
                alert('닉네임 중복 확인에 실패했습니다!')
                this.isNicknameValid = false
            }
        },
        async submitForm () {
            console.log('신청하기 누름')

            if (this.business) {
                    this.businessmessage = ['고객입니다.']
                    this.business = false
                } else {
                    this.businessmessage = []
                    this.business = true
                }

            if (this.$refs.form.validate()) {
                const accountInfo = {
                    email: this.email,
                    nickname: this.nickname,
                    business: this.business
                }

                await this.requestCreateNewAccountToDjango(accountInfo)
                console.log('전송한 데이터:', accountInfo)

                const accessToken = localStorage.getItem("accessToken");
                const email = accountInfo.email
                console.log('register submitForm email:', email)
                await this.requestAddRedisAccessTokenToDjango({ email, accessToken })

                await this.$router.push({'name': 'ReportRegisterPage'})
            }
        },
    },
}
</script>

<style scoped>
.check {
  transform: scale(1.1); /* 체크박스 크기 증가 */
  position: absolute;
  left: 30px;
}
</style>