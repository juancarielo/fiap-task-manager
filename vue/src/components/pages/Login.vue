<template>
    <div class="container-login">
        <img src="../../assets/images/logo.svg" alt="Logo Fiap" class="logo" />

        <form>
            <p>{{ msgErro }}</p>

            <div class="input">
                <img src="../../assets/images/mail.svg" alt="E-mail" />
                <input
                    type="text"
                    placeholder="Informe seu e-mail"
                    v-model="body.login"
                    @
                />
            </div>

            <div class="input">
                <img src="../../assets/images/lock.svg" alt="Senha" />
                <input
                    type="password"
                    placeholder="Informe sua senha"
                    v-model="body.password"
                />
            </div>

            <button class="" type="button" @click="doLogin">
                {{ labelButton }}
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msgErro: "",
            labelButton: "Login",
            disabledButton: false,
            body: {
                login: "admin@admin.com",
                password: "Admin@123"
            }
        };
    },
    methods: {
        doLogin() {
            console.log(this.body);

            if (!this.body.login || !this.body.password) {
                this.msgErro = "Favor informar usuario e senha";
                return;
            }

            this.disabledButton = true;
            this.labelButton = "Carregando...";

            this.$http.post('login', this.body)
            .then(response => response.json())
            .then(result => {
                this.disabledButton = false;
                this.labelButton = 'Login';

                console.log(result)
            })
        }
    }
};
</script>

<style lang="scss"></style>
