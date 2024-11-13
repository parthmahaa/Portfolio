import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact,
  FaInstagram,
  FaLinkedin,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaJava,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGitAlt,
  FaGithub,
} from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { TbBrandLeetcode } from 'react-icons/tb';
import { GoArrowUpRight } from 'react-icons/go';
import {
  SiCodechef,
  SiMongodb,
  SiSpringboot,
  SiExpress,
  SiFlutter,
} from 'react-icons/si';
import Musafir from './assets/musafir.png';
import GeoPulse from './assets/geopulse.png';
import profile from './assets/profile.jpeg';

// Background animation wrapper
const AnimatedSquare = ({ size, initialX, initialY, duration, delay }) => (
  <motion.div
    className="absolute bg-zinc-800/50 rounded-lg"
    style={{
      width: size,
      height: size,
      left: `${initialX}%`,
      top: `${initialY}%`,
    }}
    animate={{
      y: [0, -1000],
      rotate: [0, 45],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      repeatDelay: delay,
      ease: 'linear',
    }}
  />
);

// Background animation wrapper
const AnimatedBackground = () => {
  const squares = Array.from({ length: 15 }).map((_, i) => ({
    size: Math.random() * 100 + 20,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100 + 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden">
      {squares.map((square, i) => (
        <AnimatedSquare key={i} {...square} />
      ))}
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleScroll = (section) => {
    document.querySelector(`#${section}`)?.scrollIntoView({
      behavior: 'smooth',
    });
    setIsMenuOpen(false);
  };

  const onSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append('access_key', 'ef1dfb2c-ae23-4c35-b0cd-9658c9faaee7');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert('Form submitted');
        event.target.reset();
      } else {
        alert('Error, Try again');
      }
    } catch (error) {
      alert('An unexpected error occurred, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <AnimatedBackground />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen text-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto md:justify-center">
            <div className="md:hidden flex items-center space-x-2">
              <img
                src={profile}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-white">Parth Maha</span>
            </div>
            <ul className="hidden md:flex justify-center space-x-8 bg-black/80 backdrop-blur-sm px-6 py-2 rounded-full border border-gray-600">
              {['Home', 'Projects', 'Skills', 'Contact', 'Resume'].map(
                (section) => (
                  <li key={section}>
                    <a
                      href={
                        section === 'Resume'
                          ? '/ParthMahaCV.pdf'
                          : `#${section.toLowerCase()}`
                      }
                      download={section === 'Resume' ? 'ParthMahaCV.pdf' : undefined}
                      target={section === 'Resume' ? '_blank' : '_self'}
                      className={`text-lg transition-colors ${
                        activeSection.toLowerCase() === section.toLowerCase()
                          ? 'text-blue-500'
                          : 'text-white hover:text-blue-300'
                      }`}
                      onClick={(e) => {
                        if (section !== 'Resume') {
                          e.preventDefault();
                          handleScroll(section.toLowerCase());
                        }
                      }}
                    >
                      {section}
                    </a>
                  </li>
                )
              )}
            </ul>
            <button
              className="p-2 text-white hover:text-white hover: md:hidden"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-screen placeholder-opacity-90 backdrop-blur-md' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="flex flex-col space-y-4 pt-4">
              {['Projects', 'Skills', 'Contact', 'Resume'].map((section) => (
                <button
                  key={section}
                  onClick={() =>
                    section === 'Resume'
                      ? window.open('/ParthMahaCV.pdf', '_blank')
                      : handleScroll(section.toLowerCase())
                  }
                  download={section === 'Resume' ? 'ParthMahaCV.pdf' : undefined}
                  className="px-3 py-2 rounded-lg transition-colors text-left text-gray-300 hover:text-white hover:bg-white/5"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 lg:px-8 pt-16 pb-8 md:pt-0"
        >
          <div className="max-w-6xl w-full grid lg:grid-cols-[2fr,1fr] gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                  Parth Maha
                </span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                I am a passionate developer and Computer Engineering student who
                loves creating solutions that improve user experiences. I enjoy
                using technology to solve real-world problems and always look
                for new ways to make my projects more creative and effective. My
                goal is to combine my technical skills with imaginative ideas to
                help shape the future of digital interactions.
              </p>
              <p className="text-xl font-semibold">
                Crafting projects, one line of code at a time ✨
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/parthmahaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                  View GitHub
                </a>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <a
                  href="https://www.instagram.com/parthmaha"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/parth-maha-8a3079200/"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://www.codechef.com/users/parthmaha"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="CodeChef"
                >
                  <SiCodechef className="w-6 h-6" />
                </a>
                <a
                  target="_blank"
                  href="https://leetcode.com/u/parthmaha/"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LeetCode"
                >
                  <TbBrandLeetcode className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="relative aspect-square max-w-[320px] mx-auto">
              <div className="inset-0 rounded-3xl overflow-hidden">
                <img
                  src={profile}
                  alt="profile"
                  width={650}
                  height={700}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-16 flex items-center justify-center sm:py-24 sm:px-6 lg:px-8"
        >
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-4xl sm:text-4xl md:text-5xl pb-8 font-bold text-center  sm:mb-12 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Projects
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative sm:p-6 max-h-[470px] bg-zinc-900 rounded-lg p-1 mb-2 shadow-md overflow-hidden transition-all duration-500 ease-in-out group">
                <img
                  src={Musafir}
                  alt="Project preview"
                  className="aspect-video w-full sm:h-48 h-48 object-cover rounded-md"
                />

                <div className="p-3">
                  <p className="text-2xl font-bold text-white transition duration-500 ease-out">
                    Musafir
                  </p>

                  <p className="text-base font-normal text-gray-300 leading-relaxed transition duration-500 ease-out mt-2">
                    Enhances travel experience by providing insights into hidden street food gems, cafes, and trending spots across the city.{' '}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2 mt-2.5">
                    <span className="px-3 py-1 text-sm bg-zinc-700 text-gray-300 rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 text-sm bg-zinc-700 text-gray-300 rounded-full">
                      Node.js
                    </span>
                    <span className="px-3 py-1 text-sm bg-zinc-700 text-gray-300 rounded-full">
                      Express
                    </span>
                    <span className="px-3 py-1 text-sm bg-zinc-700 text-gray-300 rounded-full">
                      MongoDB
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      target="_blank"
                      href="https://github.com/parthmahaa/musafir"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-200"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>Source code</span>
                    </a>

                    {/* <a
                      target="_blank"
                      href="#projects"
                      className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 group/demo"
                    >
                      <FaArrowUpRightFromSquare className="w-4 h-4 transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
                      <span>Live Demo</span>
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="relative sm:p-6 max-h-[470px] bg-zinc-900 rounded-lg p-1 mb-2 shadow-md overflow-hidden transition-all duration-500 ease-in-out group">
                <img
                  src={GeoPulse}
                  alt="Project preview"
                  className="aspect-video w-full sm:h-48 h-48 object-cover rounded-md"
                />

                <div className="p-3">
                  <p className="text-2xl font-bold text-white transition duration-500 ease-out">
                    GeoPulse
                  </p>

                  <p className="text-base font-normal text-gray-300 leading-relaxed transition duration-500 ease-out mt-2">
                    Automated attendance tracking app which will log a user's
                    attendance within 200m of proximity user's working space.{' '}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 mt-4">
                    <span className="px-3 py-1 text-sm bg-zinc-700 text-gray-300 rounded-full">
                      Flutter
                    </span>
                    <span className="px-3 py-1 text-sm bg-zinc-700 text-gray-300 rounded-full">
                      Firebase
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      target="_blank"
                      href="https://github.com/parthmahaa/Geo-Pulse"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-200"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>Source code</span>
                    </a>

                    {/* <a
                      target="_blank"
                      href="#projects"
                      className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 group/demo"
                    >
                      <FaArrowUpRightFromSquare className="w-4 h-4 transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
                      <span>Live Demo</span>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-16 flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Skills
            </h1>
            <p className="text-gray-300 pt-0 pb-8 text-lg leading-relaxed">
              Here are technologies and tools I work with:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Row 1 */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <FaReact className="w-16 h-16 mb-4 p-2 text-[#61DAFB]" />
                <span className="text-gray-300 text-lg">React</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <FaJsSquare className="w-16 h-16 mb-4 p-2 text-[#F7DF1E]" />
                <span className="text-gray-300 text-lg">JavaScript</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <FaHtml5 className="w-16 h-16 mb-4 p-2 text-[#E34F26]" />
                <span className="text-gray-300 text-lg">HTML</span>
              </div>

              {/* Row 2 */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <FaCss3Alt className="w-16 h-16 mb-4 p-2 text-[#1572B6]" />
                <span className="text-gray-300 text-lg">CSS</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <FaNodeJs className="w-16 h-16 mb-4 p-2 text-[#339933]" />
                <span className="text-gray-300 text-lg">Node.js</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <SiExpress className="w-16 h-16 mb-4 p-2 text-gray-300" />
                <span className="text-gray-300 text-lg">Express</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <SiMongodb className="w-16 h-16 mb-4 p-2 text-[#47A248]" />
                <span className="text-gray-300 text-lg">MongoDB</span>
              </div>

              {/* Row 3 */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <FaJava className="w-16 h-16 mb-4 p-2 text-[#007396]" />
                <span className="text-gray-300 text-lg">Java</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <SiFlutter className="w-16 h-16 mb-4 p-2 text-[#02569B]" />
                <span className="text-gray-300 text-lg">Flutter</span>
              </div>

              {/* Row 4 */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center aspect-square">
                <FaGitAlt className="w-16 h-16 mb-4 p-2 text-[#F05032]" />
                <span className="text-gray-300 text-lg">Git</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-16 flex items-center justify-center sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold sm:mb-12 text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Contact Me
            </h1>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-400">Surat Gujarat, India 395017</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                    <FaEnvelope className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center">
                    <a
                      href="mailto:parthmaha9@gmail.com"
                      className="text-gray-400 hover:underline"
                    >
                      <p className="text-gray-400">parthmaha9@gmail.com</p>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                    <FaPhone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center">
                    <a
                      href="tel:+919723459525"
                      className="text-gray-400 hover:underline"
                    >
                      <p className="text-gray-400">+91 9723459525</p>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
                <input
                  type="hidden"
                  name="access_key"
                  value="ef1dfb2c-ae23-4c35-b0cd-9658c9faaee7"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full p-3 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    className="w-full p-3 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <textarea
                  name="message"
                  required
                  placeholder="Write your message here"
                  rows={6}
                  className="w-full p-3 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  className="w-full p-3 rounded-md bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loader w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Submit Now'
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}