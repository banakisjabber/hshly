# Hushly website design

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/hushlyagency-2077s-projects/v0-hshly)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/kHNXPSVXcmy)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/hushlyagency-2077s-projects/v0-hshly](https://vercel.com/hushlyagency-2077s-projects/v0-hshly)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/kHNXPSVXcmy](https://v0.app/chat/kHNXPSVXcmy)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Application Form Setup (Google Forms)

The application form submits directly to a Google Form backend. No Apps Script or paid APIs required.

### Getting the Form Action URL

1. Open your Google Form
2. The action URL is the form URL with `viewform` replaced by `formResponse`
   - Example: `https://docs.google.com/forms/d/e/FORM_ID/viewform`
   - Becomes: `https://docs.google.com/forms/d/e/FORM_ID/formResponse`

### Getting Entry IDs

Entry IDs come from the "Get pre-filled link" feature:

1. In your Google Form, click the three dots menu (⋮) in the top right
2. Select "Get pre-filled link"
3. Fill in sample data for each field
4. Click "Get link"
5. The URL will contain entry IDs like `entry.123456789=value`
6. Extract the numeric IDs (e.g., `123456789`) for each field

### Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/FORM_ID/formResponse
NEXT_PUBLIC_GF_ENTRY_NAME=123456789
NEXT_PUBLIC_GF_ENTRY_INSTAGRAM=987654321
NEXT_PUBLIC_GF_ENTRY_EMAIL=111222333
NEXT_PUBLIC_GF_ENTRY_ONLYFANS=444555666
NEXT_PUBLIC_GF_ENTRY_PRIOR_AGENCY=777888999
NEXT_PUBLIC_GF_ENTRY_CONTACT_METHOD=111222333
NEXT_PUBLIC_GF_ENTRY_PHONE=444555666
```

**Important:** 
- Replace the example IDs with your actual entry IDs
- The contact method options in your Google Form must be labeled exactly: "Email", "Phone", "Instagram"
- Restart your dev server after updating `.env.local`