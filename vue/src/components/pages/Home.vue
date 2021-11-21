<template>
    <div class="container-home">
        <h1>Home</h1>
        <button class="" type="button" @click="sair">Sair</button>
    </div>
</template>

<script>
export default {
    methods: {
        sair(t) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");

            this.$emit("token", "");
        }
    }
};
</script>

<style lang="scss"></style>
