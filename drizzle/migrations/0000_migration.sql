create type public.account_type as enum ('buyer','seller','renter');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  account_type public.account_type not null default 'buyer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Own profile read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Own profile update" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare t public.account_type;
begin
  begin
    t := coalesce(nullif(new.raw_user_meta_data->>'account_type',''),'buyer')::public.account_type;
  exception when others then t := 'buyer';
  end;
  insert into public.profiles (id, full_name, phone, account_type)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), new.raw_user_meta_data->>'phone', t)
  on conflict (id) do nothing;
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();