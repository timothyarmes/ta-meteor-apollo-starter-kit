import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import HeaderTitle from './header-title';

const messages = {
  notFoundTitle: 'notFoundTitle',
  homeHeaderTitle: 'homeHeaderTitle',
};

const testTitle = ({ path, label, curUser }) => {
  const wrapper = mount(
    <MemoryRouter
      initialEntries={[path]}
      initialIndex={0}
    >
      <IntlProvider locale="en" messages={messages}>
        <HeaderTitle curUser={curUser} />
      </IntlProvider>
    </MemoryRouter>,
  );

  expect(wrapper.find(HeaderTitle).text()).toBe(label);
};

describe('<HeaderTitle />', () => {
  it('should display Not Found if route does not exist', () => {
    testTitle({
      path: '/en/404-this-route-does-not-exist',
      label: 'notFoundTitle',
      curUser: null,
    });
  });

  it('should display homeHeaderTitle for the home route', () => {
    testTitle({
      path: '/en',
      label: 'homeHeaderTitle',
      curUser: null,
    });
  });
});
