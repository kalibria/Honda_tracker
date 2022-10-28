import React from 'react';
import { SwitchesGroup } from 'src/settings/components';

export const SettingsPage = () => {
  return (
    <main>
      <SwitchesGroup
        note1={'booking is created?'}
        note2={'booking is changed'}
        title={'Get notifications when ...'}
      />
    </main>
  );
};
