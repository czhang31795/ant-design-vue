import { mount } from '@vue/test-utils';
import Button from '..';

describe('component tag prefix', () => {
  it('registers xy-button', () => {
    const wrapper = mount(
      { template: '<xy-button type="primary">OK</xy-button>' },
      { global: { plugins: [Button] } },
    );
    expect(wrapper.find('button').text()).toBe('OK');
    expect(wrapper.find('.xy-btn').exists()).toBe(true);
    expect(wrapper.find('.ant-btn').exists()).toBe(false);
  });

  it('does not register a-button', () => {
    const wrapper = mount(
      { template: '<a-button type="primary">OK</a-button>' },
      { global: { plugins: [Button] } },
    );
    expect(wrapper.find('.xy-btn').exists()).toBe(false);
  });
});
