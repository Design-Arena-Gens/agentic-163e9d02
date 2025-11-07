'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface NewsArticle {
  id: string
  title: string
  description: string
  source: string
  category: string
  publishedAt: string
  url: string
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      setNews(data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'technology', 'business', 'health', 'science', 'sports', 'entertainment']

  const filteredNews = selectedCategory === 'all'
    ? news
    : news.filter(article => article.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>📰 Today's News</h1>
          <p className={styles.subtitle}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </header>

        <div className={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading latest news...</p>
          </div>
        ) : (
          <div className={styles.newsGrid}>
            {filteredNews.map((article) => (
              <article key={article.id} className={styles.newsCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.category}>{article.category}</span>
                  <span className={styles.source}>{article.source}</span>
                </div>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.description}>{article.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.date}>{formatDate(article.publishedAt)}</span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.readMore}
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredNews.length === 0 && (
          <div className={styles.noNews}>
            <p>No news articles found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
