# Vehicle Store Experience 🚗

A modern, responsive vehicle service management application built with React, Vite, and Clerk authentication. This application provides a comprehensive platform for managing vehicle services, customer interactions, and business operations.

## ✨ Features

### 🔐 Authentication & User Management
- **Clerk Authentication**: Secure user authentication and management
- **Role-based Access**: Different interfaces for customers and administrators
- **Profile Management**: Users can edit and manage their profiles

### 📱 Customer Dashboard
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Service History**: View past and current vehicle services
- **Invoice Management**: Track and download invoices
- **Profile Editing**: Update personal information and preferences
- **Real-time Status Updates**: Live updates on service progress

### 🎨 Modern UI/UX
- **Dark Theme**: Sleek dark interface with lime green accents (#D4FF00)
- **Component Library**: Built with Radix UI and shadcn/ui components
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile
- **Interactive Elements**: Smooth animations and transitions

### 🛠️ Technical Features
- **React 19**: Latest React features and performance improvements
- **Vite**: Fast development and build tooling
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript Ready**: Configured for TypeScript development
- **ESLint**: Code quality and consistency

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle-store-experience
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
vehicle-store-experience/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── customer/     # Customer-specific components
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── assets/           # Images and other assets
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Lime Green (#D4FF00)
- **Background**: Dark Gray (#0F0F0F, #1A1A1A)
- **Text**: White (#FFFFFF)
- **Secondary**: Gray variants

### Typography
- Clean, modern font stack
- Responsive text sizing
- Proper contrast ratios

## 🔧 Configuration

### Clerk Authentication
1. Sign up at [Clerk.dev](https://clerk.dev)
2. Create a new application
3. Copy your publishable key to `.env.local`
4. Configure sign-in/sign-up flows as needed

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration for:
- Dark theme support
- Custom color palette
- Responsive breakpoints
- Animation utilities

## 📱 Mobile Experience

The application is built with a mobile-first approach:
- Touch-friendly interface
- Optimized navigation
- Responsive layouts
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Krishnamurthy M Gokarnkar**
- Email: gokarnkark07@gmail.com
- GitHub: [@RollNo21-crypto](https://github.com/RollNo21-crypto)

## 🙏 Acknowledgments

- [Clerk](https://clerk.dev) for authentication
- [Radix UI](https://radix-ui.com) for accessible components
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide React](https://lucide.dev) for icons
- [Vite](https://vitejs.dev) for build tooling

---

Built with ❤️ using React and modern web technologies.
