#!/usr/bin/env node

/**
 * Formik Utility Functions
 * 
 * Common helper functions for working with Formik forms.
 * These can be imported and used across multiple forms.
 */

/**
 * Debounce utility for async validation
 * Useful for preventing too many API calls during validation
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format error messages for display
 * Converts validation errors into user-friendly messages
 * 
 * @param {Object} errors - Formik errors object
 * @returns {Array} Array of error messages
 */
export function formatErrors(errors) {
  const messages = [];
  
  const extractErrors = (obj, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        messages.push({ field: fieldName, message: value });
      } else if (typeof value === 'object' && value !== null) {
        extractErrors(value, fieldName);
      }
    });
  };
  
  extractErrors(errors);
  return messages;
}

/**
 * Check if form has any errors
 * 
 * @param {Object} errors - Formik errors object
 * @returns {boolean} True if there are errors
 */
export function hasErrors(errors) {
  if (!errors || typeof errors !== 'object') return false;
  
  return Object.keys(errors).some(key => {
    const value = errors[key];
    if (typeof value === 'string') return true;
    if (typeof value === 'object' && value !== null) {
      return hasErrors(value);
    }
    return false;
  });
}

/**
 * Get deeply nested field value
 * 
 * @param {Object} obj - Object to search
 * @param {string} path - Dot notation path (e.g., 'user.address.city')
 * @returns {*} Field value or undefined
 */
export function getFieldValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Set deeply nested field value
 * 
 * @param {Object} obj - Object to modify
 * @param {string} path - Dot notation path
 * @param {*} value - Value to set
 * @returns {Object} Modified object
 */
export function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  
  target[lastKey] = value;
  return obj;
}

/**
 * Clean form values before submission
 * Removes empty strings, null values, etc.
 * 
 * @param {Object} values - Form values
 * @param {Object} options - Cleaning options
 * @returns {Object} Cleaned values
 */
export function cleanFormValues(values, options = {}) {
  const {
    removeEmpty = true,
    removeNull = true,
    trimStrings = true,
    removeUndefined = true
  } = options;
  
  const clean = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(clean).filter(item => {
        if (removeEmpty && item === '') return false;
        if (removeNull && item === null) return false;
        if (removeUndefined && item === undefined) return false;
        return true;
      });
    }
    
    if (obj !== null && typeof obj === 'object') {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const cleanedValue = clean(value);
        
        if (removeEmpty && cleanedValue === '') return acc;
        if (removeNull && cleanedValue === null) return acc;
        if (removeUndefined && cleanedValue === undefined) return acc;
        
        acc[key] = cleanedValue;
        return acc;
      }, {});
    }
    
    if (trimStrings && typeof obj === 'string') {
      return obj.trim();
    }
    
    return obj;
  };
  
  return clean(values);
}

/**
 * Convert form values to FormData for file uploads
 * 
 * @param {Object} values - Form values
 * @returns {FormData} FormData object
 */
export function toFormData(values) {
  const formData = new FormData();
  
  const append = (key, value) => {
    if (value === null || value === undefined) return;
    
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        append(`${key}[${index}]`, item);
      });
    } else if (typeof value === 'object' && !(value instanceof Date)) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        append(`${key}[${subKey}]`, subValue);
      });
    } else {
      formData.append(key, String(value));
    }
  };
  
  Object.entries(values).forEach(([key, value]) => {
    append(key, value);
  });
  
  return formData;
}

/**
 * Validate field dependencies
 * Ensures required fields are filled when dependent field has value
 * 
 * @param {Object} values - Form values
 * @param {Object} dependencies - Dependency map
 * @returns {Object} Errors object
 */
export function validateDependencies(values, dependencies) {
  const errors = {};
  
  Object.entries(dependencies).forEach(([field, requiredFields]) => {
    if (values[field]) {
      requiredFields.forEach(requiredField => {
        if (!values[requiredField]) {
          errors[requiredField] = `Required when ${field} is provided`;
        }
      });
    }
  });
  
  return errors;
}

/**
 * Create a reusable field configuration
 * 
 * @param {string} name - Field name
 * @param {Object} options - Field options
 * @returns {Object} Field configuration
 */
export function createField(name, options = {}) {
  const {
    type = 'text',
    label,
    placeholder,
    required = false,
    disabled = false,
    className = '',
    ...rest
  } = options;
  
  return {
    name,
    type,
    label: label || name.charAt(0).toUpperCase() + name.slice(1),
    placeholder: placeholder || `Enter ${label || name}`,
    required,
    disabled,
    className,
    ...rest
  };
}

/**
 * Handle API errors and map to Formik errors
 * 
 * @param {Error} error - API error
 * @param {Function} setErrors - Formik setErrors function
 * @param {Function} setStatus - Formik setStatus function
 */
export function handleAPIError(error, setErrors, setStatus) {
  if (error.response?.data?.errors) {
    // Field-specific errors from API
    const fieldErrors = {};
    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
      fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
    });
    setErrors(fieldErrors);
  } else if (error.response?.data?.message) {
    // General error message
    setStatus({ error: error.response.data.message });
  } else {
    // Network or unknown error
    setStatus({ error: 'An unexpected error occurred. Please try again.' });
  }
}

/**
 * Create validation schema from field definitions
 * Useful for dynamic forms
 * 
 * @param {Array} fields - Array of field definitions
 * @returns {Object} Yup validation schema
 */
export function createSchemaFromFields(fields) {
  // This would require Yup to be imported
  // Example usage:
  // const fields = [
  //   { name: 'email', type: 'email', required: true },
  //   { name: 'age', type: 'number', min: 18, max: 120 }
  // ];
  // const schema = createSchemaFromFields(fields);
  
  console.log('Note: This function requires Yup to be imported');
  return {};
}

/**
 * Scroll to first error in form
 * 
 * @param {Object} errors - Formik errors object
 */
export function scrollToFirstError(errors) {
  const firstErrorField = Object.keys(errors)[0];
  if (firstErrorField) {
    const element = document.querySelector(`[name="${firstErrorField}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus();
    }
  }
}

/**
 * Compare form values to detect changes
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Object} currentValues - Current form values
 * @returns {boolean} True if values have changed
 */
export function hasFormChanged(initialValues, currentValues) {
  return JSON.stringify(initialValues) !== JSON.stringify(currentValues);
}

/**
 * Create a confirmation dialog for unsaved changes
 * 
 * @param {boolean} isDirty - Form dirty state
 * @returns {Function} beforeunload handler
 */
export function createUnsavedChangesWarning(isDirty) {
  const handleBeforeUnload = (e) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  };
  
  return handleBeforeUnload;
}

/**
 * Export utilities as default object
 */
export default {
  debounce,
  formatErrors,
  hasErrors,
  getFieldValue,
  setNestedValue,
  cleanFormValues,
  toFormData,
  validateDependencies,
  createField,
  handleAPIError,
  createSchemaFromFields,
  scrollToFirstError,
  hasFormChanged,
  createUnsavedChangesWarning
};
