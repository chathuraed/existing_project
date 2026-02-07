# Complete Formik Examples

This document provides complete, production-ready form examples using Formik.

## Example 1: User Registration Form

A complete registration form with validation, async submission, and error handling.

```jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  age: Yup.number()
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please enter a valid age')
    .required('Age is required'),
  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

function RegistrationForm() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: '',
          acceptTerms: false
        }}
        validationSchema={RegistrationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
          try {
            const response = await fetch('/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
              if (data.errors) {
                setErrors(data.errors);
              } else {
                setStatus({ error: data.message || 'Registration failed' });
              }
            } else {
              setStatus({ success: 'Account created successfully!' });
              resetForm();
              // Redirect or show success message
            }
          } catch (error) {
            setStatus({ error: 'Network error. Please try again.' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status, errors, touched }) => (
          <Form className="space-y-4">
            {status?.success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {status.success}
              </div>
            )}
            
            {status?.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {status.error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <Field
                type="text"
                name="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-1">
                Age
              </label>
              <Field
                type="number"
                name="age"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="age" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            
            <div className="flex items-start">
              <Field
                type="checkbox"
                name="acceptTerms"
                className="mt-1 mr-2"
              />
              <label htmlFor="acceptTerms" className="text-sm">
                I accept the terms and conditions
              </label>
            </div>
            <ErrorMessage name="acceptTerms" component="div" className="text-red-600 text-sm" />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
```

## Example 2: Multi-Step Form (Wizard)

A multi-step form with progress indicator and navigation.

```jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Step1Schema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
});

const Step2Schema = Yup.object({
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zipCode: Yup.string().matches(/^\d{5}$/, 'Must be 5 digits').required('Required')
});

const Step3Schema = Yup.object({
  cardNumber: Yup.string().matches(/^\d{16}$/, 'Must be 16 digits').required('Required'),
  expiryDate: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY').required('Required'),
  cvv: Yup.string().matches(/^\d{3,4}$/, 'Must be 3-4 digits').required('Required')
});

const validationSchemas = [Step1Schema, Step2Schema, Step3Schema];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const isLastStep = step === 2;
  
  const initialValues = {
    // Step 1
    firstName: '',
    lastName: '',
    email: '',
    // Step 2
    address: '',
    city: '',
    zipCode: '',
    // Step 3
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['Personal Info', 'Address', 'Payment'].map((label, index) => (
            <div
              key={index}
              className={`flex-1 text-center ${
                index === step ? 'font-bold text-blue-600' : 'text-gray-500'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded ${
                index <= step ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={async (values, { setSubmitting }) => {
          if (isLastStep) {
            // Final submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form submitted:', values);
            alert('Order completed!');
          } else {
            setStep(step + 1);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Field name="firstName" className="w-full px-3 py-2 border rounded" />
                  <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <Field name="lastName" className="w-full px-3 py-2 border rounded" />
                  <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Field name="email" type="email" className="w-full px-3 py-2 border rounded" />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>
              </div>
            )}
            
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Field name="address" className="w-full px-3 py-2 border rounded" />
                  <ErrorMessage name="address" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Field name="city" className="w-full px-3 py-2 border rounded" />
                  <ErrorMessage name="city" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <Field name="zipCode" className="w-full px-3 py-2 border rounded" />
                  <ErrorMessage name="zipCode" component="div" className="text-red-600 text-sm mt-1" />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <Field name="cardNumber" className="w-full px-3 py-2 border rounded" />
                  <ErrorMessage name="cardNumber" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Field name="expiryDate" placeholder="MM/YY" className="w-full px-3 py-2 border rounded" />
                    <ErrorMessage name="expiryDate" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <Field name="cvv" className="w-full px-3 py-2 border rounded" />
                    <ErrorMessage name="cvv" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Back
                </button>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Processing...' : isLastStep ? 'Complete Order' : 'Next'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MultiStepForm;
```

## Example 3: Dynamic Form with FieldArray

A contact form with dynamic field addition/removal.

```jsx
import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object({
  companyName: Yup.string().required('Company name is required'),
  contacts: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits')
      })
    )
    .min(1, 'At least one contact is required')
});

function DynamicContactForm() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Company Contacts</h1>
      
      <Formik
        initialValues={{
          companyName: '',
          contacts: [{ name: '', email: '', phone: '' }]
        }}
        validationSchema={ContactSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            alert('Form submitted!');
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <Field
                name="companyName"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="companyName" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            
            <FieldArray name="contacts">
              {({ push, remove }) => (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Contacts</h2>
                    <button
                      type="button"
                      onClick={() => push({ name: '', email: '', phone: '' })}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      + Add Contact
                    </button>
                  </div>
                  
                  {values.contacts.map((contact, index) => (
                    <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Contact {index + 1}</h3>
                        {values.contacts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <Field
                            name={`contacts.${index}.name`}
                            className="w-full px-3 py-2 border rounded"
                          />
                          <ErrorMessage
                            name={`contacts.${index}.name`}
                            component="div"
                            className="text-red-600 text-sm mt-1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <Field
                            name={`contacts.${index}.email`}
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                          />
                          <ErrorMessage
                            name={`contacts.${index}.email`}
                            component="div"
                            className="text-red-600 text-sm mt-1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone</label>
                          <Field
                            name={`contacts.${index}.phone`}
                            className="w-full px-3 py-2 border rounded"
                          />
                          <ErrorMessage
                            name={`contacts.${index}.phone`}
                            component="div"
                            className="text-red-600 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DynamicContactForm;
```

## Example 4: Form with useFormik Hook

A simpler approach using the useFormik hook directly.

```jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  rememberMe: Yup.boolean()
});

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
        
        if (response.ok) {
          setStatus({ success: 'Login successful!' });
        } else {
          setStatus({ error: 'Invalid credentials' });
        }
      } catch (error) {
        setStatus({ error: 'Network error occurred' });
      } finally {
        setSubmitting(false);
      }
    }
  });
  
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {formik.status?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {formik.status.success}
          </div>
        )}
        
        {formik.status?.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {formik.status.error}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...formik.getFieldProps('rememberMe')}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm">
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
```

## Example 5: Search/Filter Form (No Submit Button)

A form that updates on every change without a submit button.

```jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

function ProductSearchForm() {
  const [results, setResults] = useState([]);
  
  const formik = useFormik({
    initialValues: {
      searchTerm: '',
      category: 'all',
      minPrice: '',
      maxPrice: '',
      inStock: false
    },
    onSubmit: () => {}, // Not used, but required
  });
  
  // Fetch results whenever form values change
  useEffect(() => {
    const fetchResults = async () => {
      const queryParams = new URLSearchParams(formik.values).toString();
      const response = await fetch(`/api/products?${queryParams}`);
      const data = await response.json();
      setResults(data);
    };
    
    // Debounce the search
    const timeoutId = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [formik.values]);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Search</h1>
      
      <form className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Search products..."
            {...formik.getFieldProps('searchTerm')}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            {...formik.getFieldProps('category')}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
          
          <input
            type="number"
            placeholder="Min Price"
            {...formik.getFieldProps('minPrice')}
            className="px-3 py-2 border rounded"
          />
          
          <input
            type="number"
            placeholder="Max Price"
            {...formik.getFieldProps('maxPrice')}
            className="px-3 py-2 border rounded"
          />
        </div>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            {...formik.getFieldProps('inStock')}
            className="mr-2"
          />
          In Stock Only
        </label>
      </form>
      
      <div>
        <p className="text-gray-600 mb-4">{results.length} results found</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSearchForm;
```
