import React from 'react';
import { BasicTextFields, SwitchesGroup } from 'src/settings/components';

export const SettingsPage = () => {
  return (
    <main className={'sm:w-60 flex flex-col'}>
      <SwitchesGroup
        note1={'booking is created'}
        note2={'booking is changed'}
        title={'Get notifications when ...'}
      />
      <BasicTextFields label={'Where the car was left?'} />
    </main>
  );
};
