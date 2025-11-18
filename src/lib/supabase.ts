import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  context: string;
  objectives: string[];
  results: string[];
  status: string;
  created_at: string;
}

export interface Deliverable {
  id: string;
  project_id: string;
  title: string;
  description: string;
  category: string;
  completion_percentage: number;
  delivery_date: string | null;
  created_at: string;
}

export interface KPI {
  id: string;
  name: string;
  initial_value: number;
  target_value: number;
  current_value: number;
  unit: string;
  improvement_percentage: number | null;
  created_at: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface MethodologyStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  activities: string[];
  created_at: string;
}
