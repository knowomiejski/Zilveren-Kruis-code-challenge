import type { InsuranceType } from "./InsuranceType"
import type PersonalRiskType from "./PersonalRiskType"
import type AdditionalInsuranceType from '@/models/AdditionalInsuranceType'

import type { ReasonType } from "./ReasonType"

export default interface RegistrationFormModel {
    personalInfo: {
        reason: ReasonType,
        initials: string,
        lastName: string,
        sex: string,
        dob: Date,
        bsn: string
    },
    insuranceInfo: {
        insuranceType: InsuranceType,
        paymentInterval: string,
        personalRisk: PersonalRiskType,
        aditional: AdditionalInsuranceType,
        dentist: AdditionalInsuranceType
    },
    bankingInfo: {
        iban: string,
        automaticInvoice: boolean
    }
}