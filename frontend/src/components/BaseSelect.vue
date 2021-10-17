<template>
    <div class="form-group" :class="[{'has-label': label}]">
        <label v-if="label">{{ label }} <span v-if="required">*</span></label>
        <v-select v-model="model" :options="options" class="style-chooser" v-bind="$attrs"></v-select>
    </div>
</template>

<script>

export default {
    data() {
        return {
            model: null
        }
    },
    props: {
        label: {
            type: String,
            description: "Define o texto de label para o select",
            default: null
        },
        required: {
            type: Boolean,
            description: "Define através do asterisco se o campo é ou não obrigatório",
            default: false
        },
        options: {
            type: Array,
            description: "Define as options do select",
        },
    }
}
</script>

<style>
    .style-chooser .vs__search::placeholder,
    .style-chooser .vs__dropdown-toggle,
    .style-chooser .vs__dropdown-menu {
        background: #fff;
        border: 1px solid #cad1d7;
        color: #8898aa;
        height: 46px;
    }

    .style-chooser .vs__clear,
    .style-chooser .vs__open-indicator {
        fill: #8898aa;
    }
</style>