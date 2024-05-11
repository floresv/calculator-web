import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Side from '../Side.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Side, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
