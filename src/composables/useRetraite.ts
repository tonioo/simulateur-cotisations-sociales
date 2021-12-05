import { computed } from 'vue'
import constants from '@/constants'

const revenu_minimum = 4569
const cotisations_minimales = 461
const taux_p1 = 8.23
const taux_p2 = 1.87

const forfaits_retraite_comp = [
    ["A", 26580, 1457],
    ["B", 49280, 2913],
    ["C", 57850, 4370],
    ["D", 66400, 7283],
    ["E", 83060, 10196],
    ["F", 103180, 16023],
    ["G", 123300, 17479],
    ["H", 0, 18936]
]

const forfaits_invalidite_deces = {
    A: 76,
    B: 228,
    C: 380
}

export default function retraite(salaire) {
    const retraite_base = computed(() => {
        if (salaire.value < revenu_minimum) {
            return cotisations_minimales
        }
        if (salaire.value < constants.PASS) {
            return salaire.value * taux_p1 / 100
        }
        return Math.round((constants.PASS * taux_p1 / 100) + (salaire.value * taux_p2 / 100))
    })

    const retraite_comp = computed(() => {
        if (salaire.value > 0) {
            for (const forfait of forfaits_retraite_comp) {
                if (salaire.value < forfait[1] || forfait[1] === 0) {
                    return forfait[2]
                }
            }
        }
        return 0
    })

    const invalidite_deces = forfaits_invalidite_deces.A

    const total = computed(() => {
        return retraite_base.value + retraite_comp.value + invalidite_deces
    })

    return { retraite_base, retraite_comp, invalidite_deces, total }
}
