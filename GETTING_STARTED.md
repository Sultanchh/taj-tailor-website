# Taj Tailor Website - Getting Started Guide

Welcome! Your professional Taj Tailor website is ready to use. This guide will help you get started in just a few minutes.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Open Your Website
Visit: **https://3000-impnipi40mxyyuakpjogu-c0b560fc.manus.computer**

You should see:
- Professional homepage with navy blue hero section
- "Book Your Visit" and "View Designs" buttons
- Navigation menu with Gallery, Booking, Tracking, and Contact pages

### Step 2: Access Admin Dashboard
Add `/admin` to your website URL:
**https://3000-impnipi40mxyyuakpjogu-c0b560fc.manus.computer/admin**

### Step 3: Log In
- Click the login button
- Sign in with your **Manus account** (same as Management UI)
- You'll automatically have admin access

### Step 4: Start Managing
You're now in the admin dashboard! You can:
- ✅ Add design images to your gallery
- ✅ View customer bookings
- ✅ Update order status
- ✅ Manage business information

---

## 📱 Website Pages Overview

### Homepage (`/`)
**What it does:**
- Introduces your business
- Showcases your services (Custom Stitching, Alterations)
- Highlights why customers should choose Taj Tailor
- Provides clear CTAs to book or view designs

**Customer actions:**
- Click "Book Your Visit" to schedule an appointment
- Click "View Designs" to see your gallery
- Click "Get Directions" to find your location

---

### Gallery (`/gallery`)
**What it does:**
- Displays all design images you've added
- Shows design titles and descriptions
- Helps customers see your work

**Customer actions:**
- Browse your design portfolio
- Click "Request This Design" to book a consultation

**Admin actions:**
- Add new designs with images and descriptions
- Delete designs you no longer want to showcase

---

### Booking (`/booking`)
**What it does:**
- Collects customer information
- Generates unique visit card number
- Confirms booking details

**Customer actions:**
1. Fill in name, phone, email
2. Select preferred visit date and time
3. Add design ideas or special requests
4. Submit booking
5. Receive unique card number for tracking

**What you get:**
- Customer contact information
- Preferred visit date and time
- Design preferences and notes
- Unique card number for order tracking

---

### Track Order (`/track`)
**What it does:**
- Allows customers to check order status
- Shows real-time progress updates
- Displays order details and timeline

**Customer actions:**
1. Enter their card number
2. See their order status (Pending, In Progress, Ready)
3. View estimated completion date
4. Get contact information for questions

**Why it's important:**
- Keeps customers informed
- Reduces support inquiries
- Shows professionalism

---

### Contact (`/contact`)
**What it does:**
- Displays your contact information
- Provides contact form for inquiries
- Shows FAQ about your services
- Displays business hours

**Customer actions:**
- Send you a message
- Call or email directly
- Find answers to common questions

---

## 🎛️ Admin Dashboard Overview

### Gallery Tab
**Manage your design portfolio**

**Add a Design:**
1. Click "Add Design"
2. Enter design title (required)
3. Add description (optional)
4. Paste image URL (required)
5. Add image key for reference (required)
6. Click "Add Design"

**Delete a Design:**
1. Find the design in the grid
2. Click "Delete"
3. Design is removed

**Tips:**
- Use high-quality images (1920×1080 or larger)
- Write detailed descriptions
- Update gallery regularly with new designs

---

### Customers Tab
**View all customer bookings**

**See Customer Information:**
- Name
- Phone number
- Email address
- Unique card number
- Preferred visit date

**Copy Card Number:**
- Click "Copy Card" button
- Share with customer if they lost it
- Customers use this to track orders

**Tips:**
- Contact customers to confirm visit time
- Keep records organized
- Use card numbers for order tracking

---

### Orders Tab
**Track and update stitching progress**

**View All Orders:**
- Card number (links to customer)
- Order description
- Current status
- Creation date
- Action button

**Update Order Status:**
1. Find the order
2. Click the status button
3. Status changes to next stage:
   - Pending → In Progress
   - In Progress → Ready
   - Ready → Pending (if needed)

**Status Meanings:**
- **Pending** - Order received, not started yet
- **In Progress** - Currently being stitched/altered
- **Ready** - Completed and ready for pickup

**Tips:**
- Update status daily as you work
- Customers see updates in real-time
- Notify customer when status changes to "Ready"

---

### Business Tab
**Update your shop information**

**Edit Your Details:**
- Shop name
- Phone number
- Email address
- Full address
- City and country
- Map coordinates (latitude/longitude)
- Opening hours (JSON format)
- Social media links (JSON format)

