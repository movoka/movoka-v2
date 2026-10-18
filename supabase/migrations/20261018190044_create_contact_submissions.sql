/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions` — stores messages submitted from the MOVOKA contact form
- `id` (uuid, primary key)
- `name` (text, not null) — sender's full name
- `email` (text, not null) — sender's email
- `company` (text, nullable, optional) — sender's company
- `project_description` (text, not null) — project description / message
- `status` (text, default 'new') — processing status (new, read, archived)
- `created_at` (timestamptz, default now())

2. Security
- Enable RLS on contact_submissions.
- INSERT allowed for anon + authenticated (public contact form, no login).
- SELECT / UPDATE / DELETE restricted to authenticated (only site owner reads/manages submissions).
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project_description text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_contact" ON contact_submissions;
CREATE POLICY "auth_select_contact"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "auth_update_contact" ON contact_submissions;
CREATE POLICY "auth_update_contact"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_contact" ON contact_submissions;
CREATE POLICY "auth_delete_contact"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (true);
