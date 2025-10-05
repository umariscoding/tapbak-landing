"use client";
import { useState, useEffect, memo, useRef } from "react";
import Image from "next/image";
import { CountUp } from "countup.js";
import {
  CreditCard,
  Smartphone,
  QrCode,
  Users,
  BarChart3,
  Palette,
  CheckCircle,
  Menu,
  X,
  Star,
  Crown,
  Check,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Contact Form Component - Memoized to prevent re-renders
const ContactForm = memo(function ContactForm() {
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.tapbak.co/pass/contact-inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: contactEmail,
            phone_number: contactPhone,
            message: contactMessage,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setContactEmail("");
        setContactPhone("");
        setContactMessage("");
        setSubmitSuccess(true);
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError(
        "Failed to submit. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-2xl p-8 border-2 border-[#7F20FF]/20"
      style={{
        backgroundColor: "rgba(15, 10, 31, 0.6)",
        backdropFilter: "blur(10px)",
      }}
    >
      <form onSubmit={handleContactSubmit} className="space-y-6">
        {submitSuccess && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <p className="text-green-400 text-sm font-medium">
              ✓ Message sent successfully! We&apos;ll get back to you soon.
            </p>
          </div>
        )}

        {submitError && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm font-medium">{submitError}</p>
          </div>
        )}

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="contact-email"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-[#0F0A1F] border border-[#7F20FF]/30 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2DB6FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium text-white mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="contact-phone"
            required
            value={contactPhone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setContactPhone(value);
            }}
            disabled={isSubmitting}
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full px-4 py-3 bg-[#0F0A1F] border border-[#7F20FF]/30 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2DB6FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="1234567890"
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-white mb-2"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            required
            rows={6}
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-[#0F0A1F] border border-[#7F20FF]/30 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2DB6FF] transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Tell us what you need help with..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
});

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Refs for CountUp.js
  const customersRef = useRef<HTMLSpanElement>(null);
  const transactionsRef = useRef<HTMLSpanElement>(null);
  const earningsRef = useRef<HTMLSpanElement>(null);

  // Check if user is logged in via shared cookie
  useEffect(() => {
    const checkAuth = () => {
      // Read the tapbak_auth cookie set by app.tapbak.co
      const cookies = document.cookie.split(";");
      const authCookie = cookies.find((cookie) => {
        const [name] = cookie.trim().split("=");
        return name === "tapbak_auth";
      });

      if (authCookie) {
        const [, value] = authCookie.trim().split("=");
        setIsLoggedIn(value === "true");
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Animated counter effect using CountUp.js - triggers when stats section is in view
  useEffect(() => {
    const statsSection = document.getElementById("analytics-stats");
    if (!statsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // CountUp.js options for smooth animation
            const options = {
              duration: 2.5,
              useEasing: true,
              useGrouping: true,
              separator: ",",
              decimal: ".",
            };

            // Initialize CountUp for each stat
            if (customersRef.current) {
              const customersCounter = new CountUp(
                customersRef.current,
                342,
                options
              );
              if (!customersCounter.error) {
                customersCounter.start();
              }
            }

            if (transactionsRef.current) {
              const transactionsCounter = new CountUp(
                transactionsRef.current,
                1234,
                options
              );
              if (!transactionsCounter.error) {
                transactionsCounter.start();
              }
            }

            if (earningsRef.current) {
              const earningsCounter = new CountUp(
                earningsRef.current,
                9870,
                options
              );
              if (!earningsCounter.error) {
                earningsCounter.start();
              }
            }

            observer.unobserve(statsSection);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <CreditCard className="w-6 h-6 text-[#2DB6FF]" />,
      title: "Digital Loyalty Cards",
      description:
        "Create beautiful, branded digital loyalty cards that customers love. No more paper cards to lose or forget.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#2DB6FF]" />,
      title: "Apple & Google Wallet Integration",
      description:
        "Seamlessly integrate with Apple Wallet and Google Wallet. Your cards are always accessible on your customers' devices.",
    },
    {
      icon: <QrCode className="w-6 h-6 text-[#2DB6FF]" />,
      title: "QR Code Scanning",
      description:
        "Fast and easy stamp tracking with QR codes. Customers simply scan to earn rewards at your store.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#2DB6FF]" />,
      title: "Customer Management",
      description:
        "Track and manage all your customers in one place. See who's engaged and who needs a nudge.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#2DB6FF]" />,
      title: "Analytics Dashboard",
      description:
        "Gain insights into customer behavior with detailed analytics. Make data-driven decisions to grow your business.",
    },
    {
      icon: <Palette className="w-6 h-6 text-[#2DB6FF]" />,
      title: "Custom Branding",
      description:
        "Upload your own logo, brand name, and custom stamp icons with the Growth Plan. Make it uniquely yours.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Design Your Card",
      description:
        "Create a beautiful digital loyalty card with our easy-to-use builder. Customize colors, branding, and set your reward structure.",
      icon: <CreditCard className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Display Your QR Code",
      description:
        "Print your unique QR code and display it at your shop, or show it digitally from the platform on any device.",
      icon: <QrCode className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Customers Add to Wallet",
      description:
        "Customers scan the QR code and instantly add your loyalty card to their Apple Wallet or Google Wallet with one tap.",
      icon: <Smartphone className="w-8 h-8" />,
    },
    {
      number: "04",
      title: "Scan & Reward",
      description:
        "When customers return, scan their digital card and reward them with points or stamps. Watch your business grow!",
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  const faqs = [
    {
      question: "What is TapBak?",
      answer:
        "TapBak is a digital loyalty card platform that helps businesses create and manage digital loyalty programs. Customers can add your loyalty cards to their Apple or Google Wallet, making it easy to track rewards and drive repeat business.",
    },
    {
      question: "How does the free trial work?",
      answer:
        "The Starter Plan includes a 7-day free trial with full access to all starter features. No credit card required to start. After the trial, the Starter Plan costs £50/month with up to 100 customers. You can upgrade to the Growth Plan (£100/month) anytime for unlimited customers and custom branding.",
    },
    {
      question: "Can I customize my loyalty cards?",
      answer:
        "Yes! With the Growth Plan, you can fully customize your loyalty cards with your brand colors, custom logos, stamp icons, and messaging. The Starter Plan includes one standard template with TapBak branding.",
    },
    {
      question: "Which devices are supported?",
      answer:
        "TapBak works with both Apple Wallet (iOS) and Google Wallet (Android). Customers can add your loyalty cards to their mobile wallets on any compatible smartphone.",
    },
    {
      question: "How do customers add cards to their wallet?",
      answer:
        "It's simple! Customers scan your unique QR code displayed at your store or shared digitally. The card is instantly added to their Apple or Google Wallet with one tap.",
    },
    {
      question: "What's the difference between Starter and Growth plans?",
      answer:
        "The Starter Plan (£50/month) is perfect for small businesses with up to 100 customers and includes TapBak branding with standard templates. The Growth Plan (£100/month) offers unlimited customers, custom branding (your logo and name), custom stamp icons, and advanced customization - ideal for growing businesses that need a professional, white-label solution.",
    },
  ];

  const pricingFeatures = [
    {
      feature: "Loyalty Card Designs",
      starter: { available: true, text: "1 standard template" },
      growth: { available: true, text: "1 standard template" },
    },
    {
      feature: "Apple & Google Wallet Integration",
      starter: { available: true, text: "Included" },
      growth: { available: true, text: "Included" },
    },
    {
      feature: "Customer Stamp Tracking",
      starter: { available: true, text: "Included" },
      growth: { available: true, text: "Included" },
    },
    {
      feature: "QR Code for In-Store Display",
      starter: { available: true, text: "Included" },
      growth: { available: true, text: "Included" },
    },
    {
      feature: "Customer Capacity",
      starter: { available: true, text: "Up to 100 customers" },
      growth: { available: true, text: "Unlimited customers" },
    },
    {
      feature: "Dashboard & Stats",
      starter: {
        available: true,
        text: "Basic stats & Transactions Analytics",
      },
      growth: { available: true, text: "Basic stats & Transactions Analytics" },
    },
    {
      feature: "Custom Branding",
      starter: { available: false, text: "TapBak branding only" },
      growth: { available: true, text: "Custom shop branding" },
    },
    {
      feature: "Stamp Icon Customization",
      starter: { available: false, text: "Standard icons only" },
      growth: { available: true, text: "Custom stamp icons" },
    },
    {
      feature: "7-Day Free Trial",
      starter: { available: true, text: "Yes" },
      growth: { available: false, text: "No" },
    },
  ];

  // Analytics Chart Data
  const customerGrowthData = [
    { month: "Jan", customers: 45 },
    { month: "Feb", customers: 78 },
    { month: "Mar", customers: 125 },
    { month: "Apr", customers: 189 },
    { month: "May", customers: 267 },
    { month: "Jun", customers: 342 },
  ];

  const transactionData = [
    { month: "Jan", transactions: 234, revenue: 1890 },
    { month: "Feb", transactions: 389, revenue: 3120 },
    { month: "Mar", transactions: 567, revenue: 4540 },
    { month: "Apr", transactions: 728, revenue: 5820 },
    { month: "May", transactions: 945, revenue: 7560 },
    { month: "Jun", transactions: 1234, revenue: 9870 },
  ];

  return (
    <div className="min-h-screen bg-[#0F0A1F] text-white overflow-x-hidden">
      <nav className="sticky top-0 z-50 border-b border-[#7F20FF]/20 backdrop-blur-lg bg-[#0F0A1F]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/tapbak.svg"
                alt="TapBak Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold">TapBak</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-[#D1D5DB] hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-[#D1D5DB] hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[#D1D5DB] hover:text-white transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-[#D1D5DB] hover:text-white transition-colors"
              >
                FAQ
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <a
                  href="https://app.tapbak.co"
                  className="px-6 py-3 bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg"
                >
                  Go to Dashboard
                </a>
              ) : (
                <>
                  <a
                    href="https://app.tapbak.co/login"
                    className="px-5 py-2 text-[#D1D5DB] hover:text-white transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="https://app.tapbak.co/signup"
                    className="px-6 py-3 bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg"
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white relative z-10"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen
                      ? "rotate-90 opacity-0 scale-0"
                      : "rotate-0 opacity-100 scale-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen
                      ? "rotate-0 opacity-100 scale-100"
                      : "-rotate-90 opacity-0 scale-0"
                  }`}
                />
              </div>
            </button>
          </div>
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left text-[#D1D5DB] hover:text-white transition-colors py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block w-full text-left text-[#D1D5DB] hover:text-white transition-colors py-2"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-[#D1D5DB] hover:text-white transition-colors py-2"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left text-[#D1D5DB] hover:text-white transition-colors py-2"
              >
                FAQ
              </button>
              <div className="pt-4 space-y-3">
                {isLoggedIn ? (
                  <a
                    href="https://app.tapbak.co"
                    className="block text-center px-6 py-3 bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg"
                  >
                    Go to Dashboard
                  </a>
                ) : (
                  <>
                    <a
                      href="https://app.tapbak.co/login"
                      className="block text-center px-5 py-2 border-2 border-[#7F20FF]/40 text-[#2DB6FF] font-semibold rounded-xl hover:bg-[#7F20FF]/10 transition-all"
                    >
                      Login
                    </a>
                    <a
                      href="https://app.tapbak.co/signup"
                      className="block text-center px-6 py-3 bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg"
                    >
                      Get Started
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-visible pb-40">
        {/* Animated Background Elements - extends beyond section */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ bottom: "-200px" }}
        >
          {/* Gradient Orbs - positioned to extend into next section */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2DB6FF]/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#9A3BFF]/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#7F20FF]/10 rounded-full blur-3xl animate-pulse-slow"></div>

          {/* Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#7F20FF08_1px,transparent_1px),linear-gradient(to_bottom,#7F20FF08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              Digital Loyalty Cards for{" "}
              <span className="bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
              Transform your customer loyalty program with digital cards that
              live in Apple & Google Wallet. Increase repeat visits and build
              lasting relationships.
            </p>
            <div className="flex justify-center">
              <a
                href={
                  isLoggedIn
                    ? "https://app.tapbak.co"
                    : "https://app.tapbak.co/signup"
                }
                className="px-8 py-4 bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg text-lg"
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden -mt-40"
      >
        {/* Smooth gradient continuation from hero - additional subtle orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-1/4 w-96 h-96 bg-[#9A3BFF]/8 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#9A3BFF]/5 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-[#2DB6FF]/5 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] bg-clip-text text-transparent">
                Grow Your Business
              </span>
            </h2>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Powerful features designed to help you create, manage, and
              optimize your customer loyalty program.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 border-2 border-[#7F20FF]/20 hover:border-[#7F20FF]/40 transition-all"
                style={{
                  backgroundColor: "rgba(15, 10, 31, 0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="w-12 h-12 bg-[#7F20FF]/10 border border-[#7F20FF]/20 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#9CA3AF]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#0F0A1F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-[#7F20FF]/5 rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get Started in{" "}
              <span className="bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] bg-clip-text text-transparent">
                4 Simple Steps
              </span>
            </h2>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              From design to rewarding customers - launch your digital loyalty
              program in minutes.
            </p>
          </div>

          {/* Desktop View - Curved Path with Glowing Dots */}
          <div
            className="hidden lg:block relative"
            style={{ minHeight: "700px" }}
          >
            {/* SVG Curved Path - Horizontal U Shape: 1->2->3->4 */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#2DB6FF" stopOpacity="0.6" />
                  <stop offset="33%" stopColor="#7F20FF" stopOpacity="0.6" />
                  <stop offset="66%" stopColor="#9A3BFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2DB6FF" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Zigzag Path: Step1 -> Step2 -> Step3 -> Step4 with diagonal sharp angles */}
              <path
                d="M 200 150 L 600 250 L 1000 150 L 800 290 L 1000 430 L 400 290 L 200 430"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Glowing Dots positioned at each step */}
              <circle
                cx="200"
                cy="150"
                r="12"
                fill="#2DB6FF"
                filter="url(#glow)"
              >
                <animate
                  attributeName="r"
                  values="12;16;12"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="1000"
                cy="150"
                r="12"
                fill="#7F20FF"
                filter="url(#glow)"
              >
                <animate
                  attributeName="r"
                  values="12;16;12"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="0.5s"
                />
              </circle>
              <circle
                cx="1000"
                cy="430"
                r="12"
                fill="#9A3BFF"
                filter="url(#glow)"
              >
                <animate
                  attributeName="r"
                  values="12;16;12"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
              <circle
                cx="200"
                cy="430"
                r="12"
                fill="#2DB6FF"
                filter="url(#glow)"
              >
                <animate
                  attributeName="r"
                  values="12;16;12"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="1.5s"
                />
              </circle>
            </svg>

            {/* Step 1 - Top Left */}
            <div className="absolute" style={{ top: "30px", left: "40px" }}>
              <div
                className="rounded-2xl p-6 border-2 border-[#7F20FF]/30 hover:border-[#2DB6FF]/60 transition-all w-80"
                style={{
                  backgroundColor: "rgba(15, 10, 31, 0.8)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(45, 182, 255, 0.1)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2DB6FF]/20 to-[#7F20FF]/20 border border-[#2DB6FF]/30 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#2DB6FF]" />
                  </div>
                  <span className="text-sm font-semibold text-[#2DB6FF]">
                    Step 1
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Design Your Card
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  Create a beautiful digital loyalty card with our easy-to-use
                  builder. Customize colors, branding, and set your reward
                  structure.
                </p>
              </div>
            </div>

            {/* Step 2 - Top Right */}
            <div className="absolute" style={{ top: "30px", right: "40px" }}>
              <div
                className="rounded-2xl p-6 border-2 border-[#7F20FF]/30 hover:border-[#7F20FF]/60 transition-all w-80"
                style={{
                  backgroundColor: "rgba(15, 10, 31, 0.8)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(127, 32, 255, 0.1)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7F20FF]/20 to-[#9A3BFF]/20 border border-[#7F20FF]/30 rounded-xl flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-[#7F20FF]" />
                  </div>
                  <span className="text-sm font-semibold text-[#7F20FF]">
                    Step 2
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Display Your QR Code
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  Print your unique QR code and display it at your shop, or show
                  it digitally from the platform on any device.
                </p>
              </div>
            </div>

            {/* Step 3 - Bottom Right */}
            <div className="absolute" style={{ bottom: "30px", right: "40px" }}>
              <div
                className="rounded-2xl p-6 border-2 border-[#7F20FF]/30 hover:border-[#9A3BFF]/60 transition-all w-80"
                style={{
                  backgroundColor: "rgba(15, 10, 31, 0.8)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(154, 59, 255, 0.1)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7F20FF]/20 to-[#9A3BFF]/20 border border-[#9A3BFF]/30 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-[#9A3BFF]" />
                  </div>
                  <span className="text-sm font-semibold text-[#9A3BFF]">
                    Step 3
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Customers Add to Wallet
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  Customers scan the QR code and instantly add your loyalty card
                  to their Apple Wallet or Google Wallet with one tap.
                </p>
              </div>
            </div>

            {/* Step 4 - Bottom Left */}
            <div className="absolute" style={{ bottom: "30px", left: "40px" }}>
              <div
                className="rounded-2xl p-6 border-2 border-[#7F20FF]/30 hover:border-[#2DB6FF]/60 transition-all w-80"
                style={{
                  backgroundColor: "rgba(15, 10, 31, 0.8)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(45, 182, 255, 0.1)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2DB6FF]/20 to-[#9A3BFF]/20 border border-[#2DB6FF]/30 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#2DB6FF]" />
                  </div>
                  <span className="text-sm font-semibold text-[#2DB6FF]">
                    Step 4
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Scan & Reward
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  When customers return, scan their digital card and reward them
                  with points or stamps. Watch your business grow!
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet View - Vertical Stack */}
          <div className="lg:hidden space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  {/* Connection Point */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] p-1">
                      <div className="w-full h-full rounded-full bg-[#0F0A1F] flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] bg-clip-text text-transparent">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-1/2 top-16 w-0.5 h-12 bg-gradient-to-b from-[#7F20FF]/50 to-transparent"></div>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-2xl p-6 border-2 border-[#7F20FF]/20 hover:border-[#7F20FF]/40 transition-all flex-1"
                    style={{
                      backgroundColor: "rgba(15, 10, 31, 0.6)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="w-14 h-14 bg-[#7F20FF]/10 border border-[#7F20FF]/20 rounded-xl flex items-center justify-center mb-4 text-[#2DB6FF]">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#9CA3AF]">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics & Insights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#2DB6FF]/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-20 left-10 w-72 h-72 bg-[#9A3BFF]/5 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Powerful{" "}
              <span className="bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] bg-clip-text text-transparent">
                Analytics & Insights
              </span>
            </h2>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Track every customer interaction, transaction, and earning. Make
              data-driven decisions with real-time insights.
            </p>
          </div>

          <div
            id="analytics-stats"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
          >
            {/* Stat Cards */}
            <div
              className="rounded-2xl p-6 border-2 border-[#7F20FF]/20 hover:border-[#7F20FF]/40 transition-all"
              style={{
                backgroundColor: "rgba(15, 10, 31, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-[#2DB6FF]/10 border border-[#2DB6FF]/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#2DB6FF]" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm">Total Customers</p>
                  <p className="text-3xl font-bold text-white">
                    <span ref={customersRef}>0</span>
                  </p>
                </div>
              </div>
              <p className="text-[#2DB6FF] text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +24% from last month
              </p>
            </div>

            <div
              className="rounded-2xl p-6 border-2 border-[#7F20FF]/20 hover:border-[#7F20FF]/40 transition-all"
              style={{
                backgroundColor: "rgba(15, 10, 31, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-[#9A3BFF]/10 border border-[#9A3BFF]/20 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#9A3BFF]" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm">Transactions</p>
                  <p className="text-3xl font-bold text-white">
                    <span ref={transactionsRef}>0</span>
                  </p>
                </div>
              </div>
              <p className="text-[#9A3BFF] text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +31% from last month
              </p>
            </div>

            <div
              className="rounded-2xl p-6 border-2 border-[#7F20FF]/20 hover:border-[#7F20FF]/40 transition-all"
              style={{
                backgroundColor: "rgba(15, 10, 31, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-[#2DB6FF]/10 border border-[#2DB6FF]/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#2DB6FF]" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm">Monthly Earnings</p>
                  <p className="text-3xl font-bold text-white">
                    $<span ref={earningsRef}>0</span>
                  </p>
                </div>
              </div>
              <p className="text-[#2DB6FF] text-sm flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +18% from last month
              </p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Growth Chart */}
            <div
              className="rounded-2xl p-6 border-2 border-[#7F20FF]/20"
              style={{
                backgroundColor: "rgba(15, 10, 31, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Customer Growth
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  Track your growing customer base over time
                </p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#7F20FF20" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F0A1F",
                      border: "1px solid #7F20FF40",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#2DB6FF"
                    strokeWidth={3}
                    dot={{ fill: "#2DB6FF", r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Transaction & Revenue Chart */}
            <div
              className="rounded-2xl p-6 border-2 border-[#7F20FF]/20"
              style={{
                backgroundColor: "rgba(15, 10, 31, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Transactions & Revenue
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  Monitor transaction volume and revenue trends
                </p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={transactionData}>
                  <defs>
                    <linearGradient
                      id="colorTransactions"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#9A3BFF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#9A3BFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#7F20FF20" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F0A1F",
                      border: "1px solid #7F20FF40",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="transactions"
                    stroke="#9A3BFF"
                    fillOpacity={1}
                    fill="url(#colorTransactions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2DB6FF]/10 border border-[#2DB6FF]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-[#2DB6FF]" />
              </div>
              <h4 className="font-semibold text-white mb-1">
                Customer Tracking
              </h4>
              <p className="text-sm text-[#9CA3AF]">
                Track every customer visit and interaction
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#9A3BFF]/10 border border-[#9A3BFF]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-[#9A3BFF]" />
              </div>
              <h4 className="font-semibold text-white mb-1">
                Transaction History
              </h4>
              <p className="text-sm text-[#9CA3AF]">
                Complete history of all transactions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2DB6FF]/10 border border-[#2DB6FF]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-[#2DB6FF]" />
              </div>
              <h4 className="font-semibold text-white mb-1">
                Real-time Insights
              </h4>
              <p className="text-sm text-[#9CA3AF]">
                Get insights as they happen
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#9A3BFF]/10 border border-[#9A3BFF]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-[#9A3BFF]" />
              </div>
              <h4 className="font-semibold text-white mb-1">
                Earnings Dashboard
              </h4>
              <p className="text-sm text-[#9CA3AF]">
                Monitor revenue and profitability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] bg-clip-text text-transparent">
                Plan
              </span>
            </h2>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Unlock powerful features to grow your business
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div
              className="rounded-2xl p-8 border-2 border-[#7F20FF]/20 hover:border-[#7F20FF]/40 transition-all"
              style={{
                backgroundColor: "rgba(15, 10, 31, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-6 h-6 text-[#2DB6FF]" />
                  <h3 className="text-2xl font-bold">Starter</h3>
                </div>
                <p className="text-sm text-[#9CA3AF]">
                  Starter Plan for Small Businesses
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">£50</span>
                  <span className="text-[#9CA3AF]">/month</span>
                </div>
                <p className="text-sm text-[#2DB6FF] mt-2">
                  7-day free trial included
                </p>
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#9CA3AF] mb-3">
                  Key Features
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2DB6FF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#D1D5DB]">Up to 100 customers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2DB6FF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#D1D5DB]">
                      1 standard loyalty card template
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2DB6FF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#D1D5DB]">7-day free trial</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-[#9A3BFF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">TapBak branding only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-[#9A3BFF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">Standard icons only</span>
                  </li>
                </ul>
              </div>
              <a
                href={
                  isLoggedIn
                    ? "https://app.tapbak.co"
                    : "https://app.tapbak.co/signup"
                }
                className="block text-center px-6 py-3 border-2 border-[#7F20FF]/40 text-[#2DB6FF] font-semibold rounded-xl hover:bg-[#7F20FF]/10 transition-all"
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              </a>
            </div>

            {/* Growth Plan */}
            <div
              className="rounded-2xl p-8 border-2 border-[#9A3BFF] hover:border-[#9A3BFF]/80 transition-all relative"
              style={{
                backgroundColor: "rgba(15, 10, 31, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-6 h-6 text-[#9A3BFF]" />
                  <h3 className="text-2xl font-bold">Growth</h3>
                </div>
                <p className="text-sm text-[#9CA3AF]">Growth Enterprise Plan</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">£100</span>
                  <span className="text-[#9CA3AF]">/month</span>
                </div>
                <p className="text-sm text-[#9CA3AF] mt-2">
                  No free trial • Full access from day one
                </p>
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#9CA3AF] mb-3">
                  Key Features
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2DB6FF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#D1D5DB]">Unlimited customers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2DB6FF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#D1D5DB]">
                      Custom branding & icons
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2DB6FF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#D1D5DB]">
                      Advanced customization
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#2DB6FF] mt-0.5 flex-shrink-0" />
                    <span className="text-[#D1D5DB]">
                      All features from Starter Plan
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0"></div>
                    <span className="text-[#D1D5DB]"></span>
                  </li>
                </ul>
              </div>
              <a
                href={
                  isLoggedIn
                    ? "https://app.tapbak.co"
                    : "https://app.tapbak.co/signup"
                }
                className="block text-center px-6 py-3 bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg"
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              </a>
            </div>
          </div>

          {/* Pricing Comparison Table */}
          <div
            className="rounded-2xl p-6 border-2 border-[#7F20FF]/20"
            style={{
              backgroundColor: "rgba(15, 10, 31, 0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              Plan Features Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#7F20FF]/20">
                    <th className="text-left py-4 px-4 font-semibold text-white">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-[#2DB6FF]">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="w-4 h-4" />
                        Starter Plan
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-[#9A3BFF]">
                      <div className="flex items-center justify-center gap-2">
                        <Crown className="w-4 h-4" />
                        Growth Plan
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricingFeatures.map((feature, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#7F20FF]/10 hover:bg-[#7F20FF]/5"
                    >
                      <td className="py-4 px-4 font-medium text-white">
                        {feature.feature}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {feature.starter.available ? (
                            <Check className="w-4 h-4 text-[#2DB6FF]" />
                          ) : (
                            <X className="w-4 h-4 text-[#9A3BFF]" />
                          )}
                          <span className="text-[#D1D5DB] text-sm">
                            {feature.starter.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {feature.growth.available ? (
                            <Check className="w-4 h-4 text-[#2DB6FF]" />
                          ) : (
                            <X className="w-4 h-4 text-[#9A3BFF]" />
                          )}
                          <span className="text-[#D1D5DB] text-sm">
                            {feature.growth.text}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get in{" "}
              <span className="bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-lg text-[#9CA3AF]">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#2DB6FF] to-[#9A3BFF] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg text-[#9CA3AF]">
              Everything you need to know about TapBak
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border-2 border-[#7F20FF]/20 hover:border-[#7F20FF]/40 transition-all overflow-hidden"
                style={{
                  backgroundColor: "rgba(15, 10, 31, 0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#7F20FF]/5 transition-colors"
                >
                  <span className="font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2DB6FF] transition-transform flex-shrink-0 ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-[#9CA3AF] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#7F20FF]/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/tapbak.svg"
                  alt="TapBak Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-xl font-bold">TapBak</span>
              </div>
              <p className="text-[#9CA3AF] max-w-md">
                The modern digital loyalty card platform for businesses that
                want to grow customer engagement and drive repeat sales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-[#9CA3AF]">
                <p className="text-sm">410 Sonic House</p>
                <p className="text-sm">Monier Road</p>
                <p className="text-sm">London</p>
                <p className="text-sm">E3 2NP</p>
                <p className="text-sm mt-3">
                  <a
                    href="tel:07471503999"
                    className="hover:text-white transition-colors"
                  >
                    07471 503999
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="text-[#9CA3AF] hover:text-white transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-[#9CA3AF] hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#7F20FF]/20 text-center">
            <p className="text-[#9CA3AF] text-sm">
              © 2025 TapBak. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-[#0F0A1F] border-2 border-[#7F20FF]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#7F20FF] scrollbar-track-[#0F0A1F]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#0F0A1F] border-b border-[#7F20FF]/20 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Terms of Service
              </h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-[#D1D5DB] space-y-6">
              <p className="text-sm text-[#9CA3AF]">
                Last Updated: September 30, 2025
              </p>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing and using TapBak (&quot;the Service&quot;), you
                  accept and agree to be bound by the terms and provision of
                  this agreement.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  2. Description of Service
                </h3>
                <p>
                  TapBak provides digital loyalty card solutions for businesses,
                  including Apple Wallet and Google Wallet integration, customer
                  management, and analytics dashboard.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  3. Subscription Plans
                </h3>
                <p>TapBak offers two subscription tiers:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    <strong>Starter Plan:</strong> £50/month with a 7-day free
                    trial, supporting up to 100 customers
                  </li>
                  <li>
                    <strong>Growth Plan:</strong> £100/month with unlimited
                    customers and custom branding
                  </li>
                </ul>
                <p className="mt-2">
                  Subscriptions renew automatically unless cancelled before the
                  renewal date.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  4. Payment Terms
                </h3>
                <p>
                  Payment is processed through Stripe. You agree to provide
                  accurate billing information. Failure to pay may result in
                  service suspension or termination.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  5. Free Trial
                </h3>
                <p>
                  The Starter Plan includes a 7-day free trial. You may cancel
                  anytime during the trial period without charge. After the
                  trial, your subscription will automatically convert to a paid
                  plan unless cancelled.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  6. User Responsibilities
                </h3>
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>Ensuring your use complies with all applicable laws</li>
                  <li>The accuracy of customer data you collect and store</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  7. Prohibited Activities
                </h3>
                <p>You may not:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Use the Service for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to the Service</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Upload malicious code or content</li>
                  <li>
                    Resell or redistribute the Service without authorization
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  8. Data Ownership
                </h3>
                <p>
                  You retain ownership of all customer data you input into the
                  Service. TapBak will not use your data except to provide the
                  Service to you.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  9. Service Availability
                </h3>
                <p>
                  While we strive for 99.9% uptime, we do not guarantee
                  uninterrupted service. We reserve the right to modify,
                  suspend, or discontinue the Service with reasonable notice.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  10. Termination
                </h3>
                <p>
                  You may cancel your subscription at any time. We reserve the
                  right to suspend or terminate accounts that violate these
                  Terms or for non-payment.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  11. Limitation of Liability
                </h3>
                <p>
                  TapBak shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use of or inability to use the Service.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  12. Changes to Terms
                </h3>
                <p>
                  We reserve the right to modify these Terms at any time.
                  Continued use of the Service after changes constitutes
                  acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  13. Contact Information
                </h3>
                <p>
                  For questions about these Terms, please contact us at
                  support@tapbak.com
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="bg-[#0F0A1F] border-2 border-[#7F20FF]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#7F20FF] scrollbar-track-[#0F0A1F]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#0F0A1F] border-b border-[#7F20FF]/20 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-[#D1D5DB] space-y-6">
              <p className="text-sm text-[#9CA3AF]">
                Last Updated: September 30, 2025
              </p>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  1. Introduction
                </h3>
                <p>
                  TapBak (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
                  committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you use our Service.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  2. Information We Collect
                </h3>
                <h4 className="text-lg font-semibold text-white mt-4 mb-2">
                  2.1 Information You Provide
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Account information (name, email, business name)</li>
                  <li>
                    Payment information (processed securely through Stripe)
                  </li>
                  <li>Business branding (logos, colors, card designs)</li>
                  <li>
                    Customer data you input (names, phone numbers, email
                    addresses, transaction history)
                  </li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-4 mb-2">
                  2.2 Automatically Collected Information
                </h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    Device information (IP address, browser type, operating
                    system)
                  </li>
                  <li>Usage data (features used, time spent, interactions)</li>
                  <li>Log data (access times, pages viewed, errors)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  3. How We Use Your Information
                </h3>
                <p>We use your information to:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Provide, maintain, and improve the Service</li>
                  <li>Process payments and transactions</li>
                  <li>
                    Send loyalty cards to customer wallets (Apple Wallet, Google
                    Wallet)
                  </li>
                  <li>Generate QR codes and manage stamp tracking</li>
                  <li>Provide analytics and insights</li>
                  <li>Send administrative notifications and updates</li>
                  <li>Respond to customer support inquiries</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  4. Data Sharing and Disclosure
                </h3>
                <p>
                  We do not sell your personal information. We may share data
                  with:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    <strong>Service Providers:</strong> Stripe (payment
                    processing), AWS (hosting), Apple/Google (wallet
                    integration)
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> When required by law or
                    to protect our rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with
                    mergers, acquisitions, or asset sales
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  5. Data Security
                </h3>
                <p>
                  We implement industry-standard security measures including:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Encryption of data in transit (HTTPS/TLS)</li>
                  <li>Encryption of data at rest</li>
                  <li>JWT-based authentication</li>
                  <li>Regular security audits</li>
                  <li>Access controls and monitoring</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  6. Data Retention
                </h3>
                <p>
                  We retain your data for as long as your account is active or
                  as needed to provide services. After account deletion, we may
                  retain certain data for legal compliance, dispute resolution,
                  and fraud prevention.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  7. Your Rights
                </h3>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to data processing</li>
                </ul>
                <p className="mt-2">
                  To exercise these rights, contact us at support@tapbak.com
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  8. GDPR Compliance
                </h3>
                <p>
                  For users in the European Economic Area (EEA), we process data
                  based on:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Contract performance (providing the Service)</li>
                  <li>Consent (where applicable)</li>
                  <li>
                    Legitimate interests (fraud prevention, service improvement)
                  </li>
                  <li>Legal obligations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  9. Cookies and Tracking
                </h3>
                <p>We use cookies and similar technologies for:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Authentication and session management</li>
                  <li>Analytics and performance monitoring</li>
                  <li>User preferences</li>
                </ul>
                <p className="mt-2">
                  You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  10. Third-Party Services
                </h3>
                <p>Our Service integrates with:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>
                    <strong>Apple Wallet:</strong> Subject to Apple&apos;s
                    privacy policy
                  </li>
                  <li>
                    <strong>Google Wallet:</strong> Subject to Google&apos;s
                    privacy policy
                  </li>
                  <li>
                    <strong>Stripe:</strong> Subject to Stripe&apos;s privacy
                    policy
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  11. Children&apos;s Privacy
                </h3>
                <p>
                  TapBak is not intended for users under 18. We do not knowingly
                  collect data from children.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  12. International Data Transfers
                </h3>
                <p>
                  Your data may be transferred to and processed in countries
                  other than your own. We ensure appropriate safeguards are in
                  place for such transfers.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  13. Changes to Privacy Policy
                </h3>
                <p>
                  We may update this Privacy Policy periodically. We will notify
                  you of significant changes via email or through the Service.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  14. Contact Us
                </h3>
                <p>For privacy-related questions or concerns, contact us at:</p>
                <p className="mt-2">Email: support@tapbak.com</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
