import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define your validation schema
const FormSchema = Yup.object({
  // Add your validation rules here
  // Example:
  // email: Yup.string().email('Invalid email').required('Required'),
  // password: Yup.string().min(6, 'Too short').required('Required'),
});

/**
 * Formik Form Template
 * 
 * This is a starter template for creating forms with Formik.
 * Customize the fields, validation, and submission logic as needed.
 */
function FormTemplate() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Form Title</h1>
      
      <Formik
        // Initial form values
        initialValues={{
          // Define your form fields here
          // Example:
          // email: '',
          // password: '',
        }}
        
        // Validation schema
        validationSchema={FormSchema}
        
        // Submit handler
        onSubmit={async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
          try {
            // Your submission logic here
            console.log('Form values:', values);
            
            // Example API call:
            // const response = await fetch('/api/endpoint', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(values)
            // });
            
            // if (!response.ok) {
            //   throw new Error('Submission failed');
            // }
            
            // Success handling
            setStatus({ success: 'Form submitted successfully!' });
            resetForm();
            
          } catch (error) {
            // Error handling
            setStatus({ error: error.message || 'An error occurred' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            {/* Success message */}
            {status?.success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {status.success}
              </div>
            )}
            
            {/* Error message */}
            {status?.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {status.error}
              </div>
            )}
            
            {/* 
              Add your form fields here
              
              Text Input Example:
            */}
            <div>
              <label htmlFor="fieldName" className="block text-sm font-medium mb-1">
                Field Label
              </label>
              <Field
                type="text"
                name="fieldName"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="fieldName"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            
            {/*
              Select Example:
            */}
            <div>
              <label htmlFor="selectField" className="block text-sm font-medium mb-1">
                Select Label
              </label>
              <Field
                as="select"
                name="selectField"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </Field>
              <ErrorMessage
                name="selectField"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            
            {/*
              Textarea Example:
            */}
            <div>
              <label htmlFor="textareaField" className="block text-sm font-medium mb-1">
                Textarea Label
              </label>
              <Field
                as="textarea"
                name="textareaField"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="textareaField"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            
            {/*
              Checkbox Example:
            */}
            <div className="flex items-start">
              <Field
                type="checkbox"
                name="checkboxField"
                className="mt-1 mr-2"
              />
              <label htmlFor="checkboxField" className="text-sm">
                Checkbox label text
              </label>
            </div>
            <ErrorMessage
              name="checkboxField"
              component="div"
              className="text-red-600 text-sm"
            />
            
            {/*
              Radio Buttons Example:
            */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Radio Group Label
              </label>
              <div role="group" className="space-y-2">
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="radioField"
                    value="option1"
                    className="mr-2"
                  />
                  Option 1
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="radioField"
                    value="option2"
                    className="mr-2"
                  />
                  Option 2
                </label>
              </div>
              <ErrorMessage
                name="radioField"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormTemplate;

// Alternative: Using useFormik Hook
// 
// import { useFormik } from 'formik';
// 
// function FormTemplateWithHook() {
//   const formik = useFormik({
//     initialValues: {
//       // your fields
//     },
//     validationSchema: FormSchema,
//     onSubmit: async (values) => {
//       console.log(values);
//     }
//   });
//   
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <input
//         type="text"
//         {...formik.getFieldProps('fieldName')}
//       />
//       {formik.touched.fieldName && formik.errors.fieldName && (
//         <div>{formik.errors.fieldName}</div>
//       )}
//       
//       <button type="submit" disabled={formik.isSubmitting}>
//         Submit
//       </button>
//     </form>
//   );
// }
