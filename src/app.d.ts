declare global {
  namespace App {
    interface Locals {
      analytics: {
        page: string;
        locale: 'sv' | 'en';
        country: string | null;
      };
    }
  }
}

export {};