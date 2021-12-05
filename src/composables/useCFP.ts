import constants from '@/constants'

const taux = 0.25

export default function useCFP() {
    const total = Math.round(constants.PASS * taux / 100)

    return { total }
}
