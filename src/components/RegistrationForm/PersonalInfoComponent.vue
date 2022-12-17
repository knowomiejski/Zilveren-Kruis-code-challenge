<template>
<div>
    <h1>Aanmelden</h1>

    <div>
        <div @click="testForm()">click me</div>
    </div>


    <h2>Gegevens</h2>
    <div class="form-group">
        <h3>Reden van aanmelding</h3>
        <FormDropdown inputName="reason" label="Wat is de reden van uw aanvraag?" :options="reasonOptions" v-model="personalInfo.reason"/>
    </div>
    <div class="form-group">
        <h3>Persoonlijke gegevens</h3>

        <FormInput inputName="initials" label="Voorlettters" v-model="personalInfo.initials"/>
        <FormInput inputName="lastName" label="Achternaam" v-model="personalInfo.lastName"/>
        <div class="form-input my-4">
            <div class="input__group">
                <FormRadio inputName="sex" label="Geslacht" :options="sexOptions" v-model="personalInfo.sex"/>
            </div>
        </div>
        <FormInput inputName="bsn" label="Burgerservicenummer (BSN)" v-model="personalInfo.bsn" helper-text="Waar vind ik mijn BSN?" helper-link="https://kubasplantje.nl"/>
    </div>
</div>
</template>
<script setup lang="ts">
import { useRegistrationFormStore } from '@/stores/registration'
import { ref } from 'vue';
import FormInput from '../FormFields/FormInput.vue';
import FormDropdown from '../FormFields/FormDropdown.vue';
import FormRadio from '../FormFields/FormRadio.vue';
import { ReasonType } from '@/models/ReasonType';

const registrationStore = useRegistrationFormStore()
const personalInfo = registrationStore.registrationFormData.personalInfo

const reasonOptions = ref<ReasonType[]>([ReasonType.NEW, ReasonType.EXISTING])
const sexOptions = ref<string[]>(['Man', 'Vrouw'])

const testForm = ():void => {
    console.log(registrationStore.fullName)
    console.log(personalInfo.reason)
    console.log(personalInfo.sex)
}
</script>