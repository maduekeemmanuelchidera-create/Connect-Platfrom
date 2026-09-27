# CONNECT

Connect is a social platform starter combining:
- social feed / posts
- short vertical videos
- long-form videos
- private and group messaging
- profiles, follows, likes and comments
- notifications

## Stack
- Expo + React Native
- Expo Router
- Supabase Auth / PostgreSQL / Realtime / Storage
- Android package: com.xterol.connect
- iOS bundle ID: com.xterol.connect

## 1. Install
Install Node.js and Expo tooling, then:

```bash
npm install
```

## 2. Configure Supabase
Create a Supabase project.

1. Open `supabase/schema.sql`.
2. Run the SQL in Supabase SQL Editor.
3. Copy `config/env.example.js` to `config/env.js`.
4. Put your Supabase URL and anonymous key into `config/env.js`.

Do not put service-role keys inside the mobile app.

## 3. Run
```bash
npm start
```

Then choose Android, iOS or web.

## 4. Production setup still required
This package is a working app foundation, not a finished production social network. Before publishing, configure:
- Supabase Storage buckets for avatars, images, videos and audio
- Storage policies
- Realtime for chat
- Push notification provider
- Content moderation/reporting
- Email/phone authentication settings
- App Store / Google Play developer accounts
- Production privacy policy and terms
- Production signing credentials
- Backup, monitoring and abuse protection

## Suggested Storage buckets
- avatars
- post-media
- videos
- thumbnails
- message-media
- audio

## Branding
The uploaded Connect C logo is included at:
`assets/connect-logo.png`

Replace it with a square high-resolution production logo before publishing if necessary.

## Important
The app intentionally does not copy proprietary Facebook, YouTube, TikTok or WhatsApp code or branding. It implements original screens and common social-media functionality.
