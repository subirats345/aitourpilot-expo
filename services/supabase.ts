import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kggiicpaslgqaqglhhei.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZ2lpY3Bhc2xncWFxZ2xoaGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1NDkyNTUsImV4cCI6MjAwNjEyNTI1NX0.JxyNchPYWJoX0LwQYHSxPYKRAQumhN998K8PlDJmZqQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
