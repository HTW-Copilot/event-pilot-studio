/**
 * Configuration management for HTW Host Copilot
 * 
 * This module provides type-safe access to environment variables and configuration.
 * For Vite projects, environment variables must be prefixed with VITE_ to be accessible
 * in the browser, or used in Supabase Edge Functions for server-side values.
 */

interface Config {
  // Supabase Configuration
  supabase: {
    url: string;
    anonKey: string;
  };
  
  // API Keys (server-side only, accessed via Supabase Edge Functions)
  openai: {
    apiKey?: string; // Will be accessed via edge functions
  };
  
  // Application Settings
  app: {
    timezone: string;
    adminToken?: string; // Will be accessed via edge functions
  };
  
  // Feature Flags
  features: {
    seedingEnabled: boolean;
    debugMode: boolean;
  };
}

/**
 * Get environment variable with fallback and validation
 */
function getEnvVar(key: string, defaultValue?: string, required: boolean = false): string | undefined {
  // For Vite, environment variables are accessed via import.meta.env
  const value = (import.meta.env as any)[key] || defaultValue;
  
  if (required && !value) {
    console.error(`Missing required environment variable: ${key}`);
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
}

/**
 * Create configuration object with environment variables
 * Currently using hardcoded values for demo, but ready for environment variables
 */
export const config: Config = {
  supabase: {
    // These are currently hardcoded in client.ts but should be moved to env vars
    url: getEnvVar('VITE_SUPABASE_URL') || 'https://bjgwsrwkwyxzisvvlfch.supabase.co',
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZ3dzcndrd3l4emlzdnZsZmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTUyNTEsImV4cCI6MjA3MzM3MTI1MX0.kemVeV-36zRnT7rnprollu6NLWBs00KaR-NCVPqoaUw'
  },
  
  openai: {
    // This will be accessed via Supabase Edge Functions secrets, not browser env
    apiKey: undefined // Retrieved server-side via Deno.env.get('OPENAI_API_KEY')
  },
  
  app: {
    timezone: getEnvVar('VITE_TIMEZONE', 'Pacific/Honolulu'),
    adminToken: undefined // Retrieved server-side via Deno.env.get('ADMIN_TOKEN')
  },
  
  features: {
    seedingEnabled: getEnvVar('VITE_ENABLE_SEEDING') === 'true',
    debugMode: getEnvVar('VITE_DEBUG_MODE') === 'true'
  }
};

/**
 * Validate configuration on startup
 */
export function validateConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate Supabase configuration
  if (!config.supabase.url) {
    errors.push('Supabase URL is required');
  }
  
  if (!config.supabase.anonKey) {
    errors.push('Supabase anonymous key is required');
  }
  
  // Validate timezone
  try {
    Intl.DateTimeFormat(undefined, { timeZone: config.app.timezone });
  } catch (error) {
    errors.push(`Invalid timezone: ${config.app.timezone}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Format date according to configured timezone
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleString('en-US', {
    timeZone: config.app.timezone,
    ...options
  });
}

/**
 * Get configuration for display (masks sensitive values)
 */
export function getConfigForDisplay() {
  return {
    supabase: {
      url: config.supabase.url,
      anonKey: config.supabase.anonKey ? `${config.supabase.anonKey.substring(0, 20)}...` : 'Not set'
    },
    app: {
      timezone: config.app.timezone,
      adminToken: config.openai.apiKey ? '***SET***' : 'Not set'
    },
    features: config.features
  };
}

// Validate configuration on module load
const validation = validateConfig();
if (!validation.isValid) {
  console.warn('Configuration validation failed:', validation.errors);
}