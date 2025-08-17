import React from 'react';
import Screen from '../../ui/Screen';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ThemeContext } from '../../context/ThemeContext';
import { storage } from '../../services/storage';

export default function SettingsScreen() {
  const { mode, toggle } = React.useContext(ThemeContext);

  return (
    <Screen>
      <Card title="Görünüş">
        <Button title={`Tema: ${mode === 'light' ? 'Light' : 'Dark'}`} onPress={toggle} />
      </Card>

      <Card title="Hesab" footer={<Button title="Çıxış" variant="ghost"
        onPress={async () => {
          await storage.clear();
        }} />}>
      </Card>
    </Screen>
  );
}
