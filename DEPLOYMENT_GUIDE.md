# 🚀 Deployment Guide - AI DevOps Training Platform

## Quick Start Checklist

### ✅ Phase 1: Current Status (COMPLETED)
- [x] Website code ready and pushed to GitHub
- [x] Training page created (`/training`)
- [x] Policy pages ready (Terms, Privacy, Refund, Shipping)
- [x] Payment API integrated (PhonePe)
- [x] Booking form with validation
- [x] Confirmation page ready
- [x] Footer updated with all links
- [x] Security implemented (all credentials server-side)

### ⏳ Phase 2: Get PhonePe Credentials (IN PROGRESS)
- [x] Client ID received: `your_phonepe_client_id`
- [x] Client Secret received: `your_phonepe_client_secret`
- [ ] **ACTION REQUIRED:** Request Merchant ID from PhonePe
- [ ] **ACTION REQUIRED:** Request Salt Key from PhonePe
- [ ] **ACTION REQUIRED:** Get Salt Index from PhonePe

**📧 Use the email template:** See `PHONEPE_EMAIL_TEMPLATE.md`

### 🔄 Phase 3: Vercel Deployment (NEXT STEP)
- [ ] Add environment variables to Vercel
- [ ] Redeploy the site
- [ ] Verify deployment at https://aidevops.in
- [ ] Check PhonePe status at https://aidevops.in/phonepe-status

---

## 📋 Step-by-Step Deployment

### Step 1: Request Missing PhonePe Credentials

1. **Open:** `PHONEPE_EMAIL_TEMPLATE.md`
2. **Copy the email content**
3. **Send to:** merchant.support@phonepe.com
4. **Wait for response** (usually 24-48 hours)

**Or call:** 1800-419-9966 and request Merchant ID, Salt Key

### Step 2: Add Environment Variables to Vercel

Once you have ALL credentials, go to Vercel:

1. **Login:** https://vercel.com
2. **Select Project:** ritikvirus-portfolio
3. **Go to:** Settings → Environment Variables
4. **Add these variables:**

```bash
# PhonePe Credentials (Add ALL of these)
PHONEPE_CLIENT_ID=your_phonepe_client_id
PHONEPE_CLIENT_SECRET=your_phonepe_client_secret
PHONEPE_MERCHANT_ID=[Get from PhonePe Support]
PHONEPE_SALT_KEY=[Get from PhonePe Support]
PHONEPE_SALT_INDEX=1
PHONEPE_BASE_URL=https://api-preprod.phonepe.com/apis/pg-sandbox

# Site Config
PUBLIC_PRIMARY_SITE=https://aidevops.in
PUBLIC_BLOG_SITE=https://aidevops.in
```

**Important:** Select all three environments (Production, Preview, Development) for each variable!

### Step 3: Redeploy

1. **Go to:** Deployments tab in Vercel
2. **Click:** Latest deployment
3. **Click:** "Redeploy" button
4. **Wait:** for build to complete (2-3 minutes)

### Step 4: Verify Deployment

1. **Visit:** https://aidevops.in
2. **Check:** Training page at https://aidevops.in/training
3. **Verify:** PhonePe status at https://aidevops.in/phonepe-status
4. **Test:** Try booking a session (use small amount for testing)

---

## 🔍 Troubleshooting Build Errors

### Error: "Module has no exported member"
**Cause:** Environment variables not loaded  
**Solution:** Add all variables to Vercel, redeploy

### Error: "Payment service not configured"
**Cause:** Missing Merchant ID or Salt Key  
**Solution:** Wait for PhonePe support response, add credentials

### Error: "503 Service Unavailable"
**Cause:** This is expected until full credentials are added  
**Solution:** Add all PhonePe credentials, redeploy

### Build Succeeds Locally But Fails on Vercel?
**Cause:** Environment variables exist locally but not on Vercel  
**Solution:** 
1. Check local `.env` file
2. Copy same variables to Vercel dashboard
3. Redeploy

---

## 🎯 Testing Guide

### Before Production

1. **Test in Sandbox Mode:**
   - URL: `https://api-preprod.phonepe.com/apis/pg-sandbox`
   - Use PhonePe test cards (provided by PhonePe)
   - Verify payment flow works

2. **Test Booking Flow:**
   - Fill booking form
   - Click "Proceed to Payment"
   - Complete payment (sandbox)
   - Check confirmation page
   - Verify booking details

3. **Test Policy Pages:**
   - Visit all policy pages
   - Ensure contact info is correct
   - Check responsive design

### Going Live (Production)

1. **Get PhonePe Production Approval:**
   - Contact PhonePe support
   - Request production access
   - Complete any required verification

2. **Switch to Production URL:**
   ```bash
   PHONEPE_BASE_URL=https://api.phonepe.com/apis/hermes
   ```

3. **Test with Real Payment:**
   - Book 1 hour session (₹500)
   - Complete real payment
   - Verify money is received
   - Check confirmation email/notification

4. **Monitor:**
   - Check Vercel logs for errors
   - Monitor PhonePe dashboard for transactions
   - Verify bookings are captured

---

## 📊 Current Deployment Status

### ✅ What's Working:
- Website is live and responsive
- Training page displays correctly
- Policy pages are accessible
- Form validation works
- Secure environment variable handling
- Payment API structure ready

### ⏳ What's Pending:
- PhonePe Merchant ID (waiting for support)
- PhonePe Salt Key (waiting for support)
- Payment processing (will work after credentials added)
- Live transaction testing

### 🎯 Final Steps:
1. Get credentials from PhonePe support
2. Add to Vercel environment variables
3. Redeploy
4. Test payment flow
5. Go live! 🚀

---

## 📞 Support & Resources

### PhonePe Support:
- **Email:** merchant.support@phonepe.com
- **Phone:** 1800-419-9966
- **Portal:** https://business.phonepe.com

### Your Contact Info:
- **Email:** ritikvirus6@gmail.com
- **Phone:** +91 8920279167
- **Website:** https://aidevops.in

### Documentation:
- **Environment Setup:** `ENV_SETUP_GUIDE.md`
- **Email Template:** `PHONEPE_EMAIL_TEMPLATE.md`
- **This Guide:** `DEPLOYMENT_GUIDE.md`

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Website loads at https://aidevops.in
- ✅ Training page works perfectly
- ✅ All policy pages accessible
- ✅ PhonePe status shows all green
- ✅ Test payment completes successfully
- ✅ Booking confirmation received
- ✅ No console errors
- ✅ Mobile responsive design works
- ✅ All links functional
- ✅ Contact information correct

---

## 🔄 Regular Maintenance

### Weekly:
- Check Vercel deployment logs
- Monitor PhonePe transaction dashboard
- Verify website is accessible

### Monthly:
- Review and update policy pages if needed
- Check for Astro/dependency updates
- Test payment flow

### As Needed:
- Rotate credentials if compromised
- Update pricing if changed
- Add new features/training options

---

**Last Updated:** October 15, 2025  
**Status:** Ready for deployment pending PhonePe credentials  
**Next Action:** Send email to PhonePe support using template

