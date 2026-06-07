-- Secure doctor dashboard read without service-role key.
-- Run this in Supabase SQL Editor after the bookings table exists.

create table if not exists public._doctor_dashboard_secret (
  id int primary key default 1 check (id = 1),
  access_key text not null
);

alter table public._doctor_dashboard_secret enable row level security;
-- No select/insert policies: anon cannot read this table via REST API.

insert into public._doctor_dashboard_secret (id, access_key)
values (1, 'ManoNirmaan-Doctor-Read-2026')
on conflict (id) do update set access_key = excluded.access_key;

create or replace function public.get_doctor_bookings(access_key text)
returns setof public.bookings
language plpgsql
security definer
set search_path = public
as $$
declare
  expected text;
begin
  select s.access_key into expected
  from public._doctor_dashboard_secret s
  where s.id = 1;

  if access_key is null or access_key <> expected then
    raise exception 'Unauthorized';
  end if;

  return query
    select *
    from public.bookings
    order by created_at desc;
end;
$$;

revoke all on function public.get_doctor_bookings(text) from public;
grant execute on function public.get_doctor_bookings(text) to anon, authenticated;
