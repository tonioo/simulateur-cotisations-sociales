<script setup lang="ts">
import { computed, ref } from 'vue'
import useRetraite from '@/composables/useRetraite'
import useCotisationsSociales from '@/composables/useCotisationsSociales'
import useCFP from '@/composables/useCFP'
import useCsgCrds from '@/composables/useCsgCrds'
import CotisationsTable from './CotisationsTable.vue'
  
const salaire = ref(0)
const retraite = useRetraite(salaire)
const cotisationsSociales = useCotisationsSociales(salaire)
const cfp = useCFP()

const assiette = computed(() => {
    return salaire.value + cotisationsSociales.total.value
})

const csgCrds = useCsgCrds(assiette)

const retraiteItems = ref([
    {
        name: 'Retraite de base',
        value: retraite.retraite_base  
    },
    {
        name: 'Retraite complémentaire',
        value: retraite.retraite_comp
    },
    {
        name: 'Invalidité décès',
        value: retraite.invalidite_deces
    }
])
  
const cotisationsSocialesItems = ref([
    {
        name: 'Maladie / maternité',
        value: cotisationsSociales.maladie_maternite  
    },
    {
        name: 'Allocations familiales',
        value: cotisationsSociales.allocations_familiales
    },
    {
        name: 'Indemnités journalières',
        value: cotisationsSociales.indemnites_journalieres
    }
])

const total = computed(() => {
    return retraite.total.value + cotisationsSociales.total.value + cfp.total + csgCrds.total.value
})

const ratio = computed(() => {
    if (salaire.value !== 0) {
        return Math.round(total.value / salaire.value * 100)
    }
    return 0
})
</script>

<template>
<div class="mt-10 text-center">
  <label>Indiquez votre rémunération</label><br>
  <input v-model="salaire" type="number" class="rounded mt-4" />
</div>
<div class="text-left flex justify-center mt-10">
  <cotisations-table
    key="retraite"
    title="Retraite"
    :items="retraiteItems"
    :total="retraite.total"
    class="mr-6"
    />

  <cotisations-table
    key="sociales"
    title="Cotisations sociales"
    :items="cotisationsSocialesItems"
    :total="cotisationsSociales.total"
    class="mr-6"
    />

  <cotisations-table
    key="cfp"
    title="CFP"
    :items="[]"
    :total="cfp.total"
    class="mr-6"
    />

  <cotisations-table
    key="csgCrds"
    title="CSG / CRDS"
    :items="[]"
    :total="csgCrds.total"
    />
</div>
<div class="text-center py-6 mt-6 bg-green-50 rounded text-lg w-6/12 mx-auto">
  <p class="font-semibold">Total : {{ total }}€</p>
  <p v-if="ratio">Soit environ {{ ratio }}% de votre rémunération</p>
</div>
</template>
