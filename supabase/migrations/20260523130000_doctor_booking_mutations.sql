-- Run in Supabase SQL Editor after get_doctor_bookings exists.

create or replace function public.update_doctor_booking_status(
  access_key text,
  booking_id uuid,
  new_status text
)
returns public.bookings
language plpgsql
security definer
set search_path = public
as $$
declare
  expected text;
  updated_row public.bookings;
begin
  select s.access_key into expected
  from public._doctor_dashboard_secret s
  where s.id = 1;

  if access_key is null or access_key <> expected then
    raise exception 'Unauthorized';
  end if;

  if new_status not in ('pending', 'confirmed', 'cancelled') then
    raise exception 'Invalid status';
  end if;

  update public.bookings
  set status = new_status
  where id = booking_id
  returning * into updated_row;

  if updated_row.id is null then
    raise exception 'Booking not found';
  end if;

  return updated_row;
end;
$$;

create or replace function public.delete_doctor_booking(
  access_key text,
  booking_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  expected text;
  deleted_id uuid;
begin
  select s.access_key into expected
  from public._doctor_dashboard_secret s
  where s.id = 1;

  if access_key is null or access_key <> expected then
    raise exception 'Unauthorized';
  end if;

  delete from public.bookings
  where id = booking_id
  returning id into deleted_id;

  if deleted_id is null then
    raise exception 'Booking not found';
  end if;

  return true;
end;
$$;

revoke all on function public.update_doctor_booking_status(text, uuid, text) from public;
grant execute on function public.update_doctor_booking_status(text, uuid, text) to anon, authenticated;

revoke all on function public.delete_doctor_booking(text, uuid) from public;
grant execute on function public.delete_doctor_booking(text, uuid) to anon, authenticated;
