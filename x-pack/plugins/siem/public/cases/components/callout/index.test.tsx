/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { mount } from 'enzyme';

import { CaseCallOut } from '.';

const defaultProps = {
  title: 'hey title',
};

describe('CaseCallOut ', () => {
  it('Renders single message callout', () => {
    const props = {
      ...defaultProps,
      message: 'we have one message',
    };

    const wrapper = mount(<CaseCallOut {...props} />);

    expect(
      wrapper
        .find(`[data-test-subj="callout-message-primary"]`)
        .last()
        .exists()
    ).toBeTruthy();
  });

  it('Renders multi message callout', () => {
    const props = {
      ...defaultProps,
      messages: [
        { ...defaultProps, description: <p>{'we have two messages'}</p> },
        { ...defaultProps, description: <p>{'for real'}</p> },
      ],
    };
    const wrapper = mount(<CaseCallOut {...props} />);
    expect(
      wrapper
        .find(`[data-test-subj="callout-message-primary"]`)
        .last()
        .exists()
    ).toBeFalsy();
    expect(
      wrapper
        .find(`[data-test-subj="callout-messages-primary"]`)
        .last()
        .exists()
    ).toBeTruthy();
  });

  it('it shows the correct type of callouts', () => {
    const props = {
      ...defaultProps,
      messages: [
        {
          ...defaultProps,
          description: <p>{'we have two messages'}</p>,
          errorType: 'danger' as 'primary' | 'success' | 'warning' | 'danger',
        },
        { ...defaultProps, description: <p>{'for real'}</p> },
      ],
    };
    const wrapper = mount(<CaseCallOut {...props} />);
    expect(
      wrapper
        .find(`[data-test-subj="callout-messages-danger"]`)
        .last()
        .exists()
    ).toBeTruthy();

    expect(
      wrapper
        .find(`[data-test-subj="callout-messages-primary"]`)
        .last()
        .exists()
    ).toBeTruthy();
  });

  it('Dismisses callout', () => {
    const props = {
      ...defaultProps,
      message: 'we have one message',
    };
    const wrapper = mount(<CaseCallOut {...props} />);
    expect(wrapper.find(`[data-test-subj="case-call-out-primary"]`).exists()).toBeTruthy();
    wrapper
      .find(`[data-test-subj="callout-dismiss-primary"]`)
      .last()
      .simulate('click');
    expect(wrapper.find(`[data-test-subj="case-call-out-primary"]`).exists()).toBeFalsy();
  });
});
