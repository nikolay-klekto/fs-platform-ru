<template>
    <div id="registration-confirm">
        <div class="confirm-form">
            <b-card
              title="Confirmation"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
            <div v-if="isSuccess">
                <p class="success">Account is successfully verified!</p>
                <router-link to="/login">
                    <b-button variant="primary">Login</b-button>
                </router-link>
            </div>
            <div v-if="isError">
                <p class="fail">Verification failed:</p>
                <p>{{ errorMessage }}</p>
            </div>
            </b-card>
            </div>
    </div>
</template>

<script>
import {AXIOS} from './http-common'

export default {
    name: 'RegistrationConfirmPage',
    data() {
        return {
            isSuccess: false,
            isError: false,
            errorMessage: ''
        }
    },
    methods: {
        executeVerification() {
            AXIOS.post(`/auth/registrationConfirm`, null, {params: { 'token': this.$route.params.token}})
            .then(response => {
              this.isSuccess = true;
              console.log(response);
            }, error => {
                this.isError = true;
                this.errorMessage = error.response.data.message;
            })
            .catch(e => {
              console.log(e);
              this.errorMessage = 'Server error. Please, report this error website owners';
            })
        }
    },
    mounted() {
        this.executeVerification();
    }
}
</script>

<style scoped>
.confirm-form {
    margin-left: 38%;
    margin-top: 50px;
}
.success {
    color: green;
}
.fail {
    color: red;
}
</style>