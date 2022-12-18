<template>
<div>
    <h2>Gegevens</h2>
    <div class="form-group">
        <h3>Reden van aanmelding</h3>
        <FormDropdown inputName="reason" label="Wat is de reden van uw aanvraag?" :options="reasonOptions" v-model="personalInfo.reason"/>
    </div>
    <div class="form-group">
        <h3>Persoonlijke gegevens</h3>
        <div class="row">
            <div class="col-md-4" >
                <FormInput inputName="initials" :error="initialError" label="Voorlettters" v-model="personalInfo.initials"/>
            </div>
            <div class="col-md-8" >
                <FormInput inputName="lastName" :error="lastNameError" label="Achternaam" v-model="personalInfo.lastName"/>
            </div>
        </div>
        <FormDatePicker inputName="dob" label="Geboortedatum" v-model="personalInfo.dob"/>
        <div class="form-input">
            <div class="input__group">
                <FormRadio inputName="sex" :error="sexError" label="Geslacht" :options="sexOptions" v-model="personalInfo.sex"/>
            </div>
        </div>
        <FormInput inputName="bsn" :error="bsnError" label="Burgerservicenummer (BSN)" v-model="personalInfo.bsn" placeholder="633487223" helper-text="Waar vind ik mijn BSN?" helper-link="https://kubasplantje.nl"/>
        <div class="page-control-container my-4">
            <hr/>
            <div class="page-control-actions d-flex flex-row-reverse justify-content-between">
                <Button @handleClick="nextPage()" buttonType="primary" data-testid="registrationPersonalNextButton">
                    <div class="d-flex align-items-center">
                        <div class="mx-2">Ga verder naar</div>
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
</div>
</template>
<script setup lang="ts">
import { useRegistrationFormStore } from '@/stores/registration'
import { ref } from 'vue';
import FormInput from '../FormFields/FormInput.vue';
import FormDropdown from '../FormFields/FormDropdown.vue';
import FormRadio from '../FormFields/FormRadio.vue';
import Button from '../Shared/Button.vue';
import { ReasonType } from '@/models/ReasonType';
import router from '@/router';
import FormDatePicker from '../FormFields/FormDatePicker.vue';

const registrationStore = useRegistrationFormStore()
const personalInfo = registrationStore.registrationFormData.personalInfo

const initialError = ref<string>('')
const lastNameError = ref<string>('')
const sexError = ref<string>('')
const bsnError = ref<string>('')

const reasonOptions = ref<ReasonType[]>([ReasonType.NEW, ReasonType.EXISTING])
const sexOptions = ref<{ name: string, description: string | null }[]>([
    {
        name: 'Man',
        description: null
    },
    {
        name: 'Vrouw',
        description: null
    }
])

const validateForm = ():boolean => {
    let isValid = true
    if (personalInfo.initials.length <= 0) {
        initialError.value = "Vul aub uw voorletters in"
        isValid = false
    }
    if (personalInfo.lastName.length <= 0) {
        lastNameError.value = "Vul aub uw achternaam in"
        isValid = false
    }
    if (personalInfo.sex.length <= 0) {
        sexError.value = "Vul aub us geslacht in"
        isValid = false
    }
    if (personalInfo.bsn.length <= 0) {
        bsnError.value = "Vul aub uw bsn in"
        isValid = false
    } else if (!/^[0-9]{9}$/.test(personalInfo.bsn)) {
        bsnError.value = "Vul aub een geldige bsn in"
        isValid = false
    }
    return isValid;
}


const nextPage = ():void => {
    if (validateForm() === true) {
        router.push('/register/insurance')
    }
}
</script>