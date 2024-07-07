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
                                <v-col cols=6>
                                    <v-checkbox 
                                    v-model="isBusiness"
                                    label="사업자"
                                    class="check"
                                    @click="showBusinessDialog"/>
                                </v-col>
                                <v-col cols=6 class="mt-3">
                                    <v-checkbox 
                                    v-model="isAdmin"
                                    label="관리자"
                                    class="check"
                                    @click="showAdminPasswordDialog"/>
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

        <!-- Business Dialog -->
        <v-dialog v-model="businessDialog" max-width="500">
            <v-card>
                <v-card-title class="headline">사업자 확인</v-card-title>
                <v-card-text>
                    사업자로 신청하시겠습니까?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelBusiness">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="confirmBusiness">확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Admin Dialog -->
        <v-dialog v-model="adminDialog" max-width="500">
            <v-card>
                <v-card-title class="headline">관리자 비밀번호 입력</v-card-title>
                <v-card-text>
                    관리자로 신청하려면 비밀번호를 입력하세요.
                    <v-text-field
                        v-model="adminPassword"
                        label="비밀번호"
                        type="password"
                        :rules="passwordRules"
                        required
                    />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelAdmin">취소</v-btn>
                    <v-btn color="blue darken-1" text @click="checkAdminPassword">확인</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
            isAdmin: false,
            adminPassword: '',
            emailRules: [
                v => !!v || 'Email 은 필수입니다!',
                v => /.+@.+\..+/.test(v) || '유효한 Email 주소를 입력하세요!'
            ],
            nicknameRules: [v => !!v || 'Nickname은 필수입니다!'],
            nicknameErrorMessage: [],
            isNicknameValid: false,
            adminDialog: false,
            businessDialog: false,
            passwordRules: [v => !!v || '비밀번호는 필수입니다!'],
            correctAdminPassword: '', 
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
            'requestCorrectAdminPasswordToDjango'
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
            console.log('닉네임 중복 검사')

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
        showBusinessDialog() {
            this.businessDialog = true
        },
        cancelBusiness() {
            this.businessDialog = false
            this.isBusiness = false
        },
        confirmBusiness() {
            this.isBusiness = true
            this.businessDialog = false
            alert('사업자로 신청합니다.')
        },
        showAdminPasswordDialog() {
            this.adminDialog = true
        },
        cancelAdmin() {
            this.adminDialog = false
            this.isAdmin = false
        },
        async checkAdminPassword() {
            try {
                this.correctAdminPassword = await this.requestCorrectAdminPasswordToDjango()
                if (this.adminPassword === this.correctAdminPassword) {
                    this.isAdmin = true
                    this.adminDialog = false
                    alert('관리자로 신청합니다.')
                } else {
                    alert('비밀번호가 올바르지 않습니다.')
                    this.isAdmin = false
                }
            } catch (error) {
                console.log('관리자 비밀번호 확인 중 에러 발생')
            }
            
        },
        async submitForm () {
            console.log('신청하기 누름')

            if (this.isBusiness) {
                    console.log('사업자입니다.')
                } 
            else {
                    console.log('고객입니다.')
                }

            if (this.$refs.form.validate()) {
                const accountInfo = {
                    email: this.email,
                    nickname: this.nickname,
                    isBusiness: this.isBusiness,
                    isAdmin: this.isAdmin
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
  margin-right: 20px; /* 체크박스 사이 간격 */
}
.mt-3 {
  margin-top: 20px; /* 필요한 만큼 간격 조정 */
}
</style>
