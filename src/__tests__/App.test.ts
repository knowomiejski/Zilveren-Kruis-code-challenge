import { it, describe, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import App from './App.vue';

describe('App.vue', () => {
    it('Should render correctly', () => {
        const wrapper = shallowMount(App);

        expect(wrapper.element).toMatchSnapshot();
    });
});
