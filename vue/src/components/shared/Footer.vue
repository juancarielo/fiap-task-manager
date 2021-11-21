<template>
    <div class="container-footer">
        <button><img src="../../assets/images/add.svg" alt="Adicionar tarefa" />Adicionar Tarefa</button>
        <span>© Copyright {{getDate}} Fiap. Todos os direitos reservados.</span>
    </div>
</template>

<script>
export default {
    computed: {
        getDate(){
            return new Date().getFullYear();
        }
    },
};
</script>

<style lang="scss"></style>
