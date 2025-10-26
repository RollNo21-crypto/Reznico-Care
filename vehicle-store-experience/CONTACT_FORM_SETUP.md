# Contact Form Setup with FormSubmit.io

## Quick Setup Instructions

### 1. Update Your Email Address

In `src/components/contact-us.jsx`, replace the placeholder email with your actual email:

```jsx
<form 
  action="https://formsubmit.co/your-email@example.com"  // ← Change this
  method="POST"
  ...
>
```

**Replace:** `your-email@example.com`  
**With:** Your actual email address (e.g., `contact@reznicocare.com`)

### 2. First Time Setup

When you first submit the form with your email:
1. FormSubmit.io will send a **verification email** to your address
2. Click the verification link in that email
3. After verification, all future form submissions will be sent to your inbox

### 3. FormSubmit.io Features Configured

The form already includes these settings:

- ✅ **Custom Subject Line**: "New Contact Form Submission - Reznico Care"
- ✅ **No CAPTCHA**: For better user experience
- ✅ **Table Format**: Submissions formatted in a nice table
- ✅ **Custom Redirect**: Returns to the same page after submission

### 4. Form Fields Collected

**Required Fields:**
- Full Name
- Email Address
- Subject
- Message

**Optional Fields:**
- Phone Number
- Company/Organization

### 5. Customization Options

You can add more FormSubmit.io features by adding hidden inputs:

```jsx
{/* Receive a copy of the submission */}
<input type="hidden" name="_cc" value="backup@yourdomain.com" />

{/* Custom success page */}
<input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

{/* Customize the reply-to email */}
<input type="hidden" name="_replyto" value="user-email-field" />

{/* Add honeypot for spam protection */}
<input type="text" name="_honey" style={{display: 'none'}} />
```

### 6. Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the Contact page: `http://localhost:5173/contact`
3. Fill out and submit the form
4. Check your email for the verification link (first time only)
5. Verify and test again

### 7. Alternative: Use Your Own Backend

If you prefer to use your own email server instead of FormSubmit.io:

1. Update the form action to your API endpoint
2. Add proper CORS headers on your backend
3. Handle the form submission server-side

## Contact Information

Update the contact information in `contact-us.jsx`:

```jsx
// Email
<p className="text-sm text-muted-foreground">contact@reznicocare.com</p>

// Phone
<p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>

// Address
<p className="text-sm text-muted-foreground">123 Main St, City, State</p>
```

## Navigation

Users can access the Contact form from:
- Landing page "Contact Us" button (bottom right)
- Direct URL: `/contact`
- The form includes a "Cancel" button to return to the landing page

---

**Note:** FormSubmit.io is a free service with limitations. For high-volume contact forms, consider using a paid service or your own backend solution.
