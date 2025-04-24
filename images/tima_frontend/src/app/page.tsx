'use client';
import styles from './home.module.css';
import '@/lib/fontawesome';

export default function HomePage() {
  return (
    <div>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to <span>Tech Tima</span></h1>
        <p className={styles.subtitle}>Modern Fullstack App with Next.js + Django</p>
      </section>

      <section className={styles.stats}>
        <div className={styles.card}>
          <h2>🚀 Fast</h2>
          <p>Blazing fast frontend with Next.js</p>
        </div>
        <div className={styles.card}>
          <h2>🔒 Secure</h2>
          <p>Secure APIs powered by Django + DRF</p>
        </div>
        <div className={styles.card}>
          <h2>📈 Scalable</h2>
          <p>Ready for production & growth</p>
        </div>
      </section>

      <section className={styles.visuals}>
        <div className={styles.block + ' ' + styles.slideInLeft}>
          <img src="https://placehold.co/300x200" alt="placeholder" />
          <p>Modular Frontend Architecture</p>
        </div>
        <div className={styles.block + ' ' + styles.slideInRight}>
          <img src="https://placehold.co/300x200" alt="placeholder" />
          <p>Modern API Integration</p>
        </div>
      </section>

      <section className={styles.callToAction}>
        <h2>Ready to build?</h2>
        <p>Start coding now and scale your dream project.</p>
        <button>Get Started</button>
      </section>
    </div>
  );
}
