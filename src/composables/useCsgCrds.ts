import { computed } from 'vue'
const taux = 9.7

export default function useCsgCrds(assiette) {
    const total = computed(() => {
        return Math.round(assiette.value * taux / 100)
    })

    return { total }
}
