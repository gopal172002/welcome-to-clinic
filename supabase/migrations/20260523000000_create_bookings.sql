create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  age integer,
  email text not null,
  phone text,
  session_type text not null check (session_type in ('online', 'offline')),
  preferred_date date,
  preferred_time time,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled'))
);

create index bookings_created_at_idx on public.bookings (created_at desc);

alter table public.bookings enable row level security;

create policy "Anyone can submit a booking"
on public.bookings
for insert
to anon, authenticated
with check (true);
