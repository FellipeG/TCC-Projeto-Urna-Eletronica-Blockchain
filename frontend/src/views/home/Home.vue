<template>

    <div class="container pt-150">

        <div class="row">

            <div class="col-6">
                <card :hover="true" :shadow="true">

                    <template slot:header>
                        <h2>Segurança</h2>
                    </template>

                    <p>
                        Seu voto seguro com a nova urna eletrônica em blockchain. <br />
                        Com o sistema de dados distribuídos e com os contratos inteligentes, garantimos a segurança das eleições.
                    </p>

                </card>
            </div>

            <div class="col-6">
                <card :hover="true" :shadow="true">

                    <template slot:header>
                        <h2>Praticidade</h2>
                    </template>

                    <p>
                        Os títulos de eleitor já não são mais necessários. <br />
                        Nosso sistema utiliza a sua conta da blockchain para realizar a votação.
                    </p>

                </card>
            </div>

        </div>

        <div style="height: 200px"></div>

    </div>
</template>

<script>

import Card from '@/components/Card';

export default {
    data() {
        return {

        }
    },
    components: {
        Card
    }
}
</script>

<style>
</style>