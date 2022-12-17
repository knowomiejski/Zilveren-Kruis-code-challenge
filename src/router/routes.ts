import MainPage from '@/layouts/MainPage.vue'
import InitialExampleComponent from '@/components/InitialExample/InitialExampleComponent.vue'
import RegistrationFormComponent from '@/components/RegistrationForm/RegistrationFormComponent.vue'
import PersonalInfoComponent from '@/components/RegistrationForm/PersonalInfoComponent.vue'
import InsuranceInfoComponent from '@/components/RegistrationForm/InsuranceInfoComponent.vue'
import ReviewInfoComponent from '@/components/RegistrationForm/ReviewInfoComponent.vue'

const routes = [
    {
        path: '',
        name: 'initialpage',
        component: InitialExampleComponent,
        meta: {
            layout: MainPage
        }
    },
    {
        path: '/register',
        name: 'register',
        redirect: '/register/personal',
        component: RegistrationFormComponent,
        meta: {
            layout: MainPage
        },
        children: [
            {
                path: 'personal',
                component: PersonalInfoComponent
            },
            {
                path: 'insurance',
                component: InsuranceInfoComponent
            },
            {
                path: 'review',
                component: ReviewInfoComponent
            }
        ]
    },

]

export default routes