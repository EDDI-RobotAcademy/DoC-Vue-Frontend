<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="writer" label="작성자(자동으로 값이 들어가야 함)" required/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="age" label="나이" required/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-select
                v-model="gender"
                :items="gender_select"
                label="성별"
                clearable
                solo/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-right">
                <v-btn class="ml-2" color="primary" @click="onSubmit">
                    <v-icon>mdi-check</v-icon>
                    <span>작성 완료</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

const reportModule = 'reportModule'

export default {
    data () {
        return {
            writer: '',
            age: '',
            gender: '',
            gender_select: ['여성','남성'],
        }
    },
    methods: {
        ...mapActions(reportModule, ['requestCreateReportToDjango']),
        async onSubmit () {
            console.log('작성 완료 버튼 누름')

            const payload = {
                writer: this.writer,
                age: this.age,
                gender: this.gender,
            }
            console.log('payload check:', payload)

            const report = await this.requestCreateReportToDjango(payload)
            alert('작성이 완료되었습니다.')
            await this.$router.push('/')
        },
    }
}
</script>