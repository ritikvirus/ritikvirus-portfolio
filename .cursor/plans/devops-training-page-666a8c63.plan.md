<!-- 666a8c63-574e-4ad2-af6f-5b551c4352fb 67229547-b169-413d-8342-8fa1959210ed -->
# Premium DevOps Training Page Implementation

## Overview

Build a professional training booking system with payment gateway integration that will pass business portal verification requirements (PhonePe, PayU). Focus on simplicity and platform compliance.

## Phase 1: Policy Pages (Required for PhonePe Business Verification)

Create three policy pages using the provided content from `phonepay-policy-page/Policies.txt`:

### Files to Create:

1. **`src/pages/terms-and-conditions.astro`**

   - Use content from lines 1-44 of Policies.txt
   - Format with proper headings and sections
   - Styled with existing portfolio theme (zinc-950 bg, zinc-200/400 text)

2. **`src/pages/privacy-policy.astro`**

   - Use content from lines 45-76 of Policies.txt
   - Include sections: Introduction, Collection, Usage, Sharing, Security, Data Deletion, Rights, Consent, Grievance Officer
   - Same styling as T&C page

3. **`src/pages/refund-policy.astro`**

   - Combine Refund/Cancellation (lines 77-89), Return (lines 90-102), and Shipping (lines 104-107)
   - Adapt shipping policy for digital services
   - Same consistent styling

### Styling Requirements:

- Use BaseLayout for consistency
- Typography: prose class for content readability
- Headings: text-zinc-200, text-2xl/xl
- Body text: text-zinc-400, tracking-wide
- Max width: 800px centered
- Add to Footer links under "This site" section

## Phase 2: Training Page - Main Landing

### File: `src/pages/training.astro`

**Structure:**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import Image from '@/components/Image'
import trainingHeroImage from '@/assets/DevOps_training_.png'
---
```

**Sections:**

1. **Hero Section**

   - Display DevOps_training_.png hero image
   - Heading: "DevOps Live Training" / "1-on-1 Career Development Program"
   - Subheading: "Expert mentorship · Real-world projects · ₹500/hour"
   - CTA: "Book Your Session" button → scroll to booking form

2. **Features Grid** (3 columns, responsive)

   - AWS, Kubernetes, Docker
   - CI/CD Pipelines & Automation
   - Security Best Practices (DevSecOps)
   - Live project guidance
   - Flexible scheduling
   - Industry-proven techniques

3. **Pricing Display**

   - Large text: "₹500 per hour"
   - Bullet points: No hidden fees, Pay as you learn, Flexible duration

4. **Interactive Booking Form** (React component)

   - See Phase 3 below

## Phase 3: Booking Form Component

### File: `src/components/TrainingBooking/TrainingBookingForm.tsx`

**Form Fields:**

```typescript
interface BookingFormData {
  name: string
  email: string
  phone: string
  hours: number
  minutes: number
  totalAmount: number
  paymentMethod: 'phonepe' | 'payu'
}
```

**UI Features:**

1. **User Details Section**

   - Name (required, text input)
   - Email (required, email validation)
   - Phone (required, Indian format +91)

2. **Duration Selector**

   - Hours: Number input (min: 1, max: 100)
   - Minutes: Dropdown (0, 15, 30, 45)
   - Real-time price calculation display
   - Example: "10 hours 30 minutes = ₹5,250"

3. **Payment Method Selection**

   - Radio buttons: PhonePe (default) | PayU
   - Show respective logos

4. **Total & CTA**

   - Large display of calculated amount
   - "Proceed to Payment" button
   - Disabled until form valid

**Validation:**

- All fields required
- Email format check
- Phone: 10 digits
- Minimum 1 hour booking

**Styling:**

- Dark theme matching portfolio
- Input fields: border-zinc-700, focus:border-emerald-400
- Button: emerald-500 bg, hover effects
- Responsive: Stack on mobile

## Phase 4: API Endpoints

### File: `src/pages/api/training/create-booking.ts`

**Endpoint:** `POST /api/training/create-booking`

**Request Body:**

```typescript
{
  name: string
  email: string
  phone: string
  hours: number
  minutes: number
  totalAmount: number
  paymentMethod: 'phonepe' | 'payu'
}
```

**Process:**

1. Validate input data
2. Generate unique booking ID (timestamp + random)
3. Save to Google Sheets via Google Sheets API
4. Return booking ID + payment redirect URL

**Response:**

```typescript
{
  success: boolean
  bookingId: string
  paymentUrl: string
  message: string
}
```

### Google Sheets Integration

**Setup Required (Manual):**

1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create Service Account
4. Download credentials JSON
5. Add to `.env` file

**Environment Variables:**

```
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEET_ID=
```

**Sheet Structure:**

| Booking ID | Date | Name | Email | Phone | Hours | Minutes | Amount | Payment Method | Status |

|------------|------|------|-------|-------|-------|---------|--------|----------------|--------|

**Library:** Use `google-spreadsheet` npm package

### File: `src/pages/api/training/verify-payment.ts`

**Endpoint:** `POST /api/training/verify-payment`

For payment callback/webhook handling (PhonePe/PayU will call this)

## Phase 5: Payment Integration

### PhonePe Integration

**File:** `src/lib/payment/phonepe.ts`

```typescript
export async function createPhonePePayment(bookingData) {
  // PhonePe API v3 implementation
  // Base URL: https://api.phonepe.com/apis/hermes
  // Merchant transaction ID: bookingId
  // Amount in paise: totalAmount * 100
  // Callback URL: /api/training/verify-payment
  // Redirect URL: /training/confirmation
}
```

**Requirements:**

- Merchant ID from PhonePe Business Portal
- Salt Key (from portal)
- SHA256 hash generation for request
- X-VERIFY header for response validation

### PayU Integration

**File:** `src/lib/payment/payu.ts`

```typescript
export async function createPayUPayment(bookingData) {
  // PayU integration
  // Merchant Key, Salt
  // Hash: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2...)
  // Form POST to PayU
}
```

**Note:** Both integrations need test mode for development

## Phase 6: Payment Confirmation & Success

### File: `src/pages/training/confirmation.astro`

**Query Params:** `?bookingId=xxx&status=success/failed`

**Display:**

- Success: Green checkmark icon, "Booking Confirmed!"
- Show booking details (ID, amount, duration)
- Instructions: "We'll contact you within 24 hours at [email]"
- Download/Print receipt option
- CTA: "Back to Home"

- Failed: Red X, error message, "Try Again" button

## Phase 7: Update Navigation & Footer

### Files to Update:

1. **`src/components/Footer/Footer.astro`**

   - Add "Training" link under "Me" section
   - Add policy links under "This site": "Terms & Conditions", "Privacy Policy", "Refund Policy"

2. **`src/components/BottomNavigationBar/BottomNavigationBar.tsx`**

   - Add Training icon/link (optional)

3. **`src/pages/index.astro`**

   - Add a new section between Projects and Blog: "Premium Training"
   - Brief intro + CTA to /training page
   - Use existing section styling

## Technical Implementation Notes

### Dependencies to Add:

```json
{
  "google-spreadsheet": "^4.1.2",
  "crypto": "built-in",
  "axios": "^1.6.0" // for payment API calls
}
```

### Environment Setup:

Create `.env` file (add to .gitignore):

```
# Google Sheets
GOOGLE_SHEETS_PRIVATE_KEY="..."
GOOGLE_SHEETS_CLIENT_EMAIL="..."
GOOGLE_SHEET_ID="..."

