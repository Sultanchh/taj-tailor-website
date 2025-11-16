# Taj Tailor Admin Panel - Complete Guide

## How to Access the Admin Panel

### Step 1: Navigate to Admin Dashboard
1. Open your website (click the "Preview" button in the Management UI)
2. Add `/admin` to the URL
   - Example: `https://your-domain.manus.space/admin`
3. You'll be redirected to the login page

### Step 2: Login with Your Admin Account
1. Click the login button on the admin page
2. Use your Manus account credentials to sign in
3. You must be an **admin user** to access the dashboard
   - Only the project owner (you) has admin access by default

### Step 3: You're In!
Once logged in, you'll see the admin dashboard with four main tabs:
- **Gallery** - Manage design images
- **Customers** - View booking information
- **Orders** - Track and update order status
- **Business** - Update shop details

---

## Admin Panel Features

### 1. Gallery Management

**Add a New Design:**
1. Click the "Add Design" button
2. Fill in the design details:
   - **Design Title** - Name of the shalwar kameez design (required)
   - **Description** - Details about fabric, style, embroidery, etc. (optional)
   - **Image URL** - Link to the design image (required)
   - **Image Key** - Internal reference for the image (required)
3. Click "Add Design"

**Delete a Design:**
1. Find the design in the gallery grid
2. Click the "Delete" button on the design card
3. The design will be removed from your gallery

**Tips:**
- Use high-quality images (at least 1920×1080 pixels)
- Include detailed descriptions to help customers understand the design
- Image URLs can be from any image hosting service (Imgur, Cloudinary, etc.)

---

### 2. Customer Management

**View All Customers:**
- See a complete list of all customers who have booked visits
- View their contact information (name, phone, email)
- See their unique **visit card number** for tracking

**Customer Information Displayed:**
- **Name** - Customer's full name
- **Phone** - Contact phone number
- **Email** - Email address
- **Card Number** - Unique identifier for their visit/order
- **Visit Date** - Preferred date they want to visit

**Copy Card Number:**
- Click the "Copy Card" button to copy a customer's card number
- Share this with the customer if they lost it
- Customers use this to track their order status online

**Tips:**
- Keep customer information organized
- Use the phone and email to contact customers about their orders
- The card number is essential for order tracking

---

### 3. Order Management

**View All Orders:**
- See all customer orders with their current status
- Track progress from Pending → In Progress → Ready

**Update Order Status:**
1. Find the order in the table
2. Click the button showing the next status
   - **Pending** → Click to move to "In Progress"
   - **In Progress** → Click to move to "Ready"
   - **Ready** → Click to move back to "Pending" (if needed)

**Order Information:**
- **Card Number** - Links to the customer
- **Description** - Details about the order
- **Status** - Current stage (Pending, In Progress, Ready)
- **Created** - When the order was placed
- **Action** - Button to update status

**Status Breakdown:**
- **Pending** - Order received, waiting to start
- **In Progress** - Currently being stitched/altered
- **Ready** - Completed and ready for pickup

**Tips:**
- Update status regularly so customers can track progress
- Customers check their status using their card number on the "Track Order" page
- When status changes to "Ready," notify the customer to pick up their order

---

### 4. Business Information Management

**Update Your Shop Details:**
1. Click the "Business" tab
2. Edit any of the following fields:

**Shop Information:**
- **Shop Name** - Your business name (e.g., "Taj Tailor")
- **Phone Number** - Customer contact number
- **Email Address** - Customer contact email
- **Full Address** - Complete shop location
- **City** - Your city (e.g., "Karachi")
- **Country** - Your country (e.g., "Pakistan")

**Map Coordinates:**
- **Latitude** - GPS latitude of your shop
- **Longitude** - GPS longitude of your shop
- (Used for future map integration)

**Advanced Settings:**
- **Opening Hours** - Enter as JSON format:
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

- **Social Media Links** - Enter as JSON format:
  ```json
  {
    "facebook": "https://facebook.com/tajtailor",
    "instagram": "https://instagram.com/tajtailor",
    "whatsapp": "https://wa.me/923001234567"
  }
  ```

3. Click "Save Changes" to update

**Tips:**
- Keep contact information up to date
- Update opening hours if they change seasonally
- Add social media links to help customers connect with you

---

## Daily Admin Tasks

### Morning Routine:
1. Check **Customers** tab for new bookings
2. Review **Orders** tab for any pending work
3. Contact customers about their visits

### During the Day:
1. Update order status as you progress on stitching
2. Add new designs to the gallery when completed
3. Respond to customer inquiries

### Before Closing:
1. Review all "In Progress" orders
2. Update any completed orders to "Ready"
3. Notify customers whose orders are ready

---

## Customer-Facing Pages (What Customers See)

### Homepage
- Showcases your services
- Features call-to-action buttons for booking and viewing designs
- Displays your shop information

### Gallery Page
- Shows all design images you've added
- Customers can view your portfolio
- Helps attract new customers

### Booking Page
- Customers fill in their details
- They receive a unique **visit card number**
- They use this number to track their order

### Track Order Page
- Customers enter their card number
- They see their order status in real-time
- Shows estimated completion date

### Contact Page
- Displays your shop information
- Has a contact form for inquiries
- Shows FAQ about your services

---

## Troubleshooting

**Can't Access Admin Panel?**
- Make sure you're logged in with your admin account
- Check that the URL ends with `/admin`
- Clear your browser cache and try again

**Can't Update Order Status?**
- Make sure you're logged in as an admin
- Refresh the page and try again
- Check your internet connection

**Gallery Images Not Showing?**
- Make sure the image URL is correct
- Check that the image hosting service is accessible
- Try using a different image URL

**Lost a Customer's Card Number?**
- Go to the Customers tab
- Find the customer in the list
- Click "Copy Card" to get their card number

---

## Security Tips

1. **Keep Your Login Secure**
   - Don't share your Manus account credentials
   - Log out when finished working

2. **Protect Customer Data**
   - Customer information is private
   - Don't share phone numbers or emails publicly

3. **Regular Updates**
   - Keep your business information current
   - Update gallery with new designs regularly

---

## Next Steps

1. **Add Sample Designs** - Upload 3-5 design images to your gallery
2. **Update Business Info** - Fill in your actual shop details
3. **Test the System** - Create a test booking to see how it works
4. **Share with Customers** - Tell customers about the booking and tracking system

---

## Need Help?

If you encounter any issues:
1. Check this guide for solutions
2. Review the website's contact page for support options
3. Test with sample data first before going live

Enjoy managing your Taj Tailor business!
