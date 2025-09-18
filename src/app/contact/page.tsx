'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you for your message! We\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-amber-700">
              Have a question or want to place a custom order? We'd love to hear from you!
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-amber-900 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      Visit Our Bakery
                    </h3>
                    <p className="text-amber-700">
                      123 Baker Street<br />
                      Sweet City, SC 12345
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      Call Us
                    </h3>
                    <p className="text-amber-700">
                      (555) 123-4567
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      Email Us
                    </h3>
                    <p className="text-amber-700">
                      hello@sweetcrumbs.com
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      Hours
                    </h3>
                    <div className="text-amber-700">
                      <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                      <p>Saturday: 8:00 AM - 8:00 PM</p>
                      <p>Sunday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-amber-900">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-amber-900 shadow-sm ring-1 ring-inset ring-amber-300 placeholder:text-amber-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 ${
                        errors.name ? 'ring-red-500 focus:ring-red-600' : ''
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-amber-900">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-amber-900 shadow-sm ring-1 ring-inset ring-amber-300 placeholder:text-amber-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 ${
                        errors.email ? 'ring-red-500 focus:ring-red-600' : ''
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-amber-900">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-amber-900 shadow-sm ring-1 ring-inset ring-amber-300 placeholder:text-amber-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 ${
                        errors.message ? 'ring-red-500 focus:ring-red-600' : ''
                      }`}
                      placeholder="Tell us about your inquiry or custom order..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-md ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors ${
                      isSubmitting
                        ? 'bg-amber-400 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;