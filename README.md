# 📄 ResumeCV - Professional Resume & CV Builder

> **Build professional resumes and CVs with ease. A modern, full-stack web application with intuitive UI, powerful features, and seamless authentication.**


## ✨ Features

### 🎯 Core Features

- **Resume Builder** - Create professional resumes with multiple templates
- **CV Builder** - Build comprehensive CVs with detailed sections
- **Multiple Templates** - Modern, Professional, Executive, Creative designs
- **Live Preview** - See changes in real-time as you edit
- **PDF Download** - Export your resume/CV as high-quality PDF
- **Template Selection** - Choose from multiple professionally designed templates

### 👤 Authentication & User Management

- **Email & Password Registration** - Create account with secure authentication
- **Email & Password Login** - Secure login with JWT tokens
- **OAuth Integration** - Sign in with Google or GitHub
- **Session Management** - Persistent authentication with secure cookies
- **Remember Me** - Optional "Remember Me" functionality
- **Password Reset** - Recover forgotten passwords
- **Profile Dashboard** - View and manage your saved resumes/CVs

### 📊 Resume/CV Content Sections

- **Personal Information** - Name, email, phone, address, social links
- **Professional Summary** - Brief overview of your professional background
- **Education** - School/university, degree, field of study, graduation date, GPA
- **Work Experience** - Company, position, dates, description, achievements
- **Skills** - Technical and soft skills with proficiency levels (1-5)
- **Projects** - Portfolio projects with descriptions and technologies used
- **Certifications** - Professional certifications with issue dates and credentials
- **Languages** - Languages spoken with proficiency levels

### 🎨 Professional UI/UX

- **Dark Theme** - Modern, eye-friendly dark interface
- **Glassmorphism Design** - Frosted glass effect components
- **Smooth Animations** - Framer Motion animations for seamless interactions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Validation** - Instant feedback on form inputs
- **Error Handling** - Clear, user-friendly error messages
- **Loading States** - Visual feedback for async operations
- **Toast Notifications** - Non-intrusive status updates using Sonner

### 📱 Dashboard Features

- **Resume/CV Collection** - View all your saved resumes/CVs
- **Quick Stats** - See number of resumes, views, downloads
- **Resume Management** - Edit, delete, view, or download any resume
- **Storage Tracking** - Visual storage usage indicator
- **Quick Actions** - Fast access to common operations

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Shadcn/UI** - Reusable component library
- **React PDF** - PDF generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **Passport.js** - OAuth authentication

### DevOps & Deployment
- **Docker** - Containerization
- **Vercel** - Frontend hosting
- **Environment Variables** - Configuration management

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Google OAuth credentials (optional)
- GitHub OAuth credentials (optional)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resumecv.git
cd resumecv
```

## 📱 Live Site

Visit `https://portfolio-frontend-jet-eight.vercel.app` in your browser.

---

## 📁 Project Structure

```
resumecv/
├── frontend/                    # Next.js application
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/          # Login page
│   │   │   └── register/       # Registration page
│   │   ├── dashboard/          # User dashboard
│   │   ├── resume-builder/     # Resume builder
│   │   ├── cv-builder/         # CV builder
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── ResumeBuilder/      # Resume builder components
│   │   ├── CVBuilder/          # CV builder components
│   │   └── services/           # API services
│   ├── lib/                    # Utilities and helpers
│   ├── zod/                    # Validation schemas
│   └── public/                 # Static assets
│
├── backend/                     # Express.js application
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── services/           # Business logic
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # Database models
│   │   └── config/             # Configuration
│   └── prisma/
│       └── schema.prisma       # Database schema
│
└── README.md                   # This file
```

---

## 🔐 Authentication

### Email & Password Authentication

1. User signs up with email and password
2. Backend validates and hashes password
3. User created in database
4. JWT token generated and returned
5. Token stored in secure HTTP-only cookie
6. Subsequent requests include token for authentication

```typescript
// Login Flow
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}

// Response
{
  "success": true,
  "data": { "id": "user-id", "email": "user@example.com" },
  "accessToken": "jwt-token-here"
}
```

### OAuth Authentication (Google & GitHub)

1. User clicks "Continue with Google/GitHub"
2. Redirected to OAuth provider
3. User grants permissions
4. Provider redirects back with authorization code
5. Backend exchanges code for access token
6. Backend creates/updates user
7. Backend sets authentication cookies
8. Frontend verifies authentication
9. User redirected to dashboard

---

## 📚 API Endpoints

### Authentication
```
POST   /api/v1/auth/register      - Register new user
POST   /api/v1/auth/login         - Login user
GET    /api/v1/auth/logout        - Logout user
GET    /api/v1/auth/google        - Google OAuth
GET    /api/v1/auth/github        - GitHub OAuth
GET    /api/v1/auth/me            - Get current user
```

### Resume/CV Management
```
POST   /api/v1/resume/create      - Create new resume
GET    /api/v1/resume             - Get user's resume
GET    /api/v1/resume/all         - Get all resumes
PUT    /api/v1/resume             - Update resume
DELETE /api/v1/resume             - Delete resume
GET    /api/v1/resume/:id         - Get specific resume
```

### User Profile
```
GET    /api/v1/user/profile       - Get user profile
PUT    /api/v1/user/profile       - Update user profile
DELETE /api/v1/user/account       - Delete account
```

---

