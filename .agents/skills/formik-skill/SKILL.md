---
name: formik
description: Build React forms with Formik library including validation, field management, form state, error handling, and async submissions. Use when creating forms, handling form validation with Yup, managing field state, or implementing complex form patterns in React applications.
license: MIT
tags: [react, forms, formik, validation, yup, typescript]
metadata:
  author: formik-skill
  version: "1.0"
  formik-version: "2.x"
---

# Formik Skill

A comprehensive guide for building forms in React using Formik, the most popular open-source form library.

## When to use this skill

Use this skill when you need to:
- Create forms in React applications
- Handle form validation (with or without Yup)
- Manage form state, field values, and errors
- Implement complex form patterns (arrays, nested objects, dynamic fields)
- Handle async form submissions
- Build custom form components with Formik hooks
- Optimize form performance with FastField

## Core Concepts

### The Formik Component

Formik manages form state and provides helper methods through render props or child functions:

```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';

<Formik
  initialValues={{ email: '', password: '' }}
  validate={values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    return errors;
  }}
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }}
>
  {({ isSubmitting }) => (
    <Form>
      <Field type="email" name="email" />
      <ErrorMessage name="email" component="div" />
      <Field type="password" name="password" />
      <ErrorMessage name="password" component="div" />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  )}
</Formik>
```

### Using Formik Hooks (Recommended)

The modern approach uses hooks for cleaner code:

```jsx
import { useFormik } from 'formik';

function MyForm() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Validation

### Schema Validation with Yup

Formik integrates seamlessly with Yup for schema-based validation:

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
    .positive()
    .integer()
    .required('Required'),
});

<Formik
  initialValues={{
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  }}
  validationSchema={SignupSchema}
  onSubmit={values => {
    console.log(values);
  }}
>
  {/* ... */}
</Formik>
```

### Custom Validation Function

For more control, write custom validation:

```jsx
const validate = values => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return errors;
};
```

### Field-Level Validation

Validate individual fields:

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

<Field name="email" validate={validateEmail} />
```

## Field Components

### Basic Field Usage

The `Field` component handles common input types:

```jsx
<Field name="email" type="email" placeholder="Email" />
<Field name="description" as="textarea" rows="5" />
<Field name="color" as="select">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</Field>
```

### Radio Buttons

```jsx
<div role="group">
  <label>
    <Field type="radio" name="contactMethod" value="email" />
    Email
  </label>
  <label>
    <Field type="radio" name="contactMethod" value="phone" />
    Phone
  </label>
</div>
```

### Checkboxes

```jsx
<label>
  <Field type="checkbox" name="acceptTerms" />
  I accept the terms and conditions
</label>

{/* Checkbox group */}
<div role="group">
  <label>
    <Field type="checkbox" name="hobbies" value="reading" />
    Reading
  </label>
  <label>
    <Field type="checkbox" name="hobbies" value="coding" />
    Coding
  </label>
</div>
```

### Custom Field Components

```jsx
const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

<Field name="email" component={MyInput} />
```

## Displaying Errors

### Using ErrorMessage Component

```jsx
<ErrorMessage name="email" />

{/* Custom error component */}
<ErrorMessage name="email" component="div" className="error" />

{/* Render prop for custom styling */}
<ErrorMessage name="email">
  {msg => <div className="error-message">{msg}</div>}
</ErrorMessage>
```

### Manual Error Display

```jsx
{formik.touched.email && formik.errors.email ? (
  <div className="error">{formik.errors.email}</div>
) : null}
```

## Advanced Patterns

### FieldArray for Dynamic Lists

Handle arrays of fields:

```jsx
import { FieldArray } from 'formik';

<Formik
  initialValues={{ friends: [''] }}
  onSubmit={values => console.log(values)}
>
  {({ values }) => (
    <Form>
      <FieldArray name="friends">
        {({ insert, remove, push }) => (
          <div>
            {values.friends.length > 0 &&
              values.friends.map((friend, index) => (
                <div key={index}>
                  <Field name={`friends.${index}`} />
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
              ))}
            <button type="button" onClick={() => push('')}>
              Add Friend
            </button>
          </div>
        )}
      </FieldArray>
      <button type="submit">Submit</button>
    </Form>
  )}
</Formik>
```

### Nested Objects

Handle nested form data:

```jsx
initialValues={{
  user: {
    name: '',
    address: {
      street: '',
      city: '',
      zip: ''
    }
  }
}}

<Field name="user.name" />
<Field name="user.address.street" />
<Field name="user.address.city" />
<Field name="user.address.zip" />
```

### Dependent Fields

Update fields based on other field values:

```jsx
const formik = useFormik({
  initialValues: {
    country: '',
    state: ''
  },
  onSubmit: values => console.log(values)
});

