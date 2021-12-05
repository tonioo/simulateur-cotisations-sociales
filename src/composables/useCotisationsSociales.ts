import { computed } from 'vue'
import constants from '@/constants'

export default function useCotisationsSociales(salaire) {
    const maladie_maternite = computed(() => {
        const t1 = 6.5
        const t2 = 1.5
        let taux

        if (salaire.value < (1.1 * constants.PASS)) {
            taux = ((t1 - t2) / (1.1 * constants.PASS)) * salaire.value * t2
        } else {
            taux = t1
        }
        return Math.round(salaire.value * taux / 100)
    })

    const allocations_familiales = computed(() => {
        const t1 = 3.1
        let taux

        if (salaire.value < (1.1 * constants.PASS)) {
            taux = 0
        } else if (salaire.value < (1.4 * constants.PASS)) {
            taux = (t1 / (0.3 * constants.PASS)) * (salaire.value - (1.1 * constants.PASS))
        } else {
            taux = t1
        }
        return Math.round(salaire.value * taux / 100)
    })

    const indemnites_journalieres = computed(() => {
        const taux = 0.0015
        let assiette

        if (salaire.value < 0.4 * constants.PASS) {
            assiette = 0.4 * constants.PASS
        } else if (salaire.value > 3 * constants.PASS) {
            assiette = 3 * constants.PASS
        } else {
            assiette = salaire.value
        }
        return Math.round(assiette * taux)
    })

    const total = computed(() => {
        return maladie_maternite.value + allocations_familiales.value + indemnites_journalieres.value
    })

    return { maladie_maternite, allocations_familiales, indemnites_journalieres, total }
}
