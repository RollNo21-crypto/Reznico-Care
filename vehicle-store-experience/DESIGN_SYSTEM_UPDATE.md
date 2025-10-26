# Design System Update - Reznico Care

## Overview
Complete UI overhaul based on the landing page aesthetics. All components now follow a consistent dark theme with lime green (#D4FF00) as the primary accent color.

## Design Tokens

### Colors
- **Primary**: `#D4FF00` (Lime Green)
- **Primary Hover**: `#C4EF00`
- **Background**: Dark gradient (`from-gray-900 via-black to-gray-900`)
- **Text**: White, Gray-400, Gray-500
- **Borders**: Gray-800

### Typography
- **Headings**: Bold, tracking-tight
- **Primary Font**: System UI
- **Gradient Text**: `from-[#D4FF00] to-[#C4EF00]`

### Components

#### Buttons
- **Primary**: `rounded-full bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold`
- **Outline**: `rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md`
- **Hover Effects**: `scale-105 shadow-xl transition-all duration-300`

#### Cards
- **Dark Glass**: `border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl`
- **Rounded**: `rounded-2xl` or `rounded-full` for icons

#### Icons
- **Container**: `h-20 w-20 rounded-full bg-gradient-to-br from-[#D4FF00] to-[#C4EF00]`
- **Hover**: `hover:scale-110 transition-all duration-300`

## Updated Components

### ✅ Authentication Pages
1. **admin-login.jsx** - Dark theme with lime green accents
2. **employee-login.jsx** - Matching dark theme
3. **signup.jsx** - Consistent styling

**Key Changes:**
- Dark gradient background (`from-gray-900 via-black to-gray-900`)
- Lime green (#D4FF00) primary color
- Rounded-full icon containers
- Dark glass cards with backdrop blur
- Clerk form styling with custom appearance

### ✅ App.jsx - Choose Role Page
- Dark background matching auth pages
- Rounded-full icon containers with lime green gradient
- Hover effects with border color change to lime green
- Consistent typography and spacing

### ✅ Landing Page
- Full-screen video background
- Lime green CTA buttons
- Contact form popup dialog
- Dark overlay for better readability

### ✅ Design System File
Created `src/lib/design-system.js` with:
- Centralized color tokens
- Typography scale
- Spacing system
- Component patterns
- Gradient configurations

## Removed Components

### ❌ Deleted Files
- `contact-us.jsx` - Integrated into landing page as popup dialog

## Pending Updates

The following components still need to be updated to match the design system:

### 🔄 Dashboard Components
- `dashboard.jsx` - Needs dark theme
- `service-intake.jsx` - Needs styling update
- `customer-onboarding.jsx` - Needs dark theme

### 🔄 Sidebar Components
- `app-sidebar.jsx` - Update colors to match
- `nav-*.jsx` files - Update navigation styling

### 🔄 UI Components
Consider reviewing and updating:
- Button variants
- Card styles
- Input fields
- Dialog components

## Implementation Guide

### Using the Design System

```javascript
// Import design tokens
import { colors, typography, components } from '@/lib/design-system'

// Use in components
<button className={components.button.primary.className}>
  Click Me
</button>

// Or use Tailwind directly
<div className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
  <h1 className="bg-gradient-to-r from-[#D4FF00] to-[#C4EF00] bg-clip-text text-transparent">
    Reznico Care
  </h1>
</div>
```

### Color Palette
```css
--primary: #D4FF00;
--primary-hover: #C4EF00;
--bg-dark: #000000;
--bg-gray-900: #111827;
--bg-gray-800: #1F2937;
--text-white: #FFFFFF;
--text-gray-400: #9CA3AF;
```

### Spacing Scale
- Mobile: `px-6` (24px)
- Tablet: `md:px-12` (48px)
- Desktop: `lg:px-16` (64px)

### Transition Standard
- Duration: `300ms`
- Easing: Default
- Scale: `hover:scale-105`

## Best Practices

1. **Always use rounded-full for buttons** - Matches landing page aesthetic
2. **Dark backgrounds only** - No light mode variations
3. **Lime green (#D4FF00) for all CTAs** - Primary brand color
4. **Backdrop blur on cards** - `bg-gray-900/50 backdrop-blur-sm`
5. **Hover effects** - Scale + shadow + color change
6. **Consistent spacing** - Use design system px/py values

## Next Steps

1. Update dashboard components
2. Update sidebar and navigation
3. Review and update all UI components
4. Test responsive behavior
5. Optimize performance
6. Document component usage

## Contact Form Integration

FormSubmit.io configured at:
- Email: `gokarnkark09@gmail.com`
- Location: Landing page popup dialog
- Fields: Name, Email, Phone, Company, Subject, Message

---

**Design System Version**: 1.0.0  
**Last Updated**: 2025  
**Brand**: Reznico Care