## 📝 Resume/CV Data Structure

### Complete Data Model

```typescript
interface Resume {
  id: string;
  userId: string;
  summary: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    dateOfBirth?: string;
    gender?: string;
    languages?: string;
    nationality?: string;
  };
  education: {
    degree: string;
    institution: string;
    fieldOfStudy?: string;
    startDate: string;  // YYYY-MM
    endDate: string;    // YYYY-MM
    description?: string;
    gpa?: string;
  }[];
  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }[];
  skills: {
    name: string;
    level: number;      // 1-5
    category?: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  certifications?: {
    title: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialUrl?: string;
  }[];
  template: "modern" | "professional" | "executive" | "creative";
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎯 Usage Guide

### Creating Your First Resume

1. **Sign Up**
   - Go to `/register`
   - Enter email and password
   - Or use Google/GitHub to sign up

2. **Start Building**
   - Click "New Resume" on dashboard
   - Choose a template
   - Fill in your information section by section

3. **Complete Sections**
   - **Personal Info** - Name, contact, social links
   - **Summary** - Professional overview
   - **Education** - Academic background
   - **Experience** - Work history
   - **Skills** - Your competencies (rate 1-5)
   - **Projects** - Portfolio items
   - **Certifications** - Professional credentials

4. **Preview & Export**
   - Live preview updates as you type
   - Download as PDF when ready
   - Save for later editing

### Editing Existing Resume

1. Go to Dashboard
2. Click "Edit" on any resume
3. Make changes
4. Click "Save Resume"
5. Download or continue editing

---

## 🎨 Design System

### Color Palette
- **Background**: #080808 (Dark)
- **Primary**: #FFFFFF (White/Light)
- **Secondary**: White with 10-30% opacity
- **Accent**: Various for CTAs

### Typography
- **Display**: DM Serif Display (Georgia serif)
- **UI**: Inter / System fonts
- **Code**: IBM Plex Mono

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Solid, outline, ghost variants
- **Forms**: Minimal with clear labeling
- **Icons**: Lucide React icons

---

## 🔧 Configuration

### Available Environment Variables

**Frontend**
```env
NEXT_PUBLIC_API_URL           # Backend API URL
NEXT_PUBLIC_APP_NAME          # Application name
NEXT_PUBLIC_APP_DESCRIPTION   # App description
```

**Backend**
```env
DATABASE_URL                  # PostgreSQL connection
JWT_SECRET                    # JWT signing secret
JWT_EXPIRE                    # Token expiration
PORT                          # Server port
NODE_ENV                      # Environment mode
GOOGLE_CLIENT_ID              # Google OAuth ID
GOOGLE_CLIENT_SECRET          # Google OAuth secret
GITHUB_CLIENT_ID              # GitHub OAuth ID
GITHUB_CLIENT_SECRET          # GitHub OAuth secret
```

---

## 📦 Build & Deployment

### Build for Production

**Frontend**
```bash
cd frontend
npm run build
npm start
```

**Backend**
```bash
cd backend
npm run build
npm start
```

### Deploy to Vercel (Frontend)

```bash
npm install -g vercel
vercel login
vercel
```

### Deploy to Heroku (Backend)

```bash
heroku login
heroku create your-app-name
git push heroku main
```

---

## 🧪 Testing

### Run Tests

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
npm run test
```

### Test Coverage

```bash
npm run test:coverage
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: "Cannot connect to database"**
```
Solution: Check DATABASE_URL in .env
Ensure PostgreSQL is running
Run: npx prisma db push
```

**Issue: "OAuth login fails"**
```
Solution: Verify client ID and secrets
Check callback URLs match OAuth provider settings
Check CORS configuration
```

**Issue: "Resume not saving"**
```
Solution: Check browser console for errors
Verify authentication token is valid
Check backend server is running
```

**Issue: "PDF download fails"**
```
Solution: Install react-pdf: npm install @react-pdf/renderer
Check all required fields are filled
Verify browser permissions
```

---

## 📊 Performance

- **Frontend**: Optimized with Next.js Image optimization
- **Backend**: Query optimization with Prisma
- **Database**: Indexed columns for fast queries
- **Caching**: Browser caching for static assets
- **CDN**: Static assets served from CDN

---

## 🔒 Security

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure, signed tokens with expiration
- **HTTPS**: Required for production
- **CORS**: Restricted to approved domains
- **CSRF Protection**: Token-based protection
- **Input Validation**: Zod schema validation
- **SQL Injection**: Prevented with Prisma ORM
- **XSS Protection**: React automatically escapes content

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Basic resume/CV builder
- ✅ Authentication system
- ✅ Multiple templates
- ✅ PDF export

### Phase 2 (Upcoming)
- 🔄 AI-powered suggestions
- 🔄 Resume scoring/ATS optimization
- 🔄 Cover letter builder
- 🔄 Job application tracker

### Phase 3 (Future)
- 📋 Collaboration features
- 📋 Advanced analytics
- 📋 Mobile app
- 📋 Marketplace for templates

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Support & Contact

- **Email**: gaziur.tahmid@gmail.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/resumecv/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/resumecv/discussions)

---

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **Framer Motion** - Animations
- **Shadcn/UI** - Components
- **Sonner** - Notifications

---

---

**Made with ❤️ by the ResumeCV Team**

Last Updated: January 2025 | Version 1.0.0