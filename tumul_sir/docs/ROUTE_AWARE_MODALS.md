# Route-Aware Modals Implementation

## Overview
This document outlines the implementation of route-aware modals for the website's policy pages (Terms & Conditions, Privacy Policy, and Refund Policy). The implementation allows these pages to be accessed both as standalone pages and as modals, with proper URL handling and browser history management.

## Key Features

1. **Dual Display Modes**
   - Modal display when accessed from within the application
   - Full-page display when accessed directly via URL

2. **URL Management**
   - Updates URL when a modal is opened
   - Maintains browser history
   - Supports direct linking to any policy page

3. **Responsive Design**
   - Works on all device sizes
   - Consistent styling with the application's design system

## Implementation Details

### 1. Modal Component (`src/components/ui/modal.tsx`)

A reusable modal component that handles both modal and full-page display modes.

```typescript
// Example usage:
<Modal 
  isOpen={isOpen} 
  onClose={handleClose} 
  title="Modal Title"
>
  {/* Modal content */}
</Modal>
```

### 2. Routing Configuration (`src/App.tsx`)

Routes are configured to handle both modal and full-page views:

```typescript
// Modal routes (shown when accessed from within the app)
{background && (
  <Routes>
    <Route path="/terms" element={
      <TermsViewModal open={true} onClose={() => window.history.back()} />
    } />
    {/* Other policy routes */}
  </Routes>
)}

// Full page routes (shown when accessed directly)
<Routes>
  <Route path="/terms" element={
    <RouteModal title="Terms & Conditions">
      <TermsViewModal open={true} onClose={() => {}} />
    </RouteModal>
  } />
  {/* Other routes */}
</Routes>
```

### 3. Policy Components

Each policy component follows this pattern:

```typescript
const PolicyComponent = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <Modal isOpen={open ?? true} onClose={handleClose} title="Policy Title">
      {/* Policy content */}
    </Modal>
  );
};
```

### 4. Navigation from Footer (`src/components/Footer.tsx`)

Links in the footer use the `navigate` function with state to open modals:

```typescript
const openModal = (path: string) => {
  navigate(path, {
    state: { background: location },
  });
};

// Usage:
<button onClick={() => openModal('/terms')}>
  Terms & Conditions
</button>
```

## Usage Examples

### Opening a Modal
```typescript
// From any component with access to navigate
navigate('/terms', { state: { background: location } });
```

### Creating a New Policy Modal
1. Create a new component in `src/components/` (e.g., `NewPolicyModal.tsx`)
2. Follow the pattern of existing policy components
3. Add routes in `App.tsx` for both modal and full-page views
4. Add navigation links where needed

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS, Android)
- IE11 is not supported

## Performance Considerations
- Modals are code-split and lazy-loaded
- Only the active modal is rendered
- Smooth animations are implemented using Framer Motion

## Accessibility
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader support

## Testing
Test the following scenarios:
1. Clicking a policy link in the footer opens a modal
2. Browser back/forward buttons work correctly
3. Direct navigation to policy URLs shows full pages
4. Modal can be closed using the close button or Escape key
5. Focus is properly managed when opening/closing modals

## Known Issues
- None currently

## Future Improvements
- Add analytics tracking for modal views
- Implement a more sophisticated animation system
- Add support for nested modals if needed

## Dependencies
- React Router v6
- Framer Motion (for animations)
- Tailwind CSS (for styling)
