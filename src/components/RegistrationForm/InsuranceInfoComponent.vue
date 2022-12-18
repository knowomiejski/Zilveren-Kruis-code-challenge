<template>
    <div>
        <h2 class="mt-5">Verzekering</h2>
        <h3>Basisverzekering</h3>
        <p>
            In Nederland is de basisverzekering verplicht.
            Iedereen wordt voor de basisverzekering
            geaccepteerd. De overheid bepaalt welke zorg hierin
            zit en dit is dus bij elke verzekeraar hetzelfde.
        </p>
        <FormCardsRadio inputName="insuranceTypes" label="Kies uw basisverzekering" :options="insuranceOptions" :paymentInterval="paymentInterval(insuranceInfo.paymentInterval)" :paymentIntervalLabel="insuranceInfo.paymentInterval" v-model="insuranceInfo.insuranceType"/>
        <FormDropdown inputName="paymentInterval" placeholder="Kies een termijn" :options="paymentIntervalOptions" label="Kies je betaaltermijn" v-model="insuranceInfo.paymentInterval"/>
        <FormDropdown inputName="ownRisk" placeholder="Kies de hoogste van het eigen risico" :options="riskStringOptions" label="Kies de hoogste van het eigen risico" v-model="tempRisk"/>
        <div class="form-group">
            <h3>Aanvullende verzekering</h3>
            <p>
                Onze aanvullende verzekeringen kennen ruim 100
                verschillende vergoedingen. De hoogte van de
                vergoeding verschilt per pakket.hoogte van de
                vergoeding verschilt per pakket
            </p>
            <FormDropdown inputName="additionalInsurance" placeholder="Kies uw aanvullende verzekering" :options="additionalStringOptions" label="Kies uw aanvullende verzekering" v-model="tempAdditionalInsurance"/>
            <FormDropdown inputName="dentist" placeholder="Kies uw tandartsverzekering" :options="dentistStringOptions" label="Kies uw tandartsverzekering" v-model="tempDentistInsurance"/>
        </div>
        <div class="page-control-container my-4">
            <hr/>
            <div class="page-control-actions d-flex justify-content-between">
                <Button @handleClick="previousPage()" buttonType="primary" :outlined="true">
                    <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                        <div class="mx-2">Terug naar gegevens</div>
                    </div>
                </Button>
                <Button @handleClick="nextPage()" buttonType="primary">
                    <div class="d-flex align-items-center">
                        <div class="mx-2">Ga verder naar verzekering</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </div>
                </Button>
            </div>
            <div class="d-flex flex-row-reverse">
                <a href="">Annuleeer bijschrijven</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { useRegistrationFormStore } from '@/stores/registration'
import FormCardsRadio from '../FormFields/FormCardsRadio.vue';
import FormDropdown from '../FormFields/FormDropdown.vue';
import Button from '../Shared/Button.vue';
import insuranceTypes from '@/models/AvailibleInsuranceTypes'
import type PersonalRiskType from '@/models/PersonalRiskType'
import type AdditionalInsuranceType from '@/models/AdditionalInsuranceType'
import router from '@/router';

const registrationStore = useRegistrationFormStore()
const insuranceInfo = registrationStore.registrationFormData.insuranceInfo

const convertInsuranceTypes = () => {
    const insuranceOptions = []
    for (let i = 0; i < insuranceTypes.length; i++) {
        let option = {
            optionName: 'insurance' + i,
            label: insuranceTypes[i].name,
            badge: insuranceTypes[i].name === 'Basis Zeker' ? 'Meest gekozen' : '',
            price: insuranceTypes[i].price
        }
        insuranceOptions.push(option)
    }
    return insuranceOptions
}
let insuranceOptions = convertInsuranceTypes()

watch(() => insuranceInfo.paymentInterval, () => { insuranceOptions = convertInsuranceTypes() })


