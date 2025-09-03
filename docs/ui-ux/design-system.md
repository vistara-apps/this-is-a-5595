# Zara Rights - UI/UX Design System

This document outlines the design system implemented in the Zara Rights application, including layout, components, tokens, and usage guidelines.

## Layout System

The application uses a responsive grid layout system based on Tailwind CSS.

### Grid Specifications

- **Grid Type**: 12-column fluid grid
- **Gutter Width**: 24px
- **Container Width**: Responsive with max-width constraints
  - `max-w-3xl px-4 sm:px-6 lg:px-8`

### Responsive Breakpoints

| Breakpoint | Screen Width | Class Prefix |
|------------|--------------|--------------|
| Default    | < 640px      | (none)       |
| Small      | ≥ 640px      | sm:          |
| Medium     | ≥ 768px      | md:          |
| Large      | ≥ 1024px     | lg:          |
| Extra Large| ≥ 1280px     | xl:          |

## Motion System

### Easing

- **Standard Easing**: `cubic-bezier(0.22,1,0.36,1)`

### Duration

- **Base Duration**: 250ms
- **Fast Duration**: 150ms

## Design Tokens

### Colors

| Token           | Value              | Usage                                |
|-----------------|--------------------|------------------------------------- |
| Bg              | hsl(220 15% 95%)   | Main background color                |
| Error           | hsl(0 70% 50%)     | Error states and alerts              |
| Accent          | hsl(160 70% 40%)   | Success states and highlights        |
| Primary         | hsl(220 80% 45%)   | Primary actions and focus states     |
| Surface         | hsl(0 0% 100%)     | Card backgrounds and surfaces        |
| Text Primary    | hsl(225 10% 20%)   | Primary text content                 |
| Text Secondary  | hsl(220 10% 40%)   | Secondary and supporting text        |

### Border Radius

| Token           | Value              | Usage                                |
|-----------------|--------------------|------------------------------------- |
| Radius Sm       | 6px                | Small elements (buttons, inputs)     |
| Radius Md       | 10px               | Medium elements (cards, panels)      |
| Radius Lg       | 16px               | Large elements (modals, dialogs)     |

### Shadows

| Token           | Value                                      | Usage                |
|-----------------|--------------------------------------------|--------------------- |
| Card            | 0 8px 24px hsla(220, 10%, 10%, 0.12)       | Cards and elevated surfaces |

### Spacing

| Token           | Value              | Usage                                |
|-----------------|--------------------|------------------------------------- |
| Spacing Sm      | 8px                | Tight spacing (between related items)|
| Spacing Md      | 12px               | Standard spacing                     |
| Spacing Lg      | 20px               | Generous spacing (between sections)  |

### Typography

| Token           | Value                          | Usage                        |
|-----------------|--------------------------------|------------------------------|
| Display         | text-4xl font-bold            | Large headings, hero text    |
| Headline        | text-2xl font-semibold        | Section headings             |
| Body            | text-base font-normal leading-7| Main content text            |
| Caption         | text-sm font-normal           | Supporting text, labels      |

## Component Library

### AppShell

The main layout container that provides consistent structure across all views.

**Variants:**
- Default

**Usage:**
```jsx
<AppShell
  user={user}
  language={language}
  onLanguageChange={setLanguage}
  currentView={currentView}
>
  {children}
</AppShell>
```

### ContentCard

Cards that display scenario information and content.

**Variants:**
- scenario: For displaying scenario guides
- guideSummary: For displaying condensed information

**Usage:**
```jsx
<ContentCard
  variant="scenario"
  title={scenario.title[language]}
  content={scenario.content[language]}
/>
```

### CallToActionButton

Primary action buttons with consistent styling.

**Variants:**
- primary: Blue background, white text
- secondary: White background, blue border and text
- alert: Red background, white text

**Usage:**
```jsx
<CallToActionButton
  variant="primary"
  icon={<Icon className="w-6 h-6" />}
  title="Button Title"
  description="Button description text"
  onClick={handleAction}
  className="additional-classes"
/>
```

### LanguageSelector

Component for switching between supported languages.

**Variants:**
- default

**Usage:**
```jsx
<LanguageSelector
  currentLanguage={language}
  onChange={setLanguage}
/>
```

### ShareButton

Button for sharing content to external platforms.

**Variants:**
- default

**Usage:**
```jsx
<ShareButton
  url={shareableUrl}
  title="Share Title"
  text="Share text content"
/>
```

### RecordingStatusIndicator

Visual indicator for recording status.

**Variants:**
- recording: Animated red indicator
- idle: Static gray indicator

**Usage:**
```jsx
<RecordingStatusIndicator variant={isRecording ? 'recording' : 'idle'} />
```

## Accessibility Guidelines

### Color Contrast

- Text on background colors maintains a minimum contrast ratio of 4.5:1
- Interactive elements maintain a minimum contrast ratio of 3:1
- Error states use high contrast for visibility

### Focus States

- All interactive elements have visible focus states
- Focus order follows a logical sequence
- Focus is trapped in modal dialogs

### Screen Reader Support

- All images have appropriate alt text
- Form controls have associated labels
- ARIA attributes are used where appropriate

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Custom keyboard shortcuts are documented
- Tab order follows visual layout

## Responsive Design Principles

1. **Mobile-First Approach**: All components are designed for mobile first, then enhanced for larger screens
2. **Fluid Typography**: Text scales appropriately across device sizes
3. **Adaptive Layouts**: Components reflow based on available space
4. **Touch-Friendly Targets**: Interactive elements have minimum touch target size of 44px

## Implementation with Tailwind CSS

The design system is implemented using Tailwind CSS with custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 15% 95%)',
        error: 'hsl(0 70% 50%)',
        accent: 'hsl(160 70% 40%)',
        primary: 'hsl(220 80% 45%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(225 10% 20%)',
        'text-secondary': 'hsl(220 10% 40%)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(220, 10%, 10%, 0.12)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
    },
  },
  // Additional configuration...
};
```

## Usage Guidelines

### Component Selection

1. Use `AppShell` as the base layout for all views
2. Use `ContentCard` for displaying structured information
3. Use `CallToActionButton` for primary user actions
4. Use `RecordingStatusIndicator` only for recording state visualization

### Styling Consistency

1. Use design tokens for all visual properties
2. Maintain consistent spacing using the spacing system
3. Follow typography guidelines for text hierarchy
4. Use color tokens appropriately for their semantic meaning

### Responsive Considerations

1. Test all components at all breakpoints
2. Ensure touch targets are appropriately sized on mobile
3. Use appropriate text sizes for readability across devices
4. Consider landscape and portrait orientations

## Future Enhancements

1. **Component Library Documentation**: Create a Storybook instance for component visualization
2. **Design Token Automation**: Implement design token synchronization with design tools
3. **Accessibility Audit**: Conduct comprehensive accessibility testing
4. **Animation Guidelines**: Expand motion system with more detailed animation patterns

