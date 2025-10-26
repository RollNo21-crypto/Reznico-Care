# Landing Page Setup

## Adding Your Hero Video

To complete the landing page setup, you need to add your hero video:

1. **Add your video file** to the `public` folder in your project:
   ```
   vehicle-store-experience/
   └── public/
       ├── hero-video.mp4  (your video file)
       └── hero-poster.jpg  (optional poster image)
   ```

2. **Update the video path** in `src/components/landing-page.jsx`:
   ```jsx
   <video
     autoPlay
     loop
     muted
     playsInline
     className="h-full w-full object-cover opacity-60"
     poster="/hero-poster.jpg"  // Update this path
   >
     <source src="/hero-video.mp4" type="video/mp4" />  // Update this path
   </video>
   ```

3. **Supported video formats**:
   - MP4 (recommended)
   - WebM
   - OGG

4. **Video recommendations**:
   - Maximum file size: 10-20MB for faster loading
   - Resolution: 1920x1080 (Full HD) or 1280x720 (HD)
   - Duration: 5-15 seconds loop
   - Compress your video using tools like HandBrake or FFmpeg

## Page Flow

1. **Landing Page** (`/`) - Hero video with "Get Started" button
2. **Choose Role** (`/choose-role`) - Select Admin or Employee
3. **Login Pages** - Admin/Employee login
4. **Signup** (`/signup`) - Create new account
5. **Dashboard** - Role-based dashboard after authentication

## Customization

### Colors
The landing page uses the brand color `#D4FF00` (lime/yellow-green). You can customize this in:
- `landing-page.jsx` - Update the `bg-[#D4FF00]` classes
- Replace with your brand colors

### Text Content
Update the tagline in `landing-page.jsx`:
```jsx
<p className="text-lg text-gray-200...">
  We create high-performing digital designs that elevate brands and enhance conversions.
</p>
```

### Logo
Replace "reznico" text with your logo image if needed.