onMounted(() => {
    if(
        registrationStore.registrationFormData.personalInfo.initials === '' ||
        registrationStore.registrationFormData.personalInfo.lastName === '' ||
        registrationStore.registrationFormData.personalInfo.dob.toISOString() === '' ||
        registrationStore.registrationFormData.personalInfo.bsn === '' ||
        registrationStore.registrationFormData.personalInfo.sex === ''
    ) {
        router.push('/register/personal')
    }
})


const paymentIntervalOptions = ref<string[]>(['per jaar', 'per kwartaal', 'per maand'])
const paymentInterval = (paymentIntervalName: string):number => {
    switch(paymentIntervalName) {
        case 'per jaar':
            return 1
        case 'per kwartaal':
            return 3
        case 'per maand':
            return 12
        default:
            return 1
    }
}

const riskOptions = ref<PersonalRiskType[]>([
    { description: '€ 385 - verplicht eigen risico', amount: 385},
    { description: '€ 885 - korting van € 22 per jaar', amount: 885}
])
const riskStringOptions = ref<string[]>([
    '€ 385 - verplicht eigen risico',
    '€ 885 - korting van € 22 per jaar'
])
const tempRisk = ref('€ 385 - verplicht eigen risico')

const additionalOptions = ref<AdditionalInsuranceType[]>([
    { description: 'Geen aanvullende verzekering geselecteerd', type: 'additional', price: 0},
    { description: 'Aanvullend 1 - € 21,38 per jaar', type: 'additional', price: 21.38},
    { description: 'Aanvullend 2 - € 85,06 per jaar', type: 'additional', price: 85.06},
    { description: 'Aanvullend 3 - € 198,63 per jaar', type: 'additional', price: 198.63},
    { description: 'Aanvullend 4 - € 359,73 per jaar', type: 'additional', price: 359.73},
])
const additionalStringOptions = ref<string[]>([
    'Geen aanvullende verzekering geselecteerd',
    'Aanvullend 1 - € 21,38 per jaar',
    'Aanvullend 2 - € 85,06 per jaar',
    'Aanvullend 3 - € 198,63 per jaar',
    'Aanvullend 4 - € 359,73 per jaar'
])
const tempAdditionalInsurance = ref('Geen aanvullende verzekering geselecteerd')

const dentistOptions = ref<AdditionalInsuranceType[]>([
    { description: 'Geen tandartsverzekering geselecteerd', type: 'dentist', price: 0},
    { description: 'Tand 1 - € 80,28 per jaar', type: 'dentist', price: 80.28},
    { description: 'Tand 2 - € 221,65 per jaar', type: 'dentist', price: 221.65},
    { description: 'Tand 3 - € 449,36 per jaar', type: 'dentist', price: 449.36},
])
const dentistStringOptions = ref<string[]>([
    'Geen tandartsverzekering geselecteerd',
    'Tand 1 - € 80,28 per jaar',
    'Tand 2 - € 221,65 per jaar',
    'Tand 3 - € 449,36 per jaar'
])
const tempDentistInsurance = ref('Geen tandartsverzekering geselecteerd')

const assignPersonalRisk = () => {
    for (let i = 0; i < riskOptions.value.length; i++) {
        if (riskOptions.value[i].description.includes(tempRisk.value)) {
            insuranceInfo.personalRisk = riskOptions.value[i]
        }
    }
}

const assignAdditionalInsurance = () => {
    for (let i = 0; i < additionalOptions.value.length; i++) {
        if (additionalOptions.value[i].description.includes(tempAdditionalInsurance.value)) {
            insuranceInfo.aditional = additionalOptions.value[i]
        }
    }
}

const assignDentistInsurance = () => {
    for (let i = 0; i < dentistOptions.value.length; i++) {
        if (dentistOptions.value[i].description.includes(tempDentistInsurance.value)) {
            insuranceInfo.dentist = dentistOptions.value[i]
        }
    }
}

const nextPage = ():void => {
    assignPersonalRisk()
    assignAdditionalInsurance()
    assignDentistInsurance()
    router.push('/register/review')
}

const previousPage = ():void => {
    router.go(-1)
}
</script>
