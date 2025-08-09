import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and Anon Key
const supabaseUrl = 'https://jwcuwikwuhqzqnonamcj.supabase.co'; // e.g., https://your-project.supabase.co
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3Y3V3aWt3dWhxenFub25hbWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NjQ1NTIsImV4cCI6MjA3MDE0MDU1Mn0.izR5kaS8gPtGCDxVvYl5vu9cZsNp0nFZo8nziZp8Aic';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // This ensures the session is persisted (default is true)
    autoRefreshToken: true, // Automatically refresh the token when it expires
    detectSessionInUrl: false, // Not needed for React Native
    storage:AsyncStorage
  },
});