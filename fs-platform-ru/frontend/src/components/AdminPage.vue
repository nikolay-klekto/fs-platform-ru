<template>
    <div div="adminpage">
        <h2>{{ pageContent }}</h2>
    </div>
</template>

<script>
import {AXIOS} from './http-common'

export default {
    name: 'AdminPage',
    data() {
        return {
            pageContent: ''
        }
    },
    methods: {
        loadUserContent() {
            AXIOS.get('/admincontent')
            .then(response => {
                this.$data.pageContent = response.data;
            })
            .catch(error => {
                console.log('ERROR: ' + error.response.data);
            })
        }
    },
    mounted() {
        this.loadUserContent();
    }
}
</script>

<style>
</style>