# Yup Validation Patterns

Comprehensive guide to validation schemas using Yup with Formik.

## Installation

```bash
npm install yup
```

## Basic Usage

```jsx
import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required')
});
```

## String Validation

### Basic String Validations

```jsx
Yup.string()
  .required('This field is required')
  .min(3, 'Must be at least 3 characters')
  .max(50, 'Must be at most 50 characters')
  .length(10, 'Must be exactly 10 characters')
  .matches(/^[a-zA-Z]+$/, 'Only letters allowed')
  .email('Must be a valid email')
  .url('Must be a valid URL')
  .lowercase('Must be lowercase')
  .uppercase('Must be uppercase')
  .trim('No leading or trailing whitespace')
```

### Email Validation

```jsx
// Basic email
email: Yup.string()
  .email('Invalid email address')
  .required('Email is required')

// Email with custom domain
email: Yup.string()
  .email('Invalid email address')
  .matches(/@company\.com$/, 'Must be a company email')
  .required('Email is required')
```

### URL Validation

```jsx
website: Yup.string()
  .url('Must be a valid URL')
  .required('Website is required')

// URL with specific protocol
secureUrl: Yup.string()
  .url('Must be a valid URL')
  .matches(/^https:\/\//, 'Must use HTTPS')
```

### Phone Number Validation

```jsx
// US phone number (10 digits)
phone: Yup.string()
  .matches(/^\d{10}$/, 'Phone number must be 10 digits')
  .required('Phone is required')

// International format
phone: Yup.string()
  .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
  .required('Phone is required')

// With formatting
phone: Yup.string()
  .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Format: (123) 456-7890')
  .required('Phone is required')
```

### Password Validation

```jsx
// Strong password
password: Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Must contain at least one number')
  .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
  .required('Password is required')

// Password confirmation
confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Please confirm your password')
```

### Username Validation

```jsx
username: Yup.string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be less than 20 characters')
  .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed')
  .required('Username is required')
```

### Credit Card Validation

```jsx
cardNumber: Yup.string()
  .matches(/^\d{16}$/, 'Card number must be 16 digits')
  .required('Card number is required')

expiryDate: Yup.string()
  .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY')
  .required('Expiry date is required')

cvv: Yup.string()
  .matches(/^\d{3,4}$/, 'CVV must be 3-4 digits')
  .required('CVV is required')
```

## Number Validation

### Basic Number Validations

```jsx
Yup.number()
  .required('This field is required')
  .min(0, 'Must be at least 0')
  .max(100, 'Must be at most 100')
  .lessThan(100, 'Must be less than 100')
  .moreThan(0, 'Must be greater than 0')
  .positive('Must be a positive number')
  .negative('Must be a negative number')
  .integer('Must be an integer')
  .truncate() // Round to nearest integer
```

### Age Validation

```jsx
age: Yup.number()
  .typeError('Age must be a number')
  .min(18, 'Must be at least 18 years old')
  .max(120, 'Please enter a valid age')
  .integer('Age must be a whole number')
  .required('Age is required')
```

### Price/Currency Validation

```jsx
price: Yup.number()
  .typeError('Price must be a number')
  .positive('Price must be positive')
  .test('is-decimal', 'Price must have at most 2 decimal places', (value) => {
    if (value) {
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }
    return true;
  })
  .required('Price is required')
```

### Percentage Validation

```jsx
percentage: Yup.number()
  .min(0, 'Percentage must be at least 0')
  .max(100, 'Percentage cannot exceed 100')
  .required('Percentage is required')
```

## Date Validation

### Basic Date Validations

```jsx
Yup.date()
  .required('Date is required')
  .min(new Date(), 'Date must be in the future')
  .max(new Date('2030-12-31'), 'Date must be before 2031')
```

### Birthday Validation

```jsx
birthdate: Yup.date()
  .max(new Date(), 'Birthdate cannot be in the future')
  .min(new Date('1900-01-01'), 'Please enter a valid birthdate')
  .test('age', 'Must be at least 18 years old', function(value) {
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 18);
    return value <= cutoff;
  })
  .required('Birthdate is required')
```

### Date Range Validation

```jsx
startDate: Yup.date()
  .required('Start date is required'),

endDate: Yup.date()
  .min(Yup.ref('startDate'), 'End date must be after start date')
  .required('End date is required')
```

## Boolean Validation

```jsx
acceptTerms: Yup.boolean()
  .oneOf([true], 'You must accept the terms and conditions')
  .required('You must accept the terms and conditions')

newsletter: Yup.boolean()
  .default(false)
```

## Array Validation

### Basic Array Validations

```jsx
Yup.array()
  .required('At least one item is required')
  .min(1, 'Must have at least 1 item')
  .max(5, 'Cannot have more than 5 items')
  .of(Yup.string()) // Array of strings
```

### Array of Objects

```jsx
contacts: Yup.array()
  .of(
    Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required')
    })
  )
  .min(1, 'At least one contact is required')
```

### Select Multiple

```jsx
interests: Yup.array()
  .of(Yup.string())
  .min(1, 'Select at least one interest')
  .required('Please select your interests')
```

### File Upload Validation

```jsx
files: Yup.array()
  .of(
    Yup.mixed()
      .test('fileSize', 'File too large', (value) => {
        return value && value.size <= 5000000; // 5MB
      })
      .test('fileType', 'Unsupported file type', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      })
  )
  .min(1, 'At least one file is required')
  .max(3, 'Maximum 3 files allowed')
```

## Object Validation

### Nested Objects

```jsx
user: Yup.object({
  name: Yup.string().required('Name is required'),
  address: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string()
      .matches(/^\d{5}$/, 'Must be 5 digits')
      .required('ZIP code is required')
  })
})
```

## Conditional Validation

### When (Dependent Fields)

```jsx
const schema = Yup.object({
  hasAddress: Yup.boolean(),
  address: Yup.string().when('hasAddress', {
    is: true,
    then: schema => schema.required('Address is required'),
    otherwise: schema => schema
  })
});

// Multiple conditions
shippingAddress: Yup.string().when(['needsShipping', 'country'], {
  is: (needsShipping, country) => needsShipping && country === 'US',
  then: schema => schema.required('Shipping address required for US orders'),
  otherwise: schema => schema
})
```

### Test (Custom Validation)

```jsx
age: Yup.number()
  .test('is-old-enough', 'Must be 18 or older', function(value) {
    return value >= 18;
  })

// With access to other fields
confirmPassword: Yup.string()
  .test('passwords-match', 'Passwords must match', function(value) {
    return this.parent.password === value;
  })

// Async validation
username: Yup.string()
  .test('unique-username', 'Username already taken', async (value) => {
    if (!value) return true;
    const response = await fetch(`/api/check-username?username=${value}`);
    const { available } = await response.json();
    return available;
  })
```

## Advanced Patterns

### oneOf (Whitelist)

```jsx
gender: Yup.string()
  .oneOf(['male', 'female', 'other'], 'Invalid gender')
  .required('Gender is required')

// Reference another field
confirmEmail: Yup.string()
  .oneOf([Yup.ref('email'), null], 'Emails must match')
  .required('Please confirm your email')
```

### notOneOf (Blacklist)

```jsx
username: Yup.string()
  .notOneOf(['admin', 'root', 'system'], 'Username not allowed')
  .required('Username is required')
```

### Nullable and Optional

```jsx
// Field can be null or undefined
middleName: Yup.string().nullable()

// Field is not required
nickname: Yup.string().optional()

// Combine both
suffix: Yup.string().nullable().optional()
```

### Default Values

```jsx
country: Yup.string()
  .default('US')

subscribed: Yup.boolean()
  .default(false)
```

### Transforms

```jsx
// Trim whitespace
name: Yup.string()
  .transform(value => value?.trim())
  .required('Name is required')

// Convert to lowercase
email: Yup.string()
  .transform(value => value?.toLowerCase())
  .email('Invalid email')

// Parse number from string
age: Yup.number()
  .transform((value, originalValue) => {
    return originalValue === '' ? undefined : value;
  })
```

## Complete Examples

### User Registration Schema

```jsx
const RegistrationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores')
    .required('Username is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain lowercase letter')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
    .matches(/[0-9]/, 'Must contain number')
    .required('Password is required'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm password'),
  
  age: Yup.number()
    .min(18, 'Must be at least 18')
    .max(120, 'Please enter valid age')
    .required('Age is required'),
  
  acceptTerms: Yup.boolean()
    .oneOf([true], 'Must accept terms')
});
```

### E-commerce Order Schema

```jsx
const OrderSchema = Yup.object({
  items: Yup.array()
    .of(
      Yup.object({
        productId: Yup.string().required(),
        quantity: Yup.number()
          .min(1, 'Quantity must be at least 1')
          .integer()
          .required()
      })
    )
    .min(1, 'Cart cannot be empty'),
  
  shippingAddress: Yup.object({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code')
      .required('ZIP code is required')
  }),
  
  billingAddress: Yup.object().when('sameAsShipping', {
    is: false,
    then: schema => schema.shape({
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipCode: Yup.string()
        .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code')
        .required('ZIP code is required')
    })
  }),
  
  paymentMethod: Yup.string()
    .oneOf(['credit', 'debit', 'paypal'], 'Invalid payment method')
    .required('Payment method is required'),
  
  cardNumber: Yup.string().when('paymentMethod', {
    is: (val) => val === 'credit' || val === 'debit',
    then: schema => schema
      .matches(/^\d{16}$/, 'Invalid card number')
      .required('Card number is required')
  })
});
```

### Contact Form Schema

```jsx
const ContactSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must be 10 digits')
    .nullable(),
  
  subject: Yup.string()
    .max(100, 'Subject must be less than 100 characters')
    .required('Subject is required'),
  
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .required('Message is required'),
  
  preferredContact: Yup.string()
    .oneOf(['email', 'phone'], 'Invalid contact method')
    .default('email')
});
```

## Tips and Best Practices

1. **Use typeError** for better error messages on type validation
2. **Chain validations** from least to most specific
3. **Use transforms** to clean data before validation
4. **Test async validations** thoroughly to avoid performance issues
5. **Provide helpful error messages** that guide users
6. **Use when()** for complex conditional validation
7. **Validate on the frontend and backend** - never trust client-side validation alone
8. **Consider debouncing** async validations to reduce API calls
