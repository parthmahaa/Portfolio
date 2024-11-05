import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

export default function Component() {
  const [activeSection, setActiveSection] = useState('home');

  const iconStyle = {
    color: '#A99FF8', // Customize this color to match the icon color in the image
    fontSize: '24px',
    marginRight: '10px',
  };

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

  const FloatingSquare = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-16 h-16 bg-gray-800 rounded-lg opacity-30"
      animate={{
        y: [0, -100, 0],
        x: [0, 50, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );

  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "ef1dfb2c-ae23-4c35-b0cd-9658c9faaee7");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      alert("Form submitted")
      event.target.reset();
      console.log("data sent");
    } else {
      console.log("Error", data);
      alert("Error, Try again");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Squares */}
      <div className="fixed inset-0 -z-10">
        <FloatingSquare delay={0} />
        <FloatingSquare delay={5} />
        <FloatingSquare delay={10} />
        <FloatingSquare delay={15} />
      </div>
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/50 backdrop-blur-sm rounded-full w-1/2">
        <div className="mx-auto px-4">
          <ul className="flex justify-center space-x-8 py-2">
            {['Home', 'Projects', 'Skills', 'Contact'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`text-lg bg-transparent capitalize transition-colors ${
                    activeSection === section
                      ? 'text-blue-500'
                      : 'text-white hover:text-blue-300'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${section}`)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="Home"
        className="min-h-screen  flex items-center justify-center px-4 lg:px-8"
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
              Meet Parth, a passionate developer and Computer Engineering
              student. As a dedicated developer, Parth is committed to building
              creative solutions and enhancing user experiences.
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
                aria-label="Link"
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
                aria-label="GitHub"
              >
                <SiCodechef className="w-6 h-6" />
              </a>
              <a
                target="_blank"
                href="https://leetcode.com/u/parthmaha/"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <TbBrandLeetcode className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="relative aspect-square max-w-[300px] mx-auto">
            <div className="inset-0 rounded-3xl overflow-hidden">
              <img
                src={profile}
                alt="profile"
                width={600}
                height={600}
                className="object-cover "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="Projects"
        className="min-h-screen w-full py-24 flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center pb-10 mb-12 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative max-h-[470px] bg-zinc-900 rounded-lg p-6 mb-4 shadow-md overflow-hidden transition-all duration-500 ease-in-out group">
              <img
                src={Musafir}
                alt="Project preview"
                className="aspect-video w-full h-48 object-cover rounded-md"
              />

              <div className="p-3">
                <p className="text-2xl font-bold text-white transition duration-500 ease-out">
                  Musafir
                </p>

                <p className="text-base font-normal text-gray-300 leading-relaxed transition duration-500 ease-out mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quaerat veritatis nobis saepe itaque rerum nostrum aliquid.
                </p>

                <div className="flex flex-wrap gap-2 mb-4 mt-4">
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

                <a
                  href="https://github.com/parthmahaa/musafir"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-200"
                >
                  <FaGithub className="w-5 h-5" />
                  <span>Source code</span>
                </a>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-[#6293c8] to-[#384c6c] opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-out flex items-center justify-center">
                <a
                  href="https://github.com/parthmahaa/musafir"
                  target="_blank"
                  className="text-white text-lg font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out"
                >
                  Visit Project <GoArrowUpRight className="w-5 h-5" />
                </a>
              </div>

              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-tr from-[#6293c8] to-[#384c6c] rounded-bl-3xl flex items-center justify-center">
                <div className="text-white font-bold text-lg -mt-1 -mr-1">
                  →
                </div>
              </div>
            </div>
            <div className="relative max-h-[470px] bg-zinc-900 rounded-lg p-6 mb-4 shadow-md overflow-hidden transition-all duration-500 ease-in-out group">
              <img
                src={GeoPulse}
                alt="Project preview"
                className="aspect-video w-full h-48 object-cover rounded-md"
              />

              <div className="p-3">
                <p className="text-2xl font-bold text-white transition duration-500 ease-out">
                  GeoPulse
                </p>

                <p className="text-base font-normal text-gray-300 leading-relaxed transition duration-500 ease-out mt-2">
                  An automated attendance tracking app which will log a user's
                  attendance within 200m of proximity user's working space.
                </p>

                <div className="flex flex-wrap gap-2 mb-4 mt-4">
                  <span className="px-3 py-1 text-sm bg-zinc-700 text-gray-300 rounded-full">
                    Flutter
                  </span>
                  <span className="px-3 py-1 text-sm bg-zinc-700 text-gray-300 rounded-full">
                    Firebase
                  </span>
                </div>

                <a
                  href="https://github.com/parthmahaa/Geo-Pulse"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-200"
                >
                  <FaGithub className="w-5 h-5" />
                  <span>Source code</span>
                </a>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-[#6293c8] to-[#384c6c] opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-out flex items-center justify-center">
                <a
                  href="https://github.com/parthmahaa/Geo-Pulses"
                  target="_blank"
                  className="text-white text-lg font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out"
                >
                  Visit Project <GoArrowUpRight className="w-5 h-5" />
                </a>
              </div>

              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-tr from-[#3b82f6] to-[#384c6c] rounded-bl-3xl flex items-center justify-center">
                <div className="text-white font-bold text-lg -mt-1 -mr-1">
                  →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="Skills"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Skills
          </h1>
          <p className="text-gray-300 pt-0 pb-4 text-lg leading-relaxed">
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
              <SiSpringboot className="w-16 h-16 mb-4 p-2 text-[#6DB33F]" />
              <span className="text-gray-300 text-lg">Spring Boot</span>
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

      {/* CV Section */}
      <section
        id="Contact"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="max-w-6xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
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
                  <p className="text-gray-400">Surat Gujarat,India 395017</p>
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
            <form className="space-y-4" onSubmit={onSubmit}>
            <input type="hidden" name="access_key" value="ef1dfb2c-ae23-4c35-b0cd-9658c9faaee7"></input>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
                <input
                  type="text"
                  required
                  name="subject"
                  placeholder="Subject"
                  className="w-full p-3 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400"
                />
              
              <textarea
                name="message"
                required
                placeholder="Write your message here"
                rows={6}
                className="w-full p-3 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="w-full p-3 rounded-md bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
