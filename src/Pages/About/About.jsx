import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./about.css";
import { 
  FaForumbee, 
  FaRocketchat, 
  FaUsers, 
  FaCalendarAlt, 
  FaBook, 
  FaLaptopCode,
  FaDiscord,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaSlack
} from "react-icons/fa";
import { GrResources } from "react-icons/gr";

function About() {
  const Sections = [
    { icon: <FaForumbee />, title: "Forums & Discussions", description: "Ask questions, share code, and exchange ideas." },
    { icon: <GrResources />, title: "Resources & Guides", description: "Tutorials, tools, and learning paths." },
    { icon: <FaRocketchat />, title: "Chat & Meetups", description: "Stay connected through online and offline community events." }
  ];

  const [index, setIndex] = useState(0);



  // Sample forum topics
  const popularTopics = [
    { title: "Best practices for React performance optimization", replies: 42, category: "Frontend" },
    { title: "Getting started with Python data analysis", replies: 28, category: "Data Science" },
    { title: "Deploying containers in production environments", replies: 35, category: "DevOps" }
  ];

  return (
    <div className="connectContainer">
      {/* Hero Section */}
      <section className="hero">
        <h1>Where Developers Connect, Build, and Grow.</h1>
        <div className="intro">
          <p>
            Welcome to XDevs Code Hub, a space built for developers, learners, and tech enthusiasts who believe in
            the power of community. Whether you're a beginner or pro, you'll find support, mentorship, and collaboration opportunities here.
          </p>
        </div>
        <div className="cta-buttons">
          <button className="btn-primary">Join Our Community</button>
          <button className="btn-secondary">Explore Resources</button>
        </div>
      </section>

      {/* Features Carousel */}
      <section className="features-section">
        <h2>Community Features</h2>
        <div className="carouselWrap">
          <Carousel
            selectedItem={index}
            onChange={(i) => setIndex(i)}
            autoPlay
            infiniteLoop
            interval={4000}
            transitionTime={1000}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            swipeable
            emulateTouch
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev ? (
                <button className="custom-arrow prev" onClick={onClickHandler} aria-label="Previous slide">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ) : null
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext ? (
                <button className="custom-arrow next" onClick={onClickHandler} aria-label="Next slide">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ) : null
            }
          >
            {Sections.map((section, i) => (
              <div key={i} className="slideCard">
                <div className="icon">{section.icon}</div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            ))}
          </Carousel>

          {/* CUSTOM DOTS */}
          <div className="custom-dots">
            {Sections.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="stats-section">
        <h2>Our Growing Community</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <FaUsers className="stat-icon" />
            <h3>10,000+</h3>
            <p>Active Developers</p>
          </div>
          <div className="stat-item">
            <FaLaptopCode className="stat-icon" />
            <h3>2,500+</h3>
            <p>Projects Shared</p>
          </div>
          <div className="stat-item">
            <FaBook className="stat-icon" />
            <h3>500+</h3>
            <p>Learning Resources</p>
          </div>
          <div className="stat-item">
            <FaCalendarAlt className="stat-icon" />
            <h3>120+</h3>
            <p>Events Yearly</p>
          </div>
        </div>
      </section>
      {/* Forum Highlights */}
      <section className="forum-section">
        <h2>Popular Discussion Topics</h2>
        <div className="topics-list">
          {popularTopics.map((topic, index) => (
            <div key={index} className="topic-item">
              <div className="topic-content">
                <h3>{topic.title}</h3>
                <div className="topic-meta">
                  <span className="topic-category">{topic.category}</span>
                  <span className="topic-replies">{topic.replies} replies</span>
                </div>
              </div>
              <button className="topic-join">Join Discussion</button>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <button className="btn-primary">Visit Forums</button>
        </div>
      </section>

      {/* Social Connections */}
      <section className="social-section">
        <h2>Connect With Us Everywhere</h2>
        <p>Join the conversation on your favorite platforms</p>
        <div className="social-grid">
          <a href="#" className="social-card">
            <FaDiscord className="social-icon" />
            <h3>Discord</h3>
            <p>Real-time chat with community members</p>
          </a>
          <a href="#" className="social-card">
            <FaTwitter className="social-icon" />
            <h3>Twitter</h3>
            <p>Updates, announcements, and tech news</p>
          </a>
          <a href="#" className="social-card">
            <FaLinkedin className="social-icon" />
            <h3>LinkedIn</h3>
            <p>Professional networking and opportunities</p>
          </a>
          <a href="#" className="social-card">
            <FaGithub className="social-icon" />
            <h3>GitHub</h3>
            <p>Open source projects and collaboration</p>
          </a>
          <a href="#" className="social-card">
            <FaSlack className="social-icon" />
            <h3>Slack</h3>
            <p>Topic-based channels and networking</p>
          </a>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Get the latest community news, event invites, and resources delivered to your inbox.</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              aria-label="Email for newsletter subscription"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default About;
