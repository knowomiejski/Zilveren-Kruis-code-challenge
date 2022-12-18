<template>
    <div>
        <h2 class="mt-5">Controleren</h2>
        <div class="form-group">
            <h3>Gekozen pakket</h3>
            <h3>{{registrationStore.fullName}} (bday)</h3>
        </div>
        <div>
            <div>
                <PriceOverviewListItem title="Basisverzekering" :description="registrationFormData.insuranceInfo.insuranceType.name" :price="registrationFormData.insuranceInfo.insuranceType.price" :paymentInterval="paymentInterval()"/>
                <PriceOverviewListItem title="Eigen risico" :description="registrationFormData.insuranceInfo.personalRisk.description" :paymentInterval="paymentInterval()"/>
                <PriceOverviewListItem title="Aanvullende verzekering" :description="registrationFormData.insuranceInfo.aditional.description" :price="registrationFormData.insuranceInfo.aditional.price" :paymentInterval="paymentInterval()"/>
                <PriceOverviewListItem title="Tandartsverzekering" :description="registrationFormData.insuranceInfo.dentist.description" :price="registrationFormData.insuranceInfo.dentist.price" :paymentInterval="paymentInterval()"/>
            </div>
        </div>
        <div class="form-group">
            <div class="card card-primary p-3">
                <h3>Totaal {{ registrationFormData.insuranceInfo.paymentInterval }} in {{ new Date().getFullYear() }}</h3>
                <h2 class="my-2">€ {{totalPrice().value.toFixed(2)}}</h2>
            </div>
        </div>
        <div class="form-group">
            <h3 class="my-2">Adres en contactgegevens</h3>
            <div class="addess">
                <div>{{registrationStore.fullName}}</div>
                <div>Adresstraat 1</div>
                <div>1234CB Stad</div>
            </div>
            <div class="addess">
                <div>email@example.com</div>
                <div>06 12345678</div>
            </div>
        </div>
        <div>
            <h3 class="my-2">Over de overstap</h3>
            <ul>
                <li>Ik wil per 1 januari 2023 overstappen naar Zilveren Kruis</li>
                <li>Wij zeggen je huidige basisverzekering en aanvullende verzekering voor je op.</li>
            </ul>
        </div>
        <hr/>
        <div class="banking-details-container">
            <FormInput inputName="iban" :error="ibanError" label="IBAN Rekeningnummer" placeholder="NL 00 BUNQ 12345678890" v-model="registrationFormData.bankingInfo.iban"/>
            <FormRadio inputName="automaticInvoice" :options="automaticInvoiceOptions" label="Betaalwijze" :vertical="true" v-model="automaticInvoice"/>
        </div>
        <div class="page-control-container my-4">
            <hr/>
            <div class="page-control-actions d-flex justify-content-between">
                <Button @handleClick="previousPage()" buttonType="primary" :outlined="true">
                    <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                        <div class="mx-2">Terug naar verzekering</div>
                    </div>
                </Button>
                <Button @handleClick="sendForm()" buttonType="primary">
                    <div class="d-flex align-items-center">
                        <div class="mx-2">Verstuur mijn aanvraag</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </div>
                </Button>
            </div>
            <div class="d-flex flex-row-reverse">
                <div>Binnen 14 dagen gratis annuleren</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRegistrationFormStore } from '@/stores/registration'
import PriceOverviewListItem from '../Shared/PriceOverviewListItem.vue';
import Button from '../Shared/Button.vue';
import FormInput from '../FormFields/FormInput.vue';
import FormRadio from '../FormFields/FormRadio.vue';
import router from '@/router';
import { is } from '@babel/types';
const registrationStore = useRegistrationFormStore()
const registrationFormData = registrationStore.registrationFormData

const automaticInvoice = 'Automatische incasso'
const automaticInvoiceOptions:{ name: string, description: string | null }[] = [
    {
        name: 'Automatische incasso',
        description: null
    },
    {
        name: 'Rekening per mail',
        description: 'Je krijgt uw rekening via email@example.com. Dan betaal je makkelijk en veilig via iDeal'
    }
]

const paymentInterval = ():number => {
    switch(registrationFormData.insuranceInfo.paymentInterval) {
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

const totalPrice = ():Ref<number> => {
    return ref((registrationFormData.insuranceInfo.insuranceType.price + registrationFormData.insuranceInfo.aditional.price + registrationFormData.insuranceInfo.dentist.price) / paymentInterval())
}

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

const ibanError = ref<string>('')

const validateForm = ():boolean => {
    let isValid = true
    if (/^NL [0-9]{2} [A-z0-9]{4} [0-9]{10}$/.test(registrationFormData.bankingInfo.iban) === false) {
        ibanError.value = 'Vul aub een geldige iban in'
        isValid = false
    }
    return isValid
}

const sendForm = ():void => {
    if (validateForm()) {
        registrationStore.sendToServer()
    }
}

const previousPage = ():void => {
    router.go(-1)
}

</script>