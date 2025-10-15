# Environment Variables Setup Guide

## 🔒 Security Note
**NEVER commit `.env` files to GitHub!** All sensitive credentials should only be added to:
- Local `.env` file (already in .gitignore)
- Vercel Dashboard → Environment Variables

---

## 📋 Required Environment Variables

### 1. PhonePe Payment Integration (REQUIRED for payments)

```bash
# Client Credentials (You have these)
PHONEPE_CLIENT_ID=SU2510131850256414659332
PHONEPE_CLIENT_SECRET=61c35513-3010-4ef3-9c3e-52ac2bdd2654

# Merchant Credentials (Request from PhonePe Support - see PHONEPE_EMAIL_TEMPLATE.md)
PHONEPE_MERCHANT_ID=your_merchant_id_from_phonepe_support
PHONEPE_SALT_KEY=your_salt_key_from_phonepe_support
PHONEPE_SALT_INDEX=1

# API Base URL (Use sandbox for testing, production when approved)
# For Testing (Sandbox):
PHONEPE_BASE_URL=https://api-preprod.phonepe.com/apis/pg-sandbox

# For Production (After approval):
# PHONEPE_BASE_URL=https://api.phonepe.com/apis/hermes
```

### 2. Site Configuration (REQUIRED)

```bash
PUBLIC_PRIMARY_SITE=https://aidevops.in
PUBLIC_BLOG_SITE=https://aidevops.in
```

### 3. Optional Integrations (Already configured)

```bash
# GitHub (for portfolio activity display)
GITHUB_ACCESS_TOKEN=your_github_personal_access_token

# Spotify (for now playing widget)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# MonkeyType (for typing speed display)
MONKEYTYPE_API_KEY=your_monkeytype_api_key

# MapTiler (for map display)
MAPTILER_API_KEY=your_maptiler_api_key
```

---

## 🚀 Setup Instructions

### Local Development

1. **Create `.env` file in project root:**
   ```bash
   cd /home/devsecops/Desktop/My_Projects/ritikvirus-portfolio
   touch .env
   ```

2. **Add environment variables** (copy from above and fill in your values)

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Check PhonePe status:**
   Visit: `http://localhost:4321/phonepe-status`

### Vercel Deployment

1. **Go to Vercel Dashboard:**
   - Login to https://vercel.com
   - Select your project: `ritikvirus-portfolio`
   - Go to: Settings → Environment Variables

2. **Add PhonePe Credentials:**
   
   Click "Add New" and add each variable:

   **Name:** `PHONEPE_CLIENT_ID`  
   **Value:** `SU2510131850256414659332`  
   **Environment:** ✅ Production, ✅ Preview, ✅ Development

   **Name:** `PHONEPE_CLIENT_SECRET`  
   **Value:** `61c35513-3010-4ef3-9c3e-52ac2bdd2654`  
   **Environment:** ✅ Production, ✅ Preview, ✅ Development

   **IMPORTANT:** After getting Merchant ID and Salt Key from PhonePe support, add:

   **Name:** `PHONEPE_MERCHANT_ID`  
   **Value:** `[Your Merchant ID from PhonePe Support]`  
   **Environment:** ✅ Production, ✅ Preview, ✅ Development

   **Name:** `PHONEPE_SALT_KEY`  
   **Value:** `[Your Salt Key from PhonePe Support]`  
   **Environment:** ✅ Production, ✅ Preview, ✅ Development

   **Name:** `PHONEPE_SALT_INDEX`  
   **Value:** `1`  
   **Environment:** ✅ Production, ✅ Preview, ✅ Development

   **Name:** `PHONEPE_BASE_URL`  
   **Value:** `https://api-preprod.phonepe.com/apis/pg-sandbox`  
   **Environment:** ✅ Production, ✅ Preview, ✅ Development

3. **Add Site Configuration:**

   **Name:** `PUBLIC_PRIMARY_SITE`  
   **Value:** `https://aidevops.in`  
   **Environment:** ✅ Production, ✅ Preview, ✅ Development

   **Name:** `PUBLIC_BLOG_SITE`  
   **Value:** `https://aidevops.in`  
   **Environment:** ✅ Production, ✅ Preview, ✅ Development

4. **Redeploy:**
   After adding all environment variables, trigger a new deployment:
   - Go to: Deployments tab
   - Click on latest deployment
   - Click "Redeploy" button

---

## ✅ Verification Checklist

### Before Requesting PhonePe Credentials:
- ✅ Website is live at https://aidevops.in
- ✅ All policy pages are accessible
- ✅ Training page is ready
- ✅ Business is registered with PhonePe
- ✅ Client ID and Client Secret received

### After Receiving PhonePe Credentials:
- ✅ Add all credentials to Vercel environment variables
- ✅ Redeploy the site
- ✅ Visit https://aidevops.in/phonepe-status
- ✅ All indicators should show green checkmarks
- ✅ Test a dummy booking
- ✅ Verify payment flow works end-to-end

### Before Going Live:
- ✅ Test payment in sandbox mode
- ✅ Get PhonePe approval for production
- ✅ Switch `PHONEPE_BASE_URL` to production URL
- ✅ Test with real payment (small amount)
- ✅ Verify booking data is captured
- ✅ Confirm email notifications work

---

## 🐛 Troubleshooting

### Build Failing on Vercel?
**Issue:** Environment variables not set  
**Solution:** Add all required variables in Vercel dashboard, then redeploy

### Payment Not Working?
**Issue:** Missing Merchant ID or Salt Key  
**Solution:** Contact PhonePe support using template in `PHONEPE_EMAIL_TEMPLATE.md`

### PhonePe Status Shows Red?
**Issue:** Credentials not configured  
**Solution:** Check Vercel environment variables, ensure all are added correctly

### 503 Error When Booking?
**Issue:** Full credentials not available  
**Solution:** This is expected until you get Merchant ID and Salt Key from PhonePe

---

## 📞 Support Contacts

**PhonePe Support:**
- Email: merchant.support@phonepe.com
- Phone: 1800-419-9966
- Business Portal: https://business.phonepe.com

**Vercel Support:**
- Dashboard: https://vercel.com/support
- Documentation: https://vercel.com/docs

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all secrets
3. **Rotate credentials** if accidentally exposed
4. **Limit access** to environment variables
5. **Use different credentials** for development and production
6. **Monitor API usage** for unusual activity
7. **Enable 2FA** on all service accounts

---

## 📚 Additional Resources

- [PhonePe API Documentation](https://developer.phonepe.com)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)
- [Security Best Practices](https://owasp.org/www-project-top-ten/)

