import React, { useState } from 'react'
import {  PhoneIcon, MapPinIcon } from 'lucide-react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-n-8/90  min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            We're here to help. Reach out to us with any questions or concerns.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-gray-900 rounded-lg transition-transform hover:scale-105">
            {/* <EnvelopeIcon className="w-12 h-12 text-primary mb-4" /> */}
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-gray-400 text-center">rishi01prince@gmail.com</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-900 rounded-lg transition-transform hover:scale-105">
            <PhoneIcon className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Phone</h2>
            <p className="text-gray-400 text-center">+1 (555) 123-4567</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-900 rounded-lg transition-transform hover:scale-105 md:col-span-2 lg:col-span-1">
            <MapPinIcon className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p className="text-gray-400 text-center">123 India , CA 94107</p>
          </div>
        </div>

        <div className="mt-16 bg-gray-900 rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl font-bold mb-6 text-center sm:text-3xl">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-gray-100 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-gray-100 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-gray-100 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}