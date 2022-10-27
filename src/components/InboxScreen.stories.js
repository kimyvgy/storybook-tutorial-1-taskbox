import React from 'react';
import { Provider } from 'react-redux';

import InboxScreen from './InboxScreen';
import store from '../lib/store';

import { rest } from 'msw';
import { MockedState } from './TaskList.stories';

export default {
  title: 'InboxScreen',
  component: InboxScreen,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
}

const Template = (args) => <InboxScreen {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.json(MockedState.tasks));
        }
      ),
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ),
    ],
  },
};
