<template>
    <div id="main">
        <home v-if="token" @token="setToken"></home>
        <login v-else="token" @token="setToken"></login>
    </div>
</template>

<script>
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";

export default {
    data() {
        return {
            token: localStorage.getItem('accessToken')
        }
    },
    components: {
        login: Login,
        home: Home
    },
    methods: {
        setToken(t) {
            this.token = t;
        }
    }
};
</script>

<style lang="scss"></style>
