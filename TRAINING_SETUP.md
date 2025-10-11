# Training Payment System Setup Guide

This document provides setup instructions for the DevOps training booking and payment system.

## Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# PhonePe Configuration
PHONEPE_MERCHANT_ID=your_merchant_id_here
PHONEPE_SALT_KEY=your_salt_key_here
PHONEPE_SALT_INDEX=1
PHONEPE_BASE_URL=https://api-preprod.phonepe.com/apis/pg-sandbox

# For Production PhonePe (uncomment when ready)
# PHONEPE_BASE_URL=https://api.phonepe.com/apis/pg-sandbox

# Google Sheets Integration (Optional)
GOOGLE_SHEETS_WEBHOOK_URL=your_google_sheets_webhook_url_here

# Enable/Disable Payment System
PHONEPE_ENABLED=true
```

## PhonePe Business Setup

### 1. Get PhonePe Credentials

1. Visit [PhonePe Business Portal](https://business.phonepe.com/)
2. Sign up/Login with your business details
3. Complete KYC and business verification
4. Navigate to "Payment Gateway" section
5. Get your Merchant ID, Salt Key, and Salt Index

### 2. Required Policy Pages

The following policy pages are already created and ready for PhonePe verification:

- **Terms & Conditions**: `/terms-and-conditions`
- **Privacy Policy**: `/privacy-policy`
- **Refund Policy**: `/refund-policy`
- **Shipping Policy**: `/shipping-policy`

Use these URLs in your PhonePe Business portal when configuring payment gateway.

### 3. PhonePe Configuration

In your PhonePe Business portal, configure:

- **Return URL**: `https://yourdomain.com/training/confirmation`
- **Cancel URL**: `https://yourdomain.com/training`
- **Webhook URL**: `https://yourdomain.com/api/payment/callback`

## Google Sheets Integration

### Option 1: Google Apps Script (Recommended)

1. Create a new Google Sheet
2. Go to Extensions → Apps Script
3. Create a new script with this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  if (e.postData) {
    const data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name', 'Email', 'Phone', 
        'Hours', 'Minutes', 'Total Amount', 
        'Transaction ID', 'Status'
      ]);
    }
    
    // Add booking data
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.hours,
      data.minutes,
      data.totalAmount,
      data.transactionId,
      data.status
    ]);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy as web app with execute permissions for "Anyone"
5. Copy the web app URL and use it as `GOOGLE_SHEETS_WEBHOOK_URL`

### Option 2: Zapier Integration

1. Create a Zapier account
2. Set up a webhook trigger
3. Configure Google Sheets action
4. Use the webhook URL in your environment variables

## Testing the System

### 1. Test Mode Setup

For testing, use PhonePe's sandbox environment:

```env
PHONEPE_BASE_URL=https://api-preprod.phonepe.com/apis/pg-sandbox
PHONEPE_MERCHANT_ID=PGTESTPAYUAT
PHONEPE_SALT_KEY=099eb0cd-02cf-4e2a-8aca-3c6faf0e5d80
PHONEPE_SALT_INDEX=1
```

### 2. Test Payment Flow

1. Visit `/training` page
2. Select training duration
3. Fill in test details:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
4. Click "Book Now"
5. Complete payment in PhonePe sandbox
6. Verify booking confirmation page
7. Check Google Sheets for booking data

### 3. Test Cards (Sandbox)

Use these test cards in PhonePe sandbox:

- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## Production Deployment

### 1. Update Environment Variables

```env
# Production PhonePe
PHONEPE_BASE_URL=https://api.phonepe.com/apis/pg-sandbox
PHONEPE_MERCHANT_ID=your_production_merchant_id
PHONEPE_SALT_KEY=your_production_salt_key
PHONEPE_SALT_INDEX=1
```

### 2. Update PhonePe Business Portal

1. Update return URLs with production domain
2. Update webhook URLs
3. Submit for verification
4. Wait for PhonePe approval

### 3. Domain Verification

Ensure your domain is properly configured and SSL certificate is active.

## Features Implemented

✅ **Policy Pages**: Terms & Conditions, Privacy Policy, Refund Policy, Shipping Policy
✅ **Training Page**: Responsive design with booking form
✅ **Hour Selector**: Real-time price calculation (₹500/hour)
✅ **User Form**: Validation for name, email, phone
✅ **Payment Integration**: PhonePe payment gateway
✅ **Booking Confirmation**: Success page with booking details
✅ **Google Sheets**: Automatic booking data storage
✅ **Navigation**: Training link in bottom navigation

## API Endpoints

- `POST /api/payment/initiate` - Initialize payment
- `POST /api/payment/callback` - Handle payment callback
- `GET /api/payment/status` - Check payment status

## Security Notes

- All API endpoints include PhonePe signature verification
- Sensitive data is not stored in client-side code
- Environment variables are used for credentials
- Payment amounts are validated server-side

## Support

For issues or questions:

1. Check browser console for errors
2. Verify environment variables are set correctly
3. Test with PhonePe sandbox first
4. Check Google Sheets webhook is working
5. Contact support if problems persist

## Next Steps

1. Set up PhonePe Business account
2. Configure environment variables
3. Test the complete flow
4. Deploy to production
5. Submit for PhonePe verification
