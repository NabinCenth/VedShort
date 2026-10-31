create table Links (
  id uuid primary key default gen_random_uuid (),
  org_url text not null,
  short_id text unique not null,
  created_at timestamptz not null default now()
); 