useEffect(() => {
  // Reset state when country changes
  if (formik.values.country) {
    formik.setFieldValue('state', '');
  }
}, [formik.values.country]);
```

## Form Submission

### Basic Submission

```jsx
onSubmit={(values, { setSubmitting, setErrors, setStatus, resetForm }) => {
  // values: form data
  // setSubmitting: toggle submission state
  // setErrors: set field errors
  // setStatus: set form-level status
  // resetForm: reset form to initial state
  
  setTimeout(() => {
    console.log(values);
    setSubmitting(false);
  }, 400);
}
```

### Async Submission with API

```jsx
onSubmit={async (values, { setSubmitting, setErrors }) => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    
    if (!response.ok) {
      const errors = await response.json();
      setErrors(errors);
    } else {
      // Handle success
      alert('Form submitted successfully!');
    }
  } catch (error) {
    setErrors({ submit: 'Network error occurred' });
  } finally {
    setSubmitting(false);
  }
}
```

### Server-Side Validation Errors

```jsx
onSubmit={async (values, { setFieldError, setSubmitting }) => {
  try {
    await api.submit(values);
  } catch (error) {
    if (error.response?.data?.errors) {
      // Set individual field errors from server
      Object.entries(error.response.data.errors).forEach(([field, message]) => {
        setFieldError(field, message);
      });
    }
  } finally {
    setSubmitting(false);
  }
}
```

## Performance Optimization

### FastField

For large forms, use FastField to prevent unnecessary re-renders:

```jsx
import { FastField } from 'formik';

// Only re-renders when its own value, error, or touched status changes
<FastField name="firstName" />
```

### When to use FastField

- Forms with 30+ fields
- Fields that don't depend on other field values
- Fields without complex validation logic

**Don't use FastField when:**
- Fields need to react to changes in other fields
- You're using field-level validation that depends on other values

## Common Form Helpers

### getFieldProps

Simplify field bindings:

```jsx
<input
  type="text"
  {...formik.getFieldProps('firstName')}
  // Equivalent to:
  // name="firstName"
  // value={formik.values.firstName}
  // onChange={formik.handleChange}
  // onBlur={formik.handleBlur}
/>
```

### setFieldValue

Programmatically set field values:

```jsx
formik.setFieldValue('email', 'user@example.com');
formik.setFieldValue('user.address.city', 'New York');
```

### resetForm

Reset form to initial or specific values:

```jsx
// Reset to initial values
formik.resetForm();

// Reset to new values
formik.resetForm({
  values: { email: '', password: '' }
});
```

## Form-Level Helpers

### Form State Properties

```jsx
formik.values        // Current form values
formik.errors        // Validation errors
formik.touched       // Which fields have been visited
formik.isSubmitting  // Submission in progress
formik.isValid       // Form passes validation
formik.dirty         // Form has been modified
formik.isValidating  // Validation in progress
```

### Form Methods

```jsx
formik.handleSubmit()    // Submit handler
formik.handleReset()     // Reset handler
formik.validateForm()    // Trigger validation
formik.setFieldTouched() // Mark field as touched
formik.setErrors()       // Set multiple errors
formik.setValues()       // Set multiple values
```

## Integration Examples

### With Material-UI

```jsx
import TextField from '@mui/material/TextField';

<Field name="email">
  {({ field, meta }) => (
    <TextField
      {...field}
      label="Email"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  )}
</Field>
```

### With React Router

Navigate after successful submission:

```jsx
import { useNavigate } from 'react-router-dom';

function MyForm() {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: { /* ... */ },
    onSubmit: async (values) => {
      await api.submit(values);
      navigate('/success');
    }
  });
  
  return <form onSubmit={formik.handleSubmit}>...</form>;
}
```

## Best Practices

1. **Always use validationSchema with Yup** for complex validation instead of custom validate functions
2. **Use Field components** instead of manual input bindings for automatic state management
3. **Handle isSubmitting** to disable submit buttons and prevent double submissions
4. **Show errors only after touch** using `touched` to avoid showing errors prematurely
5. **Use getFieldProps** for cleaner code when binding inputs
6. **Consider FastField** for performance in large forms
7. **Reset forms after success** using `resetForm()` when appropriate
8. **Use setStatus** for form-level messages (success, error) that aren't field-specific

## Common Pitfalls

1. **Not checking `touched` before showing errors** - shows all errors immediately
2. **Forgetting to set `isSubmitting` to false** - leaves form in submitting state
3. **Using FastField incorrectly** - breaks dependent field logic
4. **Not handling async validation errors** - API errors get lost
5. **Mutating form values directly** - always use `setFieldValue` or `setValues`
6. **Missing name attribute** on Field components - breaks field binding

## Debugging Tips

Check form state in DevTools:

```jsx
<pre>{JSON.stringify(formik, null, 2)}</pre>
```

Enable Formik debug mode:

```jsx
<Formik
  enableReinitialize  // Reset when initialValues change
  validateOnChange    // Validate on every keystroke (default: true)
  validateOnBlur      // Validate on blur (default: true)
  validateOnMount     // Validate on mount (default: false)
>
```

## Additional Resources

- See [references/EXAMPLES.md](references/EXAMPLES.md) for complete form examples
- See [references/YUP_VALIDATION.md](references/YUP_VALIDATION.md) for comprehensive Yup validation patterns
- See [assets/form-template.jsx](assets/form-template.jsx) for a starter template

## Quick Reference

**Installation:**
```bash
npm install formik yup
```

**Basic Form:**
```jsx
import { useFormik } from 'formik';

const formik = useFormik({
  initialValues: { email: '' },
  onSubmit: values => console.log(values)
});
```

**With Validation:**
```jsx
import * as Yup from 'yup';

validationSchema: Yup.object({
  email: Yup.string().email().required()
})
```
