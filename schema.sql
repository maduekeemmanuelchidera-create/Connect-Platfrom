-- CONNECT DATABASE SCHEMA
-- Run this in Supabase SQL Editor.
create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null default '',
  avatar_url text,
  bio text default '',
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  body text,
  media_url text,
  media_type text check (media_type in ('image','video','none')) default 'none',
  created_at timestamptz not null default now()
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  description text default '',
  video_url text not null,
  thumbnail_url text,
  duration_seconds integer,
  created_at timestamptz not null default now()
);

create table if not exists follows (
  follower_id uuid references profiles(id) on delete cascade,
  following_id uuid references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table if not exists post_likes (
  user_id uuid references profiles(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  is_group boolean not null default false,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists conversation_members (
  conversation_id uuid references conversations(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_id uuid references profiles(id) on delete cascade,
  body text,
  media_url text,
  message_type text check (message_type in ('text','image','video','audio')) default 'text',
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  actor_id uuid references profiles(id) on delete cascade,
  type text not null,
  reference_id uuid,
  is_read boolean default false,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table posts enable row level security;
alter table videos enable row level security;
alter table follows enable row level security;
alter table post_likes enable row level security;
alter table comments enable row level security;
alter table conversations enable row level security;
alter table conversation_members enable row level security;
alter table messages enable row level security;
alter table notifications enable row level security;

create policy "profiles readable" on profiles for select using (true);
create policy "profiles own insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles own update" on profiles for update using (auth.uid() = id);

create policy "posts readable" on posts for select using (true);
create policy "posts own insert" on posts for insert with check (auth.uid() = user_id);
create policy "posts own update" on posts for update using (auth.uid() = user_id);
create policy "posts own delete" on posts for delete using (auth.uid() = user_id);

create policy "videos readable" on videos for select using (true);
create policy "videos own insert" on videos for insert with check (auth.uid() = user_id);
create policy "videos own update" on videos for update using (auth.uid() = user_id);
create policy "videos own delete" on videos for delete using (auth.uid() = user_id);

create policy "follows readable" on follows for select using (true);
create policy "follow own insert" on follows for insert with check (auth.uid() = follower_id);
create policy "follow own delete" on follows for delete using (auth.uid() = follower_id);

create policy "likes readable" on post_likes for select using (true);
create policy "like own insert" on post_likes for insert with check (auth.uid() = user_id);
create policy "like own delete" on post_likes for delete using (auth.uid() = user_id);

create policy "comments readable" on comments for select using (true);
create policy "comment own insert" on comments for insert with check (auth.uid() = user_id);
create policy "comment own delete" on comments for delete using (auth.uid() = user_id);

create policy "conversation members readable" on conversation_members for select using (auth.uid() = user_id);
create policy "conversation member insert" on conversation_members for insert with check (auth.uid() = user_id);

create policy "messages members read" on messages for select using (
  exists (select 1 from conversation_members cm where cm.conversation_id = messages.conversation_id and cm.user_id = auth.uid())
);
create policy "messages own insert" on messages for insert with check (auth.uid() = sender_id);

create policy "notifications own read" on notifications for select using (auth.uid() = user_id);
create policy "notifications own update" on notifications for update using (auth.uid() = user_id);

-- New user profile trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data->>'display_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
