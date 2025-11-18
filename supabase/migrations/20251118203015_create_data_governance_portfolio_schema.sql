/*
  # Data Governance Portfolio Schema
  
  ## Overview
  This migration creates the database structure for a Data Manager/Data Steward portfolio
  showcasing governance work at PETROSEN (Dec 2024 - July 2025).
  
  ## Tables Created
  
  ### 1. projects
  Main project information including context, objectives, and results
  - id, title, description, period, context, objectives, results, status
  
  ### 2. deliverables
  Key deliverables and outputs from the project
  - id, project_id, title, description, category, completion_percentage, delivery_date
  
  ### 3. kpis
  Performance indicators tracking project success metrics
  - id, name, initial_value, target_value, current_value, unit, improvement_percentage
  
  ### 4. tools
  Technologies and tools used throughout the project
  - id, name, category, description, icon
  
  ### 5. methodology_steps
  Structured methodology phases of the project
  - id, step_number, title, description, activities
  
  ## Security
  - RLS enabled on all tables
  - Public read access for portfolio display
  - No write access policies (data managed by admin)
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  period text NOT NULL,
  context text NOT NULL,
  objectives text[] NOT NULL DEFAULT '{}',
  results text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS deliverables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  completion_percentage integer DEFAULT 100,
  delivery_date date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kpis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  initial_value numeric NOT NULL,
  target_value numeric NOT NULL,
  current_value numeric NOT NULL,
  unit text NOT NULL DEFAULT '%',
  improvement_percentage numeric,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS methodology_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  activities text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE methodology_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to deliverables"
  ON deliverables FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to kpis"
  ON kpis FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to tools"
  ON tools FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to methodology_steps"
  ON methodology_steps FOR SELECT
  TO anon
  USING (true);