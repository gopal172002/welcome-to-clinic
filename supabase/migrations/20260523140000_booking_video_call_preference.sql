-- Video call platform preference for online initial consultation bookings.
alter table public.bookings
add column if not exists video_call_preference text
check (
  video_call_preference is null
  or video_call_preference in ('whatsapp', 'zoom', 'google_meet', 'microsoft_teams', 'no_preference')
);
