import React from 'react';
import { AppBar } from '../components/appbar';
import { Footer } from '../components/footer';
import Sliderhome from '../components/slider';
import { ArrowRight, Leaf, TrendingUp, Users, Zap, CloudSun, Recycle } from 'lucide-react';

import bgVideo from '../assets/bgvideo.mp4'

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <AppBar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 animate-fadeIn">
            Accelcorp
          </h1>
          <p className="text-xl md:text-2xl text-white font-semibold max-w-2xl mx-auto mb-8 animate-fadeIn delay-300">
            Discover innovative ways to improve agricultural productivity
          </p>
          <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:-translate-y-1 animate-fadeIn delay-500 flex items-center mx-auto">
            Learn More
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Welcome and Carousel Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Welcome to Accelcorp</h2>
          <Sliderhome />
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 bg-gradient-to-r from-green-100 to-green-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">Our Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Leaf className="w-8 h-8 text-green-600" />, title: "Crop Monitoring", description: "AI-powered tools to monitor crop health and yield." },
              { icon: <TrendingUp className="w-8 h-8 text-green-600" />, title: "Market Trends", description: "Stay updated with the latest market trends." },
              { icon: <Users className="w-8 h-8 text-green-600" />, title: "Discussion Forums", description: "Engage with fellow farmers and experts." },
              { icon: <Zap className="w-8 h-8 text-green-600" />, title: "Precision Farming", description: "Optimize farming practices and increase efficiency." },
              { icon: <Recycle className="w-8 h-8 text-green-600" />, title: "Sustainability Insights", description: "Learn about sustainable farming practices." },
              { icon: <CloudSun className="w-8 h-8 text-green-600" />, title: "Weather Forecasting", description: "Access real-time weather data for planning." },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-green-700 ml-3">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Organic Farmer", quote: "Accelcorp has revolutionized the way I manage my farm. Their tools are indispensable." },
              { name: "Jane Smith", role: "Agricultural Consultant", quote: "The insights provided by Accelcorp have helped my clients achieve remarkable results." },
              { name: "Mike Johnson", role: "Large-scale Farmer", quote: "The precision farming techniques I've learned through Accelcorp have significantly increased my yields." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-green-50 rounded-lg p-6 shadow-md">
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-green-700">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To empower farmers with cutting-edge agricultural techniques and knowledge, 
            fostering sustainable practices and enhancing global food security.
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:bg-green-100 transition duration-300">
            Join Our Mission
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};