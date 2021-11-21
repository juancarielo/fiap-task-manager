<template>
    <div class="container-home">
        <headerCustom @doLogout="sair" />
        <footerCustom />
    </div>
</template>

<script>
import Header from "../shared/Header";
import Footer from "../shared/Footer";

export default {
    components: {
        headerCustom: Header,
        footerCustom: Footer
    },
    methods: {
        sair() {
            this.$emit("token", "");
        }
    }
};
</script>

<style lang="scss"></style>
