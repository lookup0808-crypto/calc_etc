# FIRE Calculator Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from financial planning tools like Personal Capital and Mint, combined with the clean aesthetic of modern calculators. The application prioritizes utility and data visualization while maintaining visual appeal for financial engagement.

## Core Design Elements

### Color Palette
**Primary Brand**: 15 85% 60% (vibrant orange matching the existing chart color)
**Secondary**: 15 25% 25% (deep charcoal for text and backgrounds)
**Success**: 145 60% 50% (green for positive growth indicators)
**Background Light**: 0 0% 98% (off-white for main backgrounds)
**Background Dark**: 220 15% 15% (dark navy for dark mode)
**Text Light**: 0 0% 20% (dark gray for readability)
**Text Dark**: 0 0% 90% (light gray for dark mode text)

### Typography
**Primary Font**: Inter or Noto Sans KR (for Korean text support)
**Headings**: 700 weight for page titles, 600 for section headers
**Body Text**: 400 weight, 16px base size
**Numbers/Data**: 500 weight for emphasis on financial figures

### Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, h-8)
**Grid**: 12-column responsive grid with consistent gutters
**Containers**: Max-width of 1200px for main content areas
**Cards**: Consistent 8px border radius with subtle shadows

### Component Library

**Navigation**
- Clean tab-based navigation between FIRE/ETF sections
- Active state using primary orange color
- Minimal horizontal navigation bar

**Input Forms**
- Grouped form sections with clear labels in Korean
- Number inputs with appropriate formatting (currency, percentages)
- Range sliders for interactive parameter adjustment
- Validation states with orange accents

**Data Visualization**
- Line charts using Chart.js with orange primary color
- Clean grid lines and minimal styling
- Tooltips showing detailed financial projections
- Legend positioned below charts

**Cards and Containers**
- White backgrounds with subtle border shadows
- Consistent padding using spacing units
- Clear section separation without heavy borders

**Buttons**
- Primary: Orange background with white text
- Secondary: Outline style with orange border
- Calculate/Submit actions prominently displayed

### Korean Language Considerations
- Ensure proper Korean font rendering with Noto Sans KR fallback
- Right-to-left number formatting for Korean currency (₩)
- Appropriate spacing for mixed Korean-English content
- Cultural considerations for retirement age assumptions

### Financial Data Display
- Large, prominent display of calculated results
- Clear hierarchy between total assets, monthly savings, and projections
- Color coding for different scenarios (conservative/optimistic)
- Percentage formatting consistent with Korean financial conventions

### Responsive Design
- Mobile-first approach with touch-friendly input controls
- Charts that scale appropriately on smaller screens
- Stacked layout for mobile with tab navigation
- Consistent footer placement across all screen sizes

### Accessibility
- High contrast ratios for financial data readability
- Screen reader support for chart data
- Keyboard navigation for all interactive elements
- Clear focus states using orange accent color

This design framework creates a professional, trustworthy financial planning tool that balances Korean cultural preferences with modern web design principles, emphasizing clarity and functionality over decorative elements.