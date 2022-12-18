import { it, describe, expect, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, type RenderResult } from '@testing-library/vue';
import MainPage from '@/layouts/MainPage.vue';
import InitialExampleComponent from '@/components/InitialExample/InitialExampleComponent.vue';
import RegistrationFormComponent from '@/components/RegistrationForm/RegistrationFormComponent.vue';
import PersonalInfoComponent from '@/components/RegistrationForm/PersonalInfoComponent.vue';
import InsuranceInfoComponent from '@/components/RegistrationForm/InsuranceInfoComponent.vue';
import ReviewInfoComponent from '@/components/RegistrationForm/ReviewInfoComponent.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import routes from '../../router/routes'

describe('RegistrationFormComponent', () => {
    let registrationFormComponentUnderTesting: RenderResult
    let router: Router

    beforeEach(() => {
        setActivePinia(createPinia())
        router = createRouter({
            history: createWebHistory(import.meta.env.BASE_URL),
            routes: [
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
                            component: PersonalInfoComponent,
                            meta: {
                                registerStepper: 1
                            }
                        },
                        {
                            path: 'insurance',
                            component: InsuranceInfoComponent,
                            meta: {
                                registerStepper: 2
                        }
                        },
                        {
                            path: 'review',
                            component: ReviewInfoComponent,
                            meta: {
                                registerStepper: 3
                            }
                        }
                    ]
                },
            ]
        })
        registrationFormComponentUnderTesting = render( RegistrationFormComponent, {
            global: {
                plugins: [router]
            }
        })
    })

    afterEach( () => {
        registrationFormComponentUnderTesting.unmount()
        registrationFormComponentUnderTesting.unmount()
    })

    it('should render correctly', async () => {
        const expectedFormTitle = 'Aanmelden'
        router.push('/register/personal')
        await router.isReady()
        expect(registrationFormComponentUnderTesting.baseElement.innerHTML.includes(expectedFormTitle)).toBe(true);
    });

    it('should display a validation error on an empty bsn number', async () => {
        const buttonTestId = 'registrationPersonalNextButton'
        const expectedEmptyBsnError = 'Vul aub uw bsn in'
        router.push('/register/personal')
        await router.isReady()
        await fireEvent.click(registrationFormComponentUnderTesting.getByTestId(buttonTestId))
        expect(registrationFormComponentUnderTesting.baseElement.innerHTML.includes(expectedEmptyBsnError)).toBe(true);
    });


    it('should display a validation error on an invalid bsn number', async () => {
        const buttonTestId = 'registrationPersonalNextButton'
        const bsnInputLabel = 'Burgerservicenummer (BSN)'
        const expectedEmptyBsnError = 'Vul aub een geldige bsn in'
        router.push('/register/personal')
        await router.isReady()
        await fireEvent.update(registrationFormComponentUnderTesting.getByLabelText(bsnInputLabel, {selector: 'input'}), '1' )
        await fireEvent.click(registrationFormComponentUnderTesting.getByTestId(buttonTestId))
        expect(registrationFormComponentUnderTesting.baseElement.innerHTML.includes(expectedEmptyBsnError)).toBe(true);
    });
});