**Opening Hours Example:**
```json
{
  "monday": "10:00 AM - 6:00 PM",
  "tuesday": "10:00 AM - 6:00 PM",
  "wednesday": "10:00 AM - 6:00 PM",
  "thursday": "10:00 AM - 6:00 PM",
  "friday": "10:00 AM - 6:00 PM",
  "saturday": "10:00 AM - 4:00 PM",
  "sunday": "Closed"
}
```

**Social Media Example:**
```json
{
  "facebook": "https://facebook.com/tajtailor",
  "instagram": "https://instagram.com/tajtailor",
  "whatsapp": "https://wa.me/923001234567"
}
```

**Tips:**
- Keep contact info up to date
- Update hours if they change
- Add social links to help customers connect

---

## 💳 Stripe Payment Integration (Optional)

### What Stripe Does:
- Lets customers pay for products/services
- Processes credit card payments securely
- Sends automatic receipts
- Tracks all transactions

### How to Set Up:
1. Create account at https://stripe.com
2. Get your API keys
3. Go to Management UI → Settings → Payment
4. Paste your Stripe keys
5. Done! Payment system is active

### Testing:
- Use card: `4242 4242 4242 4242`
- Any future expiration date
- Any 3-digit CVC
- Any ZIP code

### Going Live:
- Complete Stripe verification
- Get live keys
- Update your project settings
- Real payments start processing

---

## 📊 Daily Workflow

### Morning:
1. Check admin dashboard
2. Review new customer bookings
3. Contact customers to confirm visit times

### During the Day:
1. Update order status as you work
2. Add new designs to gallery
3. Respond to customer inquiries

### Evening:
1. Review all "In Progress" orders
2. Update completed orders to "Ready"
3. Notify customers their orders are ready

---

## 🔒 Security & Best Practices

### Protect Your Account:
- ✅ Log out when finished
- ✅ Don't share your login credentials
- ✅ Use strong passwords
- ✅ Keep email secure

### Protect Customer Data:
- ✅ Keep phone numbers and emails private
- ✅ Don't share customer information publicly
- ✅ Use secure passwords
- ✅ Log out after each session

### Website Security:
- ✅ Your website uses HTTPS (secure connection)
- ✅ Stripe handles payment security
- ✅ Customer data is encrypted
- ✅ Regular security updates

---

## ❓ Frequently Asked Questions

**Q: How do customers book a visit?**
A: They go to the "Book Visit" page, fill in their details, and submit. They receive a unique card number.

**Q: How do customers track their order?**
A: They go to "Track Order" page, enter their card number, and see their order status.

**Q: Can I change the website design?**
A: Yes! Contact support for design customization options.

**Q: How do I add more pages?**
A: Contact support to add new pages like testimonials, pricing, or blog.

**Q: Can I accept online payments?**
A: Yes! Set up Stripe (see Stripe Payment Integration section).

**Q: How do I backup my data?**
A: Your data is automatically backed up. Contact support for details.

**Q: Can I use my own domain?**
A: Yes! Go to Management UI → Settings → Domains to set up a custom domain.

**Q: How do I change the website colors?**
A: Contact support for design customization.

---

## 📞 Need Help?

### Common Issues:

**Can't log in to admin?**
- Make sure you're using your Manus account
- Check that you're the project owner
- Clear browser cache and try again

**Can't see new designs in gallery?**
- Refresh the page
- Check that image URL is correct
- Make sure image is accessible

**Order status not updating?**
- Refresh the page
- Check your internet connection
- Try again in a few seconds

**Customer can't track order?**
- Make sure card number is correct
- Check that order exists in system
- Verify customer entered correct number

---

## 🎯 Next Steps

1. **Visit your website** - https://3000-impnipi40mxyyuakpjogu-c0b560fc.manus.computer
2. **Log in to admin** - Add `/admin` to the URL
3. **Add sample designs** - Upload 3-5 design images
4. **Update business info** - Add your shop details
5. **Test the system** - Create a test booking
6. **Set up Stripe** (optional) - Enable payment processing
7. **Go live** - Share your website with customers!

---

## 📚 Additional Resources

- **ADMIN_GUIDE.md** - Detailed admin panel instructions
- **STRIPE_SETUP.md** - Complete Stripe integration guide
- **Management UI** - Project settings and configuration

---

Congratulations! Your Taj Tailor website is ready to serve your customers. Good luck! 🎉

For questions or support, refer to the guides above or contact your support team.
