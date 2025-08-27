# KodakLens - Visual Story Optimizer

A Jamstack web application that transforms uploaded photos into responsive, SEO-ready microsites with switchable templates, automated SEO & accessibility checks, and CMS-backed content management.

## 🎯 Project Overview

KodakLens is designed to demonstrate modern web development practices including:
- **Photo Upload & Processing**: Drag-and-drop image upload with EXIF data extraction
- **Template System**: Switchable templates (Classic, Magazine, Showcase) simulating CMS migration
- **SEO Analysis**: Automated SEO checks with remediation hints
- **Accessibility Compliance**: WCAG 2.1 AA accessibility checks
- **CMS Integration**: Local JSON/Markdown support with optional headless CMS
- **Analytics Ready**: GA4/GTM integration stubs and Search Console readiness
- **Performance Optimized**: Mobile-first responsive design with performance budgets

## ✨ Key Features

### 1. Photo Upload & Processing
- **Drag & Drop Interface**: Intuitive file upload with validation
- **EXIF Data Extraction**: Automatic extraction of camera settings, date, and location
- **File Validation**: Support for JPG/PNG/WebP up to 8MB
- **Real-time Preview**: Instant preview with processing indicators

### 2. Template System
- **Classic Template**: Clean, timeless layout with focus on content
- **Magazine Template**: Editorial-style layout with sophisticated typography
- **Showcase Template**: Bold, modern design perfect for portfolios
- **Template Migration**: Simulates CMS template switching with diff analysis

### 3. SEO Analysis Engine
- **Automated Checks**: Title length, meta description, heading structure
- **Performance Metrics**: LCP, CLS, TBT monitoring
- **Content Analysis**: Alt text, canonical URLs, OpenGraph tags
- **Remediation Hints**: Actionable suggestions for improvement
- **Scoring System**: Quantitative SEO scoring (0-100)

### 4. Accessibility Compliance
- **WCAG 2.1 AA**: Automated accessibility checks
- **Color Contrast**: Minimum 4.5:1 contrast ratio validation
- **Keyboard Navigation**: Full keyboard accessibility testing
- **ARIA Support**: Proper ARIA labels and roles
- **Screen Reader**: Optimized for screen reader compatibility

### 5. CMS Integration
- **Local CMS**: JSON and Markdown file support
- **Headless CMS**: Optional Contentful/Strapi integration
- **Content Validation**: Structured content with validation
- **Version Control**: Git-based content management

### 6. Analytics Integration
- **GA4 Ready**: Google Analytics 4 event tracking stubs
- **GTM Support**: Google Tag Manager data layer events
- **Search Console**: Verification file serving
- **Privacy-Focused**: No PII collection by default

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kodaklens.git
   cd kodaklens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   # Analytics (optional)
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   
   # CMS (optional)
   CMS_PROVIDER=contentful|strapi|local
   CMS_TOKEN=your-cms-token
   CMS_SPACE=your-cms-space
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
kodaklens/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── seo-rules/    # SEO rules endpoint
│   │   │   ├── report/       # Report persistence
│   │   │   └── captions/     # Caption generation
│   │   ├── story/[slug]/     # Dynamic story pages
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   ├── utils.ts          # Utility functions
│   │   ├── db.ts             # Database client
│   │   └── socket.ts         # WebSocket logic
│   └── hooks/                # Custom React hooks
├── content/
│   ├── reports/              # Analysis reports
│   └── stories/              # CMS content
├── docs/                     # Documentation
├── public/                   # Static assets
├── prisma/                   # Database schema
└── package.json
```

## 🛠️ Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run export       # Static export

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checker
npm run format       # Format code with Prettier

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests

# Analysis
npm run analyze      # Bundle analysis
```

### Git Workflow

1. **Branch Naming**: Use conventional prefixes
   - `feat/` - New features
   - `fix/` - Bug fixes
   - `chore/` - Maintenance tasks
   - `docs/` - Documentation

2. **Commit Messages**: Follow Conventional Commits
   ```
   feat: add template switching functionality
   fix: resolve image upload validation error
   docs: update README with installation instructions
   ```

3. **Pull Requests**: 
   - Include description of changes
   - Reference related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#EA580C) - Kodak-inspired brand color
- **Secondary**: Gray variants for neutral elements
- **Success**: Green (#16A34A) for positive indicators
- **Warning**: Yellow (#CA8A04) for attention needed
- **Error**: Red (#DC2626) for errors

### Typography
- **Headings**: Inter, bold weights
- **Body**: Inter, regular/medium weights
- **Scale**: Responsive typography with mobile-first approach

### Components
Built with shadcn/ui component library:
- Button, Card, Badge, Tabs
- Form controls with validation
- Responsive layout components
- Accessible interactive elements

## 📊 Performance Budgets

### Mobile Targets
- **LCP**: ≤ 2.5s (Largest Contentful Paint)
- **CLS**: ≤ 0.1 (Cumulative Layout Shift)
- **TBT**: ≤ 200ms (Total Blocking Time)
- **Image Size**: < 1200px responsive width

### Optimization Techniques
- Next.js Image component optimization
- Static generation where possible
- Code splitting and lazy loading
- Efficient bundle management

## 🧪 Testing Strategy

### Unit Tests
- **Framework**: Vitest
- **Focus**: Utility functions, validators, business logic
- **Coverage**: SEO rules, accessibility checks, data processing

### E2E Tests
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Scenarios**: Upload flow, template switching, report generation
- **Accessibility**: Axe-core integration for WCAG checks

### Manual Testing
- **Responsive Design**: Mobile, tablet, desktop breakpoints
- **Cross-browser**: Modern evergreen browsers
- **Accessibility**: Keyboard navigation, screen reader testing

## 🔒 Security & Privacy

### Data Protection
- **No PII**: No personally identifiable information collected
- **Local Processing**: Image processing happens client-side
- **Secure Headers**: CSP headers for XSS prevention
- **Input Sanitization**: All user inputs validated and sanitized

### Privacy Features
- **Analytics Optional**: GA4/GTM disabled by default
- **Local Storage**: Preferences stored locally
- **Cookie-Free**: No third-party cookies by default

## 🌐 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Static Export
```bash
npm run export
```
Generates static files in `out/` directory for any static hosting.

### Docker Support
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Analytics & Monitoring

### Google Analytics 4
```javascript
// Events tracked
- page_view
- template_switch
- seo_report_run
- story_generation
```

### Google Tag Manager
```javascript
// Data layer events
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'seo_report_run',
  score: 92,
  template: 'classic'
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all checks pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** for the amazing React framework
- **Lucide React** for the icon library

## 📞 Support

For support, please:
1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/your-username/kodaklens/issues)
3. Create a new issue if needed

## 🗺️ Roadmap

### Phase 1 (Completed)
- [x] Core upload functionality
- [x] Template system
- [x] SEO analysis
- [x] Basic accessibility checks

### Phase 2 (In Progress)
- [ ] Full WCAG 2.1 AA compliance
- [ ] Headless CMS integration
- [ ] Advanced analytics
- [ ] E2E test suite

### Phase 3 (Future)
- [ ] User authentication
- [ ] Collaboration features
- [ ] Advanced image processing
- [ ] Mobile app

---

**Built with ❤️ using modern web technologies**