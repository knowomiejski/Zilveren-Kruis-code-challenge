import { defineStore } from 'pinia'
import type RegistrationFormModel from '@/models/RegistrationFormModel'
import insuranceTypes from '@/models/AvailibleInsuranceTypes'
import { ReasonType } from '@/models/ReasonType'
import type PersonalRiskType from '@/models/PersonalRiskType'
import type AdditionalInsuranceType from '@/models/AdditionalInsuranceType'



export const useRegistrationFormStore = defineStore({
    id: 'registrationForm',
    state: () => ({
        registrationFormData: {
            personalInfo: {
                reason: ReasonType.NEW,
                initials: '',
                lastName: '',
                sex: 'Man',
                bsn: ''
            },
            insuranceInfo: {
                insuranceType: insuranceTypes[0],
                paymentInterval: 'per jaar',
                personalRisk: { description: '€ 385 - verplicht eigen risico', price: 385} as PersonalRiskType,
                aditional: { description: 'Geen aanvullende verzekering geselecteerd', type: 'additional', price: 0} as AdditionalInsuranceType,
                dentist: { description: 'Geen tandartsverzekering geselecteerd', type: 'dentist', price: 0} as AdditionalInsuranceType
            },
            bankingInfo: {
                iban: '',
                automaticInvoice: true
            }
        } as RegistrationFormModel
    }),
    getters: {
        fullName ():string {
            return `${this.registrationFormData.personalInfo.initials} ${this.registrationFormData.personalInfo.lastName}`
        }
    },
})
