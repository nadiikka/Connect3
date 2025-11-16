import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.codegarden.Connect3',
  appName: 'Connect3',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;