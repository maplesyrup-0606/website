import { CONTENT } from '../data/content';
import styles from './SectionPanel.module.css';

export default function SectionPanel({ sectionId, onClose }) {
  const content = CONTENT[sectionId];
  if (!content) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.panel} ${sectionId === 'resume' ? styles.panelResume : ''}`}
        style={{ '--color': content.color }}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span className={styles.title} style={{ color: content.color }}>
            {content.title}
          </span>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <div className={sectionId === 'resume' ? styles.bodyResume : styles.body}>
          {sectionId === 'about'    && <AboutContent    content={content} />}
          {sectionId === 'projects' && <ProjectsContent content={content} />}
          {sectionId === 'mycats'   && <CatsContent     content={content} />}
          {sectionId === 'contact'  && <ContactContent  content={content} />}
          {sectionId === 'resume'   && <ResumeContent />}
          {sectionId === 'skills'   && <SkillsContent   content={content} />}
        </div>
      </div>
    </div>
  );
}

function AboutContent({ content }) {
  return <p className={styles.bodyText}>{content.body}</p>;
}

function ProjectsContent({ content }) {
  return (
    <ul className={styles.projectList}>
      {content.items.map((item, i) => (
        <li key={i} className={styles.projectItem}>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.projectName}>
            ▶ {item.name}
          </a>
          <p className={styles.projectDesc}>{item.desc}</p>
        </li>
      ))}
    </ul>
  );
}

function ContactContent({ content }) {
  return (
    <ul className={styles.contactList}>
      {content.items.map((item, i) => (
        <li key={i} className={styles.contactItem}>
          <span className={styles.contactLabel}>{item.name}</span>
          <a
            href={item.url}
            target={item.url.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function CatsContent({ content }) {
  return (
    <div className={styles.catsWrapper}>
      {content.cats.map((cat) => (
        <div key={cat.name} className={styles.catCard}>
          <span className={styles.catName} style={{ color: content.color }}>{cat.name}</span>
          <img src={cat.img} alt={cat.name} className={styles.catImg} />
        </div>
      ))}
    </div>
  );
}

function ResumeContent() {
  return (
    <iframe
      src="/resume.pdf"
      className={styles.resumeFrame}
      title="Mercury McIndoe Resume"
    />
  );
}

function SkillsContent({ content }) {
  return (
    <div className={styles.skillsWrapper}>
      {content.groups.map((g, i) => (
        <div key={i} className={styles.skillGroup}>
          <span className={styles.skillGroupLabel}>{g.label}</span>
          <p className={styles.skillItems}>{g.items}</p>
        </div>
      ))}
    </div>
  );
}
