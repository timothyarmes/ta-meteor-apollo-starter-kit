import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Fieldset from '/imports/ui/components/dumb/fieldset';
import Label from '/imports/ui/components/dumb/label';
import Input from '/imports/ui/components/dumb/input';
import Form from './index';

storiesOf('Form', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Form', () => (
    <Form>
      <Fieldset>
        <Label htmlFor="label">
          Label
        </Label>
        <Input
          id="label"
          type="text"
          placeholder="placeholder"
          value=""
          onChange={() => {}}
        />
      </Fieldset>
    </Form>
  ));