# PhonePe
PHONEPE_MERCHANT_ID="..."
PHONEPE_SALT_KEY="..."
PHONEPE_SALT_INDEX="1"
PHONEPE_MODE="test" # or "production"

# PayU
PAYU_MERCHANT_KEY="..."
PAYU_SALT="..."
PAYU_MODE="test" # or "production"

# Site
PUBLIC_SITE_URL="https://aidevops.in"
```

### Security Considerations:

- Never expose API keys in client-side code
- All payment logic server-side only
- Validate all inputs server-side
- Use HTTPS in production (required by payment gateways)
- Implement rate limiting on booking API

### Responsive Design:

- Mobile-first approach
- Training page hero: Full width on mobile, contained on desktop
- Form: Single column on mobile, side-by-side on desktop
- Test on: 320px (mobile), 768px (tablet), 1200px+ (desktop)

## Phase 8: Testing Checklist

Before going live:

1. Test Google Sheets writing (create test booking)
2. Test PhonePe sandbox payment flow
3. Test PayU sandbox payment flow
4. Verify policy pages display correctly
5. Test form validation (all edge cases)
6. Test responsive design on multiple devices
7. Verify payment webhooks work
8. Test booking ID generation (uniqueness)
9. Check all links in footer work
10. Submit policy page URLs to PhonePe Business Portal

## Content Checklist for PhonePe Verification

When submitting to PhonePe Business:

- Website URL: https://aidevops.in
- T&C URL: https://aidevops.in/terms-and-conditions
- Privacy Policy URL: https://aidevops.in/privacy-policy
- Refund Policy URL: https://aidevops.in/refund-policy
- Shipping Policy URL: https://aidevops.in/refund-policy (combined with returns)
- Contact Email: ritikrvirus6@gmail.com
- Business Category: Education/Training

## File Structure Summary

```
src/
├── pages/
│   ├── training.astro (main training page)
│   ├── training/
│   │   └── confirmation.astro
│   ├── terms-and-conditions.astro
│   ├── privacy-policy.astro
│   ├── refund-policy.astro
│   └── api/
│       └── training/
│           ├── create-booking.ts
│           └── verify-payment.ts
├── components/
│   └── TrainingBooking/
│       ├── TrainingBookingForm.tsx
│       └── index.ts
└── lib/
    └── payment/
        ├── phonepe.ts
        ├── payu.ts
        ├── googleSheets.ts
        └── types.ts
```

## Git Workflow

Create new branch:

```bash
git checkout -b feature/training-payment-system
```

Commit strategy:

1. Policy pages
2. Training page UI
3. Booking form component
4. API endpoints
5. Payment integration
6. Google Sheets integration
7. Navigation updates

Push to remote when ready for review/deployment.

### To-dos

- [ ] Create policy pages (T&C, Privacy, Refund) using provided content
- [ ] Build training.astro landing page with hero, features, pricing sections
- [ ] Create TrainingBookingForm.tsx with duration calculator and validation
- [ ] Setup Google Sheets API integration for booking storage
- [ ] Create /api/training/create-booking.ts endpoint
- [ ] Implement PhonePe payment integration
- [ ] Implement PayU payment integration
- [ ] Create payment verification endpoint for callbacks
- [ ] Build training/confirmation.astro success/failure page
- [ ] Update Footer and add Training link to navigation
- [ ] Add Premium Training section to homepage
- [ ] Test complete flow: booking → payment → confirmation