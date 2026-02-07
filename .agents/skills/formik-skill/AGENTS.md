# Formik Form Management

**Version 1.0.0**  
formik-skill  
February 2026

> **Note:**  
> This document is mainly for agents and LLMs to follow when implementing,  
> maintaining, or refactoring React forms using Formik. Humans may also find  
> it useful, but guidance here is optimized for automation and consistency  
> by AI-assisted workflows.

---

## Abstract

Comprehensive Formik guide for building React forms designed for AI agents and LLMs. Contains patterns for form state management, validation (Yup and custom), field components, error handling, async submissions, and performance optimization. Covers everything from basic form setup to advanced patterns including dynamic fields, nested objects, field arrays, and Material-UI integration.

---

## Table of Contents

1. [Form Setup](#1-form-setup) — **CRITICAL**
   - 1.1 [Basic useFormik Hook](#11-basic-useformik-hook)
   - 1.2 [Formik Component with Render Props](#12-formik-component-with-render-props)
   - 1.3 [Initial Values Configuration](#13-initial-values-configuration)
   - 1.4 [Field Component Integration](#14-field-component-integration)

2. [Validation](#2-validation) — **CRITICAL**
   - 2.1 [Yup Schema Validation](#21-yup-schema-validation)
   - 2.2 [Custom Validation Functions](#22-custom-validation-functions)
   - 2.3 [Field-Level Validation](#23-field-level-validation)
   - 2.4 [Async Validation](#24-async-validation)
   - 2.5 [Server-Side Validation Errors](#25-server-side-validation-errors)

3. [Field Components](#3-field-components) — **HIGH**
   - 3.1 [Basic Input Fields](#31-basic-input-fields)
   - 3.2 [Select and Textarea](#32-select-and-textarea)
   - 3.3 [Radio Buttons](#33-radio-buttons)
   - 3.4 [Checkboxes and Checkbox Groups](#34-checkboxes-and-checkbox-groups)
   - 3.5 [Custom Field Components](#35-custom-field-components)

4. [Error Display](#4-error-display) — **HIGH**
   - 4.1 [ErrorMessage Component](#41-errormessage-component)
   - 4.2 [Manual Error Display](#42-manual-error-display)
   - 4.3 [Conditional Error Rendering](#43-conditional-error-rendering)
   - 4.4 [Form-Level Status Messages](#44-form-level-status-messages)

5. [Advanced Patterns](#5-advanced-patterns) — **MEDIUM**
   - 5.1 [FieldArray for Dynamic Lists](#51-fieldarray-for-dynamic-lists)
   - 5.2 [Nested Objects](#52-nested-objects)
   - 5.3 [Dependent Fields](#53-dependent-fields)
   - 5.4 [Conditional Field Visibility](#54-conditional-field-visibility)

6. [Form Submission](#6-form-submission) — **HIGH**
   - 6.1 [Basic Synchronous Submission](#61-basic-synchronous-submission)
   - 6.2 [Async API Submission](#62-async-api-submission)
   - 6.3 [Handling Submission State](#63-handling-submission-state)
   - 6.4 [Form Reset After Success](#64-form-reset-after-success)

7. [Performance Optimization](#7-performance-optimization) — **MEDIUM**
   - 7.1 [FastField for Large Forms](#71-fastfield-for-large-forms)
   - 7.2 [Memoization Strategies](#72-memoization-strategies)
   - 7.3 [Debounced Validation](#73-debounced-validation)

8. [Integration Patterns](#8-integration-patterns) — **MEDIUM**
   - 8.1 [Material-UI Integration](#81-material-ui-integration)
   - 8.2 [React Router Navigation](#82-react-router-navigation)
   - 8.3 [Custom UI Libraries](#83-custom-ui-libraries)

---

## 1. Form Setup

**Impact: CRITICAL**

Fundamental patterns for initializing and structuring Formik forms.

### 1.1 Basic useFormik Hook

**Impact: CRITICAL (recommended modern approach)**

Use the `useFormik` hook for cleaner, more maintainable form code.

#### Bad Example

```jsx
// Directly managing form state without Formik
function MyForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Manual validation and submission logic
    if (!email) setErrors(prev => ({ ...prev, email: 'Required' }));
    // ... more validation
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <div>{errors.email}</div>}
      {/* Repetitive boilerplate */}
    </form>
  );
}
```

**Problems:**
- Manual state management for each field
- Repetitive onChange handlers
- No built-in validation support
- Difficult to scale with more fields
- No form-level state (isSubmitting, dirty, etc.)

#### Good Example

```jsx
import { useFormik } from 'formik';

function MyForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email';
      }
      return errors;
    },
    onSubmit: values => {
      console.log(values);
    },
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="error">{formik.errors.email}</div>
      ) : null}
      
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      
      <button type="submit" disabled={formik.isSubmitting}>
        Submit
      </button>
    </form>
  );
}
```

**Benefits:**
- Centralized form state
- Built-in validation support
- Automatic field tracking (touched, errors)
- Form-level helpers (isSubmitting, dirty, isValid)
- Clean, scalable code

**Impact:** **CRITICAL** - Reduces form code by 40-50%, eliminates manual state bugs

---

### 1.2 Formik Component with Render Props

**Impact: HIGH (useful for complex scenarios)**

Use the `Formik` component with render props or child functions when you need more flexibility.

#### Good Example

```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';

function MyForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) errors.email = 'Required';
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error" />
          
          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" className="error" />
          
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          
          {/* Access to form state */}
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}
```

**Benefits:**
- `<Form>` component automatically handles onSubmit
- `<Field>` components automatically connect to form state
- `<ErrorMessage>` simplifies error display
- Access to all form state in render prop

**Use when:**
- Building reusable form components
- Need access to form state for conditional rendering
- Using Formik's built-in components (Form, Field, ErrorMessage)

---

### 1.3 Initial Values Configuration

**Impact: HIGH (prevents undefined field errors)**

Always define all form fields in `initialValues`, even if they start empty.

#### Bad Example

```jsx
// Missing fields in initialValues
const formik = useFormik({
  initialValues: {
    email: '',
    // Missing: password, acceptTerms
  },
  onSubmit: values => console.log(values),
});

// Later in form:
<input name="password" onChange={formik.handleChange} />
// ❌ Warning: uncontrolled to controlled component
```

**Problems:**
- Uncontrolled to controlled component warnings
- Fields not tracked by Formik
- Validation won't work properly
- values object missing properties

#### Good Example

```jsx
const formik = useFormik({
  initialValues: {
    // Define ALL fields, even if empty
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    acceptTerms: false,
    role: 'user',
    preferences: {
      newsletter: false,
      notifications: true,
    },
    tags: [], // Empty array for multi-value fields
  },
  onSubmit: values => console.log(values),
});
```

**Benefits:**
- All fields are controlled components
- No React warnings
- Predictable form state
- TypeScript autocomplete support

**Critical Rules:**
- ✅ Define every field in initialValues
- ✅ Use empty string ('') for text inputs
- ✅ Use false for checkboxes
- ✅ Use empty array ([]) for multi-selects and FieldArrays
- ✅ Match structure of expected submission data

---

### 1.4 Field Component Integration

**Impact: HIGH (simplifies field bindings)**

Use getFieldProps or Field component to reduce boilerplate.

#### Without getFieldProps (Verbose)

```jsx
<input
  name="email"
  type="email"
  value={formik.values.email}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
```

#### With getFieldProps (Clean)

```jsx
<input
  type="email"
  {...formik.getFieldProps('email')}
/>
```

**Impact:** Reduces field code by 60%, eliminates binding errors

---

## 2. Validation

**Impact: CRITICAL**

Comprehensive validation strategies for form data.

### 2.1 Yup Schema Validation

**Impact: CRITICAL (recommended for all forms)**

Use Yup for declarative, type-safe validation schemas.

#### Bad Example

```jsx
// Custom validation function with repetitive logic
const validate = values => {
  const errors = {};
  
  // Repetitive pattern for each field
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'Too short';
  } else if (values.firstName.length > 50) {
    errors.firstName = 'Too long';
  }
  
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email';
  }
  
  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(values.age)) {
    errors.age = 'Must be a number';
  } else if (values.age < 0) {
    errors.age = 'Must be positive';
  } else if (!Number.isInteger(Number(values.age))) {
    errors.age = 'Must be an integer';
  }
  
  // Lots of repetitive validation code...
  return errors;
};
```

**Problems:**
- Verbose, repetitive code
- Hard to maintain
- Easy to miss edge cases
- No schema documentation
- Difficult to test

#### Good Example

```jsx
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  
  age: Yup.number()
    .positive('Must be positive')
    .integer('Must be an integer')
    .required('Required'),
  
  website: Yup.string()
    .url('Must be a valid URL')
    .nullable(),
  
  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms'),
});

function SignupForm() {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        website: '',
        acceptTerms: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {/* Form fields */}
    </Formik>
  );
}
```

**Benefits:**
- Declarative, self-documenting
- Built-in validators (email, url, number, etc.)
- Composable and reusable
- Type coercion included
- Easy to test
- Better error messages

**Common Yup Validators:**
```jsx
// String
Yup.string()
  .min(2)
  .max(50)
  .email()
  .url()
  .matches(/regex/, 'message')
  .required()

// Number
Yup.number()
  .min(0)
  .max(100)
  .positive()
  .negative()
  .integer()
  .required()

// Boolean
Yup.boolean()
  .oneOf([true], 'Must accept')
  .required()

// Date
Yup.date()
  .min(new Date(), 'Future dates only')
  .max(new Date(), 'Past dates only')
  .required()

// Array
Yup.array()
  .of(Yup.string())
  .min(1, 'At least one required')
  .required()

// Object
Yup.object().shape({
  nested: Yup.string().required()
})

// Conditional
Yup.string()
  .when('country', {
    is: 'US',
    then: schema => schema.required('ZIP required for US'),
    otherwise: schema => schema.notRequired()
  })
```

**Impact:** **CRITICAL** - Reduces validation code by 70%, eliminates validation bugs

**Reference:** See [references/YUP_VALIDATION.md](references/YUP_VALIDATION.md) for comprehensive Yup patterns

---

### 2.2 Custom Validation Functions

**Impact: MEDIUM (use when Yup can't handle logic)**

Write custom validation for complex business logic.

#### Good Example

```jsx
const validate = values => {
  const errors = {};
  
  // Complex business logic
  if (values.startDate && values.endDate) {
    const start = new Date(values.startDate);
    const end = new Date(values.endDate);
    
    if (start > end) {
      errors.endDate = 'End date must be after start date';
    }
    
    const daysDiff = (end - start) / (1000 * 60 * 60 * 24);
    if (daysDiff > 365) {
      errors.endDate = 'Date range cannot exceed one year';
    }
  }
  
  // Cross-field validation
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }
  
  return errors;
};

<Formik
  validate={validate}
  // ... other props
/>
```

**Use for:**
- Cross-field validation
- Complex business rules
- External data dependencies
- Multi-step validation logic

---

### 2.3 Field-Level Validation

**Impact: MEDIUM (useful for specific fields)**

Validate individual fields independently.

#### Good Example

```jsx
function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length < 3) {
    error = 'Username must be at least 3 characters';
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    error = 'Only letters, numbers, and underscores';
  }
  return error;
}

<Field name="email" validate={validateEmail} />
<Field name="username" validate={validateUsername} />
```

**Benefits:**
- Runs independently
- Useful for async validation (e.g., checking username availability)
- Can be combined with form-level validation
- Easier to test in isolation

---

### 2.4 Async Validation

**Impact: MEDIUM (for server-side checks)**

Validate against server (e.g., check if username exists).

#### Good Example

```jsx
async function validateUsername(value) {
  if (!value) return 'Required';
  
  try {
    const response = await fetch(`/api/check-username?username=${value}`);
    const data = await response.json();
    
    if (!data.available) {
      return 'Username already taken';
    }
  } catch (error) {
    return 'Unable to validate username';
  }
}

<Field 
  name="username" 
  validate={validateUsername}
/>
```

**Best practices:**
- Debounce async validation
- Show loading indicator
- Handle network errors gracefully
- Cache results when possible

---

### 2.5 Server-Side Validation Errors

**Impact: HIGH (critical for API integration)**

Handle validation errors from server responses.

#### Good Example

```jsx
const formik = useFormik({
  initialValues: { email: '', password: '' },
  onSubmit: async (values, { setFieldError, setErrors, setSubmitting }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        
        // Option 1: Set individual field errors
        if (errorData.fieldErrors) {
          Object.entries(errorData.fieldErrors).forEach(([field, message]) => {
            setFieldError(field, message);
          });
        }
        
        // Option 2: Set all errors at once
        if (errorData.errors) {
          setErrors(errorData.errors);
        }
        
        // Option 3: Set form-level error
        if (errorData.message) {
          setErrors({ submit: errorData.message });
        }
      } else {
        // Handle success
        console.log('Login successful');
      }
    } catch (error) {
      setErrors({ submit: 'Network error occurred' });
    } finally {
      setSubmitting(false);
    }
  },
});

// Display form-level error
{formik.errors.submit && (
  <div className="form-error">{formik.errors.submit}</div>
)}
```

**Critical patterns:**
- Use `setFieldError` for specific field errors
- Use `setErrors` for multiple errors
- Always set `setSubmitting(false)` in finally block
- Display form-level errors separately

---

## 3. Field Components

**Impact: HIGH**

Patterns for implementing various input types with Formik.

### 3.1 Basic Input Fields

**Impact: HIGH (most common use case)**

Standard text inputs with proper bindings.

#### Good Example

```jsx
import { Field } from 'formik';

// Automatic bindings with Field component
<Field 
  name="email" 
  type="email" 
  placeholder="Email"
  className="form-input"
/>

<Field 
  name="firstName" 
  type="text" 
  placeholder="First Name"
/>

// With manual bindings using getFieldProps
<input
  type="text"
  placeholder="Last Name"
  className="form-input"
  {...formik.getFieldProps('lastName')}
/>
```

**Field component benefits:**
- Automatic name, value, onChange, onBlur binding
- Works with any input type
- Can use 'as' prop for custom elements

---

### 3.2 Select and Textarea

**Impact: HIGH (common form elements)**

Dropdown and multiline text inputs.

#### Good Example

```jsx
// Select dropdown
<Field name="color" as="select" className="form-select">
  <option value="">Select a color</option>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</Field>

// Multi-select
<Field name="favoriteColors" as="select" multiple className="form-select">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
  <option value="yellow">Yellow</option>
</Field>

// Textarea
<Field 
  name="description" 
  as="textarea" 
  rows="5"
  placeholder="Enter description..."
  className="form-textarea"
/>
```

**Initial values for selects:**
```jsx
initialValues: {
  color: '', // Single select
  favoriteColors: [], // Multi-select
  description: '', // Textarea
}
```

---

### 3.3 Radio Buttons

**Impact: MEDIUM (grouped inputs)**

Radio button groups with Formik.

#### Good Example

```jsx
<div role="group" aria-labelledby="contact-method-group">
  <label id="contact-method-group">Preferred Contact Method</label>
  
  <label>
    <Field type="radio" name="contactMethod" value="email" />
    Email
  </label>
  
  <label>
    <Field type="radio" name="contactMethod" value="phone" />
    Phone
  </label>
  
  <label>
    <Field type="radio" name="contactMethod" value="sms" />
    SMS
  </label>
</div>

<ErrorMessage name="contactMethod" component="div" className="error" />
```

**Initial value:**
```jsx
initialValues: {
  contactMethod: 'email', // Pre-select email
}
```

**Critical rules:**
- All radio buttons in a group share the same `name`
- Each has unique `value`
- Use role="group" for accessibility
- Initial value should match one of the values

---

### 3.4 Checkboxes and Checkbox Groups

**Impact: MEDIUM (boolean and array fields)**

Single checkbox and checkbox groups.

#### Good Example - Single Checkbox

```jsx
<label>
  <Field type="checkbox" name="acceptTerms" />
  I accept the terms and conditions
</label>

<ErrorMessage name="acceptTerms" component="div" className="error" />

// Initial value
initialValues: {
  acceptTerms: false, // Boolean
}
```

#### Good Example - Checkbox Group (Array)

```jsx
<div role="group" aria-labelledby="hobbies-group">
  <label id="hobbies-group">Hobbies</label>
  
  <label>
    <Field type="checkbox" name="hobbies" value="reading" />
    Reading
  </label>
  
  <label>
    <Field type="checkbox" name="hobbies" value="coding" />
    Coding
  </label>
  
  <label>
    <Field type="checkbox" name="hobbies" value="gaming" />
    Gaming
  </label>
  
  <label>
    <Field type="checkbox" name="hobbies" value="sports" />
    Sports
  </label>
</div>

<ErrorMessage name="hobbies" component="div" className="error" />

// Initial value
initialValues: {
  hobbies: [], // Array - will contain checked values
}

// Submitted value example: 
// hobbies: ['reading', 'gaming']
```

**Critical rules:**
- Single checkbox: boolean value
- Multiple checkboxes: array value in initialValues
- All checkboxes in group share same `name`
- Each has unique `value`

---

### 3.5 Custom Field Components

**Impact: MEDIUM (for custom UI libraries)**

Build custom field components that work with Formik.

#### Good Example

```jsx
// Custom input component
const MyInput = ({ field, form, ...props }) => {
  const hasError = form.touched[field.name] && form.errors[field.name];
  
  return (
    <div className="custom-input-wrapper">
      <input 
        {...field} 
        {...props}
        className={hasError ? 'input-error' : 'input-normal'}
      />
      {hasError && (
        <span className="error-text">{form.errors[field.name]}</span>
      )}
    </div>
  );
};

// Usage
<Field name="email" component={MyInput} placeholder="Email" />

// Or with children function
<Field name="email">
  {({ field, form, meta }) => (
    <div>
      <input {...field} placeholder="Email" />
      {meta.touched && meta.error && (
        <div className="error">{meta.error}</div>
      )}
    </div>
  )}
</Field>
```

**Field component receives:**
- `field`: { name, value, onChange, onBlur }
- `form`: entire formik instance
- `meta`: { touched, error, value, initialValue }

---

## 4. Error Display

**Impact: HIGH**

Patterns for showing validation errors to users.

### 4.1 ErrorMessage Component

**Impact: HIGH (simplest error display)**

Use Formik's ErrorMessage component for automatic error rendering.

#### Good Example

```jsx
import { ErrorMessage } from 'formik';

// Basic usage (renders error text)
<ErrorMessage name="email" />

// With custom component
<ErrorMessage name="email" component="div" className="error-text" />

// With custom styling component
<ErrorMessage name="email" component="span" className="text-red-500" />

// With render prop for full control
<ErrorMessage name="email">
  {msg => <div className="error-message-box">{msg}</div>}
</ErrorMessage>

// Complex error display
<ErrorMessage name="email">
  {msg => (
    <div className="flex items-center gap-2 text-red-600">
      <svg className="w-4 h-4">
        <path d="M10 18..." />
      </svg>
      <span>{msg}</span>
    </div>
  )}
</ErrorMessage>
```

**Benefits:**
- Automatically checks `touched` state
- Only renders when error exists
- Clean, declarative syntax

---

### 4.2 Manual Error Display

**Impact: MEDIUM (when you need more control)**

Manually check touched and errors for custom rendering.

#### Good Example

```jsx
// Basic manual check
{formik.touched.email && formik.errors.email ? (
  <div className="error">{formik.errors.email}</div>
) : null}

// With helper function
const showError = (field) => {
  return formik.touched[field] && formik.errors[field]
    ? formik.errors[field]
    : null;
};

{showError('email') && (
  <div className="error">{showError('email')}</div>
)}

// With custom error component
{formik.touched.email && formik.errors.email && (
  <ErrorAlert message={formik.errors.email} />
)}
```

**Use when:**
- Custom error UI components
- Complex conditional rendering
- Need access to multiple form properties

---

### 4.3 Conditional Error Rendering

**Impact: MEDIUM (better UX)**

Show errors only when appropriate.

#### Good Example

```jsx
// Show error only after field is touched
{formik.touched.email && formik.errors.email && (
  <div className="error">{formik.errors.email}</div>
)}

// Show error only after form submit attempt
{formik.submitCount > 0 && formik.errors.email && (
  <div className="error">{formik.errors.email}</div>
)}

// Show error after touched OR submit
{((formik.touched.email || formik.submitCount > 0) && formik.errors.email) && (
  <div className="error">{formik.errors.email}</div>
)}

// Custom error visibility logic
const shouldShowError = (field) => {
  const fieldTouched = formik.touched[field];
  const fieldError = formik.errors[field];
  const formSubmitted = formik.submitCount > 0;
  
  return fieldError && (fieldTouched || formSubmitted);
};

{shouldShowError('email') && (
  <div className="error">{formik.errors.email}</div>
)}
```

**Best practices:**
- Don't show all errors on mount
- Wait for touch or submit attempt
- Consider showing errors on blur for better UX

---

### 4.4 Form-Level Status Messages

**Impact: MEDIUM (for success/error messages)**

Use `status` for form-level messages that aren't field-specific.

#### Good Example

```jsx
const formik = useFormik({
  initialValues: { email: '' },
  onSubmit: async (values, { setStatus, setSubmitting }) => {
    try {
      await api.submit(values);
      setStatus({ type: 'success', message: 'Form submitted successfully!' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  },
});

// Display status message
{formik.status && (
  <div className={`alert alert-${formik.status.type}`}>
    {formik.status.message}
  </div>
)}
```

**Use for:**
- Success messages
- Form-level errors (not field-specific)
- API error messages
- General notifications

---

## 5. Advanced Patterns

**Impact: MEDIUM**

Complex form patterns for dynamic and nested data structures.

### 5.1 FieldArray for Dynamic Lists

**Impact: HIGH (for repeating field groups)**

Manage arrays of fields with add/remove functionality.

#### Bad Example

```jsx
// Manual array management (error-prone)
const [friends, setFriends] = useState(['']);

const addFriend = () => {
  setFriends([...friends, '']);
};

const removeFriend = (index) => {
  const newFriends = friends.filter((_, i) => i !== index);
  setFriends(newFriends);
  // Need to manually sync with Formik
  formik.setFieldValue('friends', newFriends);
};
```

#### Good Example

```jsx
import { FieldArray } from 'formik';

function FriendsForm() {
  return (
    <Formik
      initialValues={{
        friends: [{ name: '', email: '' }],
      }}
      onSubmit={values => console.log(values)}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <div>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div key={index} className="friend-row">
                      <Field
                        name={`friends.${index}.name`}
                        placeholder="Name"
                      />
                      <ErrorMessage
                        name={`friends.${index}.name`}
                        component="div"
                        className="error"
                      />
                      
                      <Field
                        name={`friends.${index}.email`}
                        placeholder="Email"
                        type="email"
                      />
                      <ErrorMessage
                        name={`friends.${index}.email`}
                        component="div"
                        className="error"
                      />
                      
                      <button
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                
                <button
                  type="button"
                  onClick={() => push({ name: '', email: '' })}
                >
                  Add Friend
                </button>
              </div>
            )}
          </FieldArray>
          
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

**FieldArray helpers:**
- `push(value)`: Add item to end
- `pop()`: Remove last item
- `insert(index, value)`: Insert at position
- `remove(index)`: Remove at position
- `replace(index, value)`: Replace item
- `swap(indexA, indexB)`: Swap two items
- `move(from, to)`: Move item

**Validation with Yup:**
```jsx
const FriendsSchema = Yup.object().shape({
  friends: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Name required'),
        email: Yup.string().email('Invalid email').required('Email required'),
      })
    )
    .min(1, 'At least one friend required'),
});
```

**Impact:** **HIGH** - Essential for dynamic forms, eliminates manual array sync bugs

---

### 5.2 Nested Objects

**Impact: MEDIUM (for complex data structures)**

Handle nested object structures with dot notation.

#### Good Example

```jsx
const formik = useFormik({
  initialValues: {
    user: {
      firstName: '',
      lastName: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    },
    preferences: {
      newsletter: false,
      notifications: {
        email: true,
        sms: false,
      },
    },
  },
  onSubmit: values => console.log(values),
});

// Access nested fields with dot notation
<Field name="user.firstName" placeholder="First Name" />
<Field name="user.lastName" placeholder="Last Name" />
<Field name="user.address.street" placeholder="Street" />
<Field name="user.address.city" placeholder="City" />
<Field name="user.address.state" placeholder="State" />
<Field name="user.address.zip" placeholder="ZIP" />

<Field type="checkbox" name="preferences.newsletter" />
<Field type="checkbox" name="preferences.notifications.email" />
<Field type="checkbox" name="preferences.notifications.sms" />

// Errors also use dot notation
<ErrorMessage name="user.address.street" />
```

**Yup validation for nested objects:**
```jsx
const UserSchema = Yup.object().shape({
  user: Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    address: Yup.object().shape({
      street: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip: Yup.string().matches(/^\d{5}$/, 'Invalid ZIP'),
    }),
  }),
});
```

---

### 5.3 Dependent Fields

**Impact: MEDIUM (for conditional logic)**

Update fields based on other field values.

#### Good Example

```jsx
import { useEffect } from 'react';

function DependentFieldsForm() {
  const formik = useFormik({
    initialValues: {
      country: '',
      state: '',
      paymentMethod: '',
      cardNumber: '',
      cryptoAddress: '',
    },
    onSubmit: values => console.log(values),
  });
  
  // Reset dependent fields when parent changes
  useEffect(() => {
    if (formik.values.country) {
      formik.setFieldValue('state', '');
    }
  }, [formik.values.country]);
  
  useEffect(() => {
    // Clear payment fields when method changes
    if (formik.values.paymentMethod === 'card') {
      formik.setFieldValue('cryptoAddress', '');
    } else if (formik.values.paymentMethod === 'crypto') {
      formik.setFieldValue('cardNumber', '');
    }
  }, [formik.values.paymentMethod]);
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Field name="country" as="select">
        <option value="">Select Country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </Field>
      
      {formik.values.country === 'US' && (
        <Field name="state" as="select">
          <option value="">Select State</option>
          <option value="CA">California</option>
          <option value="NY">New York</option>
        </Field>
      )}
      
      <Field name="paymentMethod" as="select">
        <option value="">Select Payment</option>
        <option value="card">Credit Card</option>
        <option value="crypto">Cryptocurrency</option>
      </Field>
      
      {formik.values.paymentMethod === 'card' && (
        <Field name="cardNumber" placeholder="Card Number" />
      )}
      
      {formik.values.paymentMethod === 'crypto' && (
        <Field name="cryptoAddress" placeholder="Wallet Address" />
      )}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Best practices:**
- Use `useEffect` to handle side effects
- Reset dependent fields when parent changes
- Use `setFieldValue` to update programmatically
- Consider `setFieldTouched` to manage validation

---

### 5.4 Conditional Field Visibility

**Impact: MEDIUM (for dynamic forms)**

Show/hide fields based on form state or values.

#### Good Example

```jsx
function ConditionalForm() {
  const formik = useFormik({
    initialValues: {
      userType: 'personal',
      companyName: '',
      taxId: '',
      hasLicense: false,
      licenseNumber: '',
    },
    validationSchema: Yup.object().shape({
      userType: Yup.string().required(),
      // Conditional validation
      companyName: Yup.string().when('userType', {
        is: 'business',
        then: schema => schema.required('Company name required for business accounts'),
        otherwise: schema => schema.notRequired(),
      }),
      licenseNumber: Yup.string().when('hasLicense', {
        is: true,
        then: schema => schema.required('License number required'),
        otherwise: schema => schema.notRequired(),
      }),
    }),
    onSubmit: values => console.log(values),
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Field name="userType" as="select">
        <option value="personal">Personal</option>
        <option value="business">Business</option>
      </Field>
      
      {formik.values.userType === 'business' && (
        <>
          <Field name="companyName" placeholder="Company Name" />
          <ErrorMessage name="companyName" component="div" className="error" />
          
          <Field name="taxId" placeholder="Tax ID" />
          <ErrorMessage name="taxId" component="div" className="error" />
        </>
      )}
      
      <label>
        <Field type="checkbox" name="hasLicense" />
        I have a professional license
      </label>
      
      {formik.values.hasLicense && (
        <>
          <Field name="licenseNumber" placeholder="License Number" />
          <ErrorMessage name="licenseNumber" component="div" className="error" />
        </>
      )}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Critical rules:**
- Always include conditional fields in `initialValues`
- Use Yup `.when()` for conditional validation
- Don't remove fields from DOM, hide them instead (or manage initialValues carefully)

---

## 6. Form Submission

**Impact: HIGH**

Patterns for handling form submission and async operations.

### 6.1 Basic Synchronous Submission

**Impact: HIGH (foundation for all forms)**

Handle form submission with proper state management.

#### Good Example

```jsx
const formik = useFormik({
  initialValues: { email: '', password: '' },
  onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
    // values: validated form data
    console.log('Submitting:', values);
    
    // Simulate processing
    setTimeout(() => {
      console.log('Processed:', values);
      
      // Reset form after success
      resetForm();
      
      // Set success message
      setStatus({ type: 'success', message: 'Submitted successfully!' });
      
      // Re-enable form
      setSubmitting(false);
    }, 1000);
  },
});

// Disable button during submission
<button type="submit" disabled={formik.isSubmitting}>
  {formik.isSubmitting ? 'Submitting...' : 'Submit'}
</button>
```

**FormikBag helpers in onSubmit:**
- `setSubmitting(bool)`: Toggle submission state
- `setErrors(errors)`: Set field errors
- `setFieldError(field, message)`: Set single field error
- `setStatus(status)`: Set form-level status
- `setTouched(touched)`: Set touched fields
- `setFieldTouched(field, bool)`: Set single field touched
- `setValues(values)`: Set all values
- `setFieldValue(field, value)`: Set single field value
- `resetForm()`: Reset to initial state

---

### 6.2 Async API Submission

**Impact: CRITICAL (most common real-world pattern)**

Handle async API calls with proper error handling.

#### Good Example

```jsx
const formik = useFormik({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: LoginSchema,
  onSubmit: async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    try {
      // Make API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        
        if (response.status === 422) {
          // Validation errors from server
          setErrors(errorData.errors);
        } else if (response.status === 401) {
          // Authentication error
          setErrors({ email: 'Invalid credentials' });
        } else {
          // Generic error
          setStatus({ type: 'error', message: errorData.message });
        }
        return;
      }
      
      // Success
      const data = await response.json();
      console.log('Login successful:', data);
      
      // Set success message
      setStatus({ type: 'success', message: 'Login successful!' });
      
      // Optional: reset form
      resetForm();
      
      // Optional: redirect or update app state
      // navigate('/dashboard');
      
    } catch (error) {
      // Network or unexpected errors
      console.error('Login error:', error);
      setStatus({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      // Always re-enable form
      setSubmitting(false);
    }
  },
});

return (
  <form onSubmit={formik.handleSubmit}>
    {/* Form-level status message */}
    {formik.status && (
      <div className={`alert alert-${formik.status.type}`}>
        {formik.status.message}
      </div>
    )}
    
    <Field name="email" type="email" placeholder="Email" />
    <ErrorMessage name="email" component="div" className="error" />
    
    <Field name="password" type="password" placeholder="Password" />
    <ErrorMessage name="password" component="div" className="error" />
    
    <button 
      type="submit" 
      disabled={formik.isSubmitting || !formik.isValid}
    >
      {formik.isSubmitting ? 'Logging in...' : 'Login'}
    </button>
  </form>
);
```

**Critical patterns:**
- Always use try/catch
- Always set `setSubmitting(false)` in finally block
- Handle different HTTP status codes appropriately
- Use `setErrors` for field errors, `setStatus` for form-level messages
- Show loading state in submit button

**Impact:** **CRITICAL** - Proper async handling prevents form bugs, improves UX by 80%

---

### 6.3 Handling Submission State

**Impact: HIGH (better UX)**

Manage submission state for better user feedback.

#### Good Example

```jsx
<button 
  type="submit" 
  disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
  className={formik.isSubmitting ? 'btn-loading' : 'btn-primary'}
>
  {formik.isSubmitting ? (
    <>
      <Spinner size="sm" />
      <span>Submitting...</span>
    </>
  ) : (
    'Submit'
  )}
</button>

{/* Show submission state */}
{formik.isSubmitting && (
  <div className="form-overlay">
    <Spinner />
    <p>Processing your request...</p>
  </div>
)}

{/* Disable entire form during submission */}
<fieldset disabled={formik.isSubmitting}>
  {/* All form fields */}
</fieldset>
```

**Useful submission states:**
- `formik.isSubmitting`: Currently submitting
- `formik.submitCount`: Number of submit attempts
- `formik.isValid`: Form passes validation
- `formik.dirty`: Form has been modified

---

### 6.4 Form Reset After Success

**Impact: MEDIUM (good UX pattern)**

Reset form state after successful submission.

#### Good Example

```jsx
onSubmit: async (values, { resetForm, setStatus, setSubmitting }) => {
  try {
    await api.submit(values);
    
    // Option 1: Reset to initial values
    resetForm();
    
    // Option 2: Reset to new values
    resetForm({
      values: {
        email: '',
        password: '',
        rememberMe: true, // Keep some values
      },
    });
    
    // Option 3: Partial reset
    resetForm({
      values: {
        ...values,
        password: '', // Clear only password
      },
    });
    
    setStatus({ type: 'success', message: 'Form submitted successfully!' });
  } catch (error) {
    setStatus({ type: 'error', message: error.message });
  } finally {
    setSubmitting(false);
  }
}
```

**When to reset:**
- After successful submission
- When switching modes (create → edit)
- On cancel/close action
- When starting new entry

**When NOT to reset:**
- On submission errors (preserve user input)
- During multi-step forms (unless completing all steps)

---

## 7. Performance Optimization

**Impact: MEDIUM**

Patterns for optimizing large or complex forms.

### 7.1 FastField for Large Forms

**Impact: HIGH (for 30+ field forms)**

Use FastField to prevent unnecessary re-renders.

#### Bad Example (Regular Field)

```jsx
// In a form with 50+ fields
<Field name="firstName" />
<Field name="lastName" />
// ... 50 more fields

// Problem: When ANY field changes, ALL fields re-render
// Performance degrades significantly
```

#### Good Example (FastField)

```jsx
import { FastField } from 'formik';

// Only re-renders when its own value, error, or touched changes
<FastField name="firstName" />
<FastField name="lastName" />
<FastField name="email" />
// ... more fields

// Each field is isolated
```

**When to use FastField:**
- ✅ Forms with 30+ fields
- ✅ Independent fields (no cross-field dependencies)
- ✅ Simple validation (no dependencies on other fields)
- ✅ Performance is noticeably degraded

**When NOT to use FastField:**
- ❌ Fields that depend on other field values
- ❌ Conditional fields that show/hide based on other fields
- ❌ Complex validation that references other fields
- ❌ Small forms (< 20 fields)

**Example with dependencies:**
```jsx
// DON'T use FastField for dependent fields
<Field name="country" as="select" />

{/* This field depends on country, use regular Field */}
<Field name="state" as="select">
  {getStatesForCountry(formik.values.country).map(state => (
    <option key={state.code} value={state.code}>{state.name}</option>
  ))}
</Field>
```

**Impact:** **HIGH** - Improves large form performance by 70-90%

---

### 7.2 Memoization Strategies

**Impact: MEDIUM (for computed values)**

Memoize expensive computations in forms.

#### Good Example

```jsx
import { useMemo } from 'react';

function OrderForm() {
  const formik = useFormik({
    initialValues: {
      items: [
        { name: '', quantity: 0, price: 0 },
      ],
      taxRate: 0.08,
      discount: 0,
    },
    onSubmit: values => console.log(values),
  });
  
  // Memoize expensive calculations
  const subtotal = useMemo(() => {
    return formik.values.items.reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);
  }, [formik.values.items]);
  
  const tax = useMemo(() => {
    return subtotal * formik.values.taxRate;
  }, [subtotal, formik.values.taxRate]);
  
  const total = useMemo(() => {
    return subtotal + tax - formik.values.discount;
  }, [subtotal, tax, formik.values.discount]);
  
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Form fields */}
      
      <div className="order-summary">
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        <div>Tax: ${tax.toFixed(2)}</div>
        <div>Discount: ${formik.values.discount.toFixed(2)}</div>
        <div>Total: ${total.toFixed(2)}</div>
      </div>
    </form>
  );
}
```

**Use memoization for:**
- Expensive calculations based on form values
- Filtered or sorted field options
- Complex derived state

---

### 7.3 Debounced Validation

**Impact: MEDIUM (better UX, less overhead)**

Debounce validation to reduce unnecessary checks.

#### Good Example

```jsx
import { debounce } from 'lodash';
import { useCallback } from 'react';

async function validateUsername(value) {
  if (!value) return 'Required';
  
  const response = await fetch(`/api/check-username?username=${value}`);
  const data = await response.json();
  
  if (!data.available) {
    return 'Username already taken';
  }
}

// Debounce the validation
const debouncedValidateUsername = useCallback(
  debounce(validateUsername, 500),
  []
);

<Field 
  name="username" 
  validate={debouncedValidateUsername}
/>
```

**Or configure form-level debounce:**
```jsx
<Formik
  validateOnChange={true}
  validateOnBlur={true}
  // Custom debounce in validate function
  validate={debounce(values => {
    const errors = {};
    // Validation logic
    return errors;
  }, 300)}
>
```

**Impact:** Reduces API calls by 80%, improves perceived performance

---

## 8. Integration Patterns

**Impact: MEDIUM**

Integrating Formik with popular UI libraries and routing.

### 8.1 Material-UI Integration

**Impact: HIGH (for Material-UI projects)**

Seamless integration with Material-UI components.

#### Good Example

```jsx
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

function MaterialUIForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      country: '',
      acceptTerms: false,
    },
    validationSchema: SignupSchema,
    onSubmit: values => console.log(values),
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* TextField */}
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
      />
      
      {/* Password field */}
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
      />
      
      {/* Select */}
      <TextField
        fullWidth
        select
        id="country"
        name="country"
        label="Country"
        value={formik.values.country}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.country && Boolean(formik.errors.country)}
        helperText={formik.touched.country && formik.errors.country}
        margin="normal"
      >
        <MenuItem value="us">United States</MenuItem>
        <MenuItem value="ca">Canada</MenuItem>
        <MenuItem value="mx">Mexico</MenuItem>
      </TextField>
      
      {/* Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            checked={formik.values.acceptTerms}
            onChange={formik.handleChange}
          />
        }
        label="I accept the terms and conditions"
      />
      {formik.touched.acceptTerms && formik.errors.acceptTerms && (
        <div className="error">{formik.errors.acceptTerms}</div>
      )}
      
      {/* Submit button */}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={formik.isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
```

**Or use Field with custom component:**
```jsx
<Field name="email">
  {({ field, meta }) => (
    <TextField
      {...field}
      label="Email"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      fullWidth
      margin="normal"
    />
  )}
</Field>
```

---

### 8.2 React Router Navigation

**Impact: MEDIUM (common use case)**

Navigate after form submission.

#### Good Example

```jsx
import { useNavigate, useLocation } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await api.login(values);
        
        // Navigate to dashboard or redirect URL
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
        
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });
  
  return <form onSubmit={formik.handleSubmit}>...</form>;
}

// Usage with protected route redirect
<Route path="/login" element={<LoginForm />} />
```

**Navigate with state:**
```jsx
navigate('/success', { 
  state: { message: 'Form submitted successfully!' } 
});
```

---

### 8.3 Custom UI Libraries

**Impact: MEDIUM (for any UI library)**

Adapt Formik to work with any custom UI library.

#### Good Example

```jsx
// Reusable wrapper component
function FormikTextField({ name, label, type = 'text', ...props }) {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="form-field">
          <label htmlFor={name}>{label}</label>
          <input
            {...field}
            id={name}
            type={type}
            className={meta.touched && meta.error ? 'input-error' : 'input'}
            {...props}
          />
          {meta.touched && meta.error && (
            <div className="error-text">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

// Usage
<FormikTextField name="email" label="Email" type="email" />
<FormikTextField name="password" label="Password" type="password" />
```

---

## Best Practices Summary

### Critical Do's
1. ✅ **Always use Yup** for validation schemas
2. ✅ **Define all fields** in initialValues
3. ✅ **Check touched before showing errors** (UX)
4. ✅ **Handle isSubmitting** properly in onSubmit
5. ✅ **Use FastField** for forms with 30+ fields
6. ✅ **Always set setSubmitting(false)** in finally block
7. ✅ **Use Field components** instead of manual bindings
8. ✅ **Use getFieldProps** for cleaner input bindings

### Critical Don'ts
1. ❌ **Never mutate formik.values** directly
2. ❌ **Don't show errors immediately** (wait for touched)
3. ❌ **Don't forget to disable submit button** during submission
4. ❌ **Don't use FastField** for dependent fields
5. ❌ **Don't forget initialValues** for conditional fields
6. ❌ **Don't mix FastField and Field** for dependent fields
7. ❌ **Don't skip error handling** in async onSubmit
8. ❌ **Don't forget setSubmitting(false)** in catch/finally

---

## Common Pitfalls

### 1. Not Checking Touched Before Showing Errors
```jsx
// ❌ Bad: Shows all errors immediately
{formik.errors.email && <div>{formik.errors.email}</div>}

// ✅ Good: Shows errors after field interaction
{formik.touched.email && formik.errors.email && (
  <div>{formik.errors.email}</div>
)}
```

### 2. Forgetting to Set isSubmitting to False
```jsx
// ❌ Bad: Form stays disabled
onSubmit: async (values) => {
  await api.submit(values);
  // Forgot to setSubmitting(false)
}

// ✅ Good: Always use finally
onSubmit: async (values, { setSubmitting }) => {
  try {
    await api.submit(values);
  } finally {
    setSubmitting(false);
  }
}
```

### 3. Missing Fields in initialValues
```jsx
// ❌ Bad: Conditional field not in initialValues
initialValues: {
  userType: 'personal',
  // Missing: companyName
}

// Later: <Field name="companyName" /> causes warnings

// ✅ Good: All fields defined
initialValues: {
  userType: 'personal',
  companyName: '', // Defined even if initially hidden
}
```

### 4. Using FastField Incorrectly
```jsx
// ❌ Bad: Dependent field using FastField
<FastField name="country" as="select" />
<FastField name="state" as="select">
  {/* Won't re-render when country changes */}
  {getStates(formik.values.country).map(...)}
</FastField>

// ✅ Good: Use regular Field for dependent fields
<Field name="country" as="select" />
<Field name="state" as="select">
  {getStates(formik.values.country).map(...)}
</Field>
```

### 5. Mutating Values Directly
```jsx
// ❌ Bad: Direct mutation
formik.values.email = 'new@email.com';

// ✅ Good: Use setFieldValue
formik.setFieldValue('email', 'new@email.com');
```

---

## Debugging Tips

### View Form State
```jsx
<pre>{JSON.stringify(formik, null, 2)}</pre>

// Or specific properties
<pre>
  Values: {JSON.stringify(formik.values, null, 2)}
  Errors: {JSON.stringify(formik.errors, null, 2)}
  Touched: {JSON.stringify(formik.touched, null, 2)}
</pre>
```

### Enable Validation Debugging
```jsx
<Formik
  enableReinitialize  // Reset when initialValues change
  validateOnChange    // Validate on every change (default: true)
  validateOnBlur      // Validate on blur (default: true)
  validateOnMount     // Validate on mount (default: false)
>
```

### Check Validation Schema
```jsx
// Test Yup schema independently
const schema = Yup.object().shape({...});

schema.validate({ email: 'test@test.com' }, { abortEarly: false })
  .then(valid => console.log('Valid:', valid))
  .catch(errors => console.log('Errors:', errors));
```

---

## Quick Reference

### Installation
```bash
npm install formik yup
```

### Basic Form
```jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';

const formik = useFormik({
  initialValues: { email: '', password: '' },
  validationSchema: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  }),
  onSubmit: async (values, { setSubmitting }) => {
    await api.submit(values);
    setSubmitting(false);
  },
});
```

### Essential Imports
```jsx
import { 
  useFormik,           // Hook for form management
  Formik,              // Component for render props
  Form,                // Auto-handled form element
  Field,               // Auto-bound input
  FastField,           // Performance-optimized field
  ErrorMessage,        // Auto-display errors
  FieldArray,          // Dynamic arrays
} from 'formik';

import * as Yup from 'yup';  // Validation schemas
```

---

## Additional Resources

- **Examples**: See [references/EXAMPLES.md](references/EXAMPLES.md) for complete form templates
- **Yup Validation**: See [references/YUP_VALIDATION.md](references/YUP_VALIDATION.md) for all Yup patterns
- **Template**: See [assets/form-template.jsx](assets/form-template.jsx) for starter template
- **Utils**: See [scripts/formik-utils.js](scripts/formik-utils.js) for helper functions

---

## Version Notes

**v1.0.0** - Initial release
- Comprehensive patterns for Formik 2.x
- Yup validation integration
- Advanced patterns (FieldArray, nested objects, dependent fields)
- Performance optimization strategies
- Material-UI and React Router integration
- Best practices and common pitfalls

---

*Last updated: February 2026*
