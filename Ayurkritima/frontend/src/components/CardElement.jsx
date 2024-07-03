import React from 'react';
import './YourComponent.css'; // Import your CSS file

const Article = ({ title, imageUrl, content }) => (
  <article>
    <div className="article-wrapper">
      <figure>
        <img src={imageUrl} alt="" />
      </figure>
      <div className="article-body">
        <h2>{title}</h2>
        <p>{content}</p>
        <a href="#" className="read-more">
          Read more <span className="sr-only">about {title}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
);

const ArticleList = () => (
  <section className="articles">
    <Article
      title="Holistic Approach to Health"
      imageUrl="https://i.ibb.co/F0tdDKh/Health-Graphic-CMYK-660x900.png"
      content=" Ayurvedic medicine takes a holistic approach to health, considering the interconnectedness of the body, mind, and spirit. It focuses on balancing the three doshas (Vata, Pitta, and Kapha), which are believed to govern various physiological and psychological functions."
    />
    <Article
      title="Natural Remedies"
      imageUrl="https://i.ibb.co/Ws4jdzV/shutterstock-492318838-scaled.jpg"
      content="Ayurvedic medications often rely on natural ingredients such as herbs, minerals, and other plant-based substances. Many Ayurvedic remedies are derived from nature and have been used for centuries in traditional healing practices."
    />
    <Article
      title="Stress Management and Mental Health"
      imageUrl="https://i.ibb.co/GsFY4PR/Woman-meditating-1600x-jpg.webp"
      content="Ayurveda places a significant emphasis on mental health and stress reduction. Practices such as meditation, yoga, and specific Ayurvedic therapies aim to balance the mind and promote emotional well-being."
    />
  </section>
);

export default ArticleList;
