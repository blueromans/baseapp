/**
 * Application Configuration
 * Central configuration for app-wide settings
 */

import { Platform } from 'react-native';

interface IAppConfig {
  name: string;
  displayName: string;
  version: string;
  buildNumber: string;
  bundleId: {
    ios: string;
    android: string;
  };
  environment: 'development' | 'staging' | 'production';
  debug: boolean;

  // Feature flags
  features: {
    analytics: boolean;
    crashReporting: boolean;
    pushNotifications: boolean;
    biometricAuth: boolean;
    offlineMode: boolean;
    darkMode: boolean;
    socialLogin: {
      facebook: boolean;
      google: boolean;
      apple: boolean;
    };
  };

  // App behavior
  settings: {
    minAppVersion: string;
    forceUpdate: boolean;
    maintenanceMode: boolean;
    sessionTimeout: number; // in minutes
    maxRetryAttempts: number;
    cacheExpiration: number; // in seconds
    imageQuality: number; // 0-1
    maxImageSize: number; // in MB
    maxVideoSize: number; // in MB
    maxFileCacheSize: number; // in MB
  };

  // Deep linking
  deepLinking: {
    scheme: string;
    universalLinks: {
      ios: string[];
      android: string[];
    };
  };

  // Third-party services
  services: {
    sentry: {
      enabled: boolean;
      dsn: string;
      environment: string;
    };
    analytics: {
      enabled: boolean;
      trackingId: string;
    };
    mixpanel: {
      enabled: boolean;
      token: string;
    };
    onesignal: {
      enabled: boolean;
      appId: string;
    };
  };

  // Social media
  social: {
    facebook: {
      appId: string;
      appName: string;
    };
    google: {
      webClientId: string;
      iosClientId: string;
      androidClientId: string;
    };
    apple: {
      serviceName: string;
    };
  };

  // Legal
  legal: {
    privacyPolicyUrl: string;
    termsOfServiceUrl: string;
    copyrightText: string;
    supportEmail: string;
  };
}

const development: IAppConfig = {
  name: 'BaseApp',
  displayName: 'Base App Dev',
  version: '1.0.0',
  buildNumber: '1',
  bundleId: {
    ios: 'com.baseapp.dev',
    android: 'com.baseapp.dev',
  },
  environment: 'development',
  debug: true,

  features: {
    analytics: false,
    crashReporting: false,
    pushNotifications: true,
    biometricAuth: true,
    offlineMode: true,
    darkMode: true,
    socialLogin: {
      facebook: false,
      google: false,
      apple: Platform.OS === 'ios',
    },
  },

  settings: {
    minAppVersion: '1.0.0',
    forceUpdate: false,
    maintenanceMode: false,
    sessionTimeout: 30,
    maxRetryAttempts: 3,
    cacheExpiration: 3600,
    imageQuality: 0.8,
    maxImageSize: 5,
    maxVideoSize: 50,
    maxFileCacheSize: 100,
  },

  deepLinking: {
    scheme: 'baseapp-dev',
    universalLinks: {
      ios: ['https://dev.baseapp.com'],
      android: ['https://dev.baseapp.com'],
    },
  },

  services: {
    sentry: {
      enabled: false,
      dsn: '',
      environment: 'development',
    },
    analytics: {
      enabled: false,
      trackingId: '',
    },
    mixpanel: {
      enabled: false,
      token: '',
    },
    onesignal: {
      enabled: false,
      appId: '',
    },
  },

  social: {
    facebook: {
      appId: '',
      appName: 'BaseApp Dev',
    },
    google: {
      webClientId: '',
      iosClientId: '',
      androidClientId: '',
    },
    apple: {
      serviceName: 'BaseApp',
    },
  },

  legal: {
    privacyPolicyUrl: 'https://baseapp.com/privacy',
    termsOfServiceUrl: 'https://baseapp.com/terms',
    copyrightText: '© 2024 BaseApp. All rights reserved.',
    supportEmail: 'support@baseapp.com',
  },
};

const staging: IAppConfig = {
  ...development,
  displayName: 'Base App Staging',
  bundleId: {
    ios: 'com.baseapp.staging',
    android: 'com.baseapp.staging',
  },
  environment: 'staging',
  debug: false,

  features: {
    ...development.features,
    analytics: true,
    crashReporting: true,
  },

  deepLinking: {
    scheme: 'baseapp-staging',
    universalLinks: {
      ios: ['https://staging.baseapp.com'],
      android: ['https://staging.baseapp.com'],
    },
  },

  services: {
    ...development.services,
    sentry: {
      enabled: true,
      dsn: 'YOUR_STAGING_SENTRY_DSN',
      environment: 'staging',
    },
  },
};

const production: IAppConfig = {
  ...development,
  displayName: 'Base App',
  bundleId: {
    ios: 'com.baseapp',
    android: 'com.baseapp',
  },
  environment: 'production',
  debug: false,

  features: {
    analytics: true,
    crashReporting: true,
    pushNotifications: true,
    biometricAuth: true,
    offlineMode: true,
    darkMode: true,
    socialLogin: {
      facebook: true,
      google: true,
      apple: Platform.OS === 'ios',
    },
  },

  deepLinking: {
    scheme: 'baseapp',
    universalLinks: {
      ios: ['https://baseapp.com'],
      android: ['https://baseapp.com'],
    },
  },

  services: {
    sentry: {
      enabled: true,
      dsn: 'YOUR_PRODUCTION_SENTRY_DSN',
      environment: 'production',
    },
    analytics: {
      enabled: true,
      trackingId: 'YOUR_ANALYTICS_ID',
    },
    mixpanel: {
      enabled: true,
      token: 'YOUR_MIXPANEL_TOKEN',
    },
    onesignal: {
      enabled: true,
      appId: 'YOUR_ONESIGNAL_APP_ID',
    },
  },

  social: {
    facebook: {
      appId: 'YOUR_FACEBOOK_APP_ID',
      appName: 'BaseApp',
    },
    google: {
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
      iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID',
      androidClientId: 'YOUR_GOOGLE_ANDROID_CLIENT_ID',
    },
    apple: {
      serviceName: 'BaseApp',
    },
  },
};

// Environment detection
const getEnvironment = (): 'development' | 'staging' | 'production' => {
  if (__DEV__) return 'development';
  // You can use environment variables or build configurations here
  // For example: return process.env.APP_ENV as any || 'production';
  return 'production';
};

const configs = {
  development,
  staging,
  production,
};

export const Config = configs[getEnvironment()];
export type AppConfig = IAppConfig;
