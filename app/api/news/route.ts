import { NextResponse } from 'next/server'

interface NewsArticle {
  id: string
  title: string
  description: string
  source: string
  category: string
  publishedAt: string
  url: string
}

const generateMockNews = (): NewsArticle[] => {
  const categories = ['technology', 'business', 'health', 'science', 'sports', 'entertainment']
  const sources = ['Reuters', 'AP News', 'Bloomberg', 'TechCrunch', 'The Guardian', 'BBC News', 'CNN', 'Financial Times']

  const newsTemplates = [
    {
      category: 'technology',
      items: [
        { title: 'AI Breakthrough: New Model Achieves Human-Level Performance in Complex Tasks', description: 'Researchers unveil a revolutionary artificial intelligence system that demonstrates unprecedented capabilities in reasoning and problem-solving across multiple domains.' },
        { title: 'Major Tech Company Announces Next-Generation Smartphone with Advanced Features', description: 'The latest flagship device promises enhanced performance, improved battery life, and cutting-edge camera technology that sets new industry standards.' },
        { title: 'Cybersecurity Alert: New Vulnerability Discovered in Popular Software', description: 'Security experts warn users to update their systems immediately after a critical flaw was found that could compromise sensitive data.' },
        { title: 'Space Technology Advances: Private Company Successfully Tests New Rocket Engine', description: 'The successful test marks a significant milestone in the development of next-generation space transportation systems.' },
      ]
    },
    {
      category: 'business',
      items: [
        { title: 'Global Markets Rally on Positive Economic Indicators', description: 'Stock markets around the world see significant gains as investors respond to encouraging data about economic growth and corporate earnings.' },
        { title: 'Major Merger Announced Between Industry Giants', description: 'Two leading companies in their sector reveal plans to combine operations in a deal valued at billions of dollars.' },
        { title: 'Startup Raises Record Funding in Latest Investment Round', description: 'A promising young company secures massive capital injection from prominent venture capital firms to fuel expansion plans.' },
        { title: 'Economic Report Shows Unexpected Growth in Key Sectors', description: 'Latest government data reveals stronger than anticipated performance in manufacturing and services industries.' },
      ]
    },
    {
      category: 'health',
      items: [
        { title: 'Medical Breakthrough: New Treatment Shows Promise for Chronic Disease', description: 'Clinical trials demonstrate significant improvements in patient outcomes using innovative therapeutic approach that targets underlying causes.' },
        { title: 'Public Health Officials Announce New Guidelines for Disease Prevention', description: 'Updated recommendations aim to improve community health outcomes based on latest scientific research and evidence.' },
        { title: 'Study Reveals Surprising Benefits of Common Lifestyle Changes', description: 'Long-term research project uncovers unexpected positive health impacts from simple modifications to daily routines.' },
        { title: 'Hospital Systems Adopt Advanced Technology to Improve Patient Care', description: 'Healthcare providers implement cutting-edge systems that enhance diagnostic accuracy and treatment effectiveness.' },
      ]
    },
    {
      category: 'science',
      items: [
        { title: 'Scientists Make Unexpected Discovery About Climate Patterns', description: 'Research team uncovers new insights into atmospheric phenomena that could improve long-term weather forecasting accuracy.' },
        { title: 'Archaeological Find Reveals Clues About Ancient Civilization', description: 'Excavation team unearths remarkable artifacts that shed light on previously unknown aspects of historical society.' },
        { title: 'Physics Experiment Challenges Long-Held Scientific Theory', description: 'Surprising results from particle accelerator tests prompt scientists to reconsider fundamental assumptions about matter and energy.' },
        { title: 'Marine Biologists Identify New Species in Deep Ocean Exploration', description: 'Underwater expedition discovers previously unknown creatures adapted to extreme conditions in ocean depths.' },
      ]
    },
    {
      category: 'sports',
      items: [
        { title: 'Underdog Team Secures Stunning Victory in Championship Match', description: 'Against all odds, the lower-ranked squad delivers an impressive performance to claim unexpected title win.' },
        { title: 'Star Athlete Breaks Long-Standing Record in Remarkable Performance', description: 'Exceptional display of skill and determination leads to historic achievement that surpasses decades-old mark.' },
        { title: 'Major Sports League Announces Significant Rule Changes for Upcoming Season', description: 'Officials unveil modifications designed to improve game flow and enhance competitive balance among teams.' },
        { title: 'International Tournament to Feature Expanded Format with More Teams', description: 'Organizers reveal plans for larger competition that will include additional nations and extended schedule.' },
      ]
    },
    {
      category: 'entertainment',
      items: [
        { title: 'Highly Anticipated Film Breaks Box Office Records on Opening Weekend', description: 'The blockbuster release exceeds expectations with massive ticket sales and enthusiastic audience reception worldwide.' },
        { title: 'Award-Winning Director Announces Ambitious New Project', description: 'Acclaimed filmmaker reveals details about upcoming production that promises to push creative boundaries in storytelling.' },
        { title: 'Popular Streaming Series Renewed for Multiple Additional Seasons', description: 'Strong viewership numbers and critical acclaim prompt platform to commit to extended continuation of hit show.' },
        { title: 'Music Festival Lineup Revealed with Diverse Array of Top Artists', description: 'Event organizers announce impressive roster of performers spanning multiple genres for upcoming summer celebration.' },
      ]
    }
  ]

  const articles: NewsArticle[] = []

  newsTemplates.forEach(({ category, items }) => {
    items.forEach((item, index) => {
      const hoursAgo = Math.floor(Math.random() * 12)
      const publishedAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()

      articles.push({
        id: `${category}-${index}-${Date.now()}`,
        title: item.title,
        description: item.description,
        source: sources[Math.floor(Math.random() * sources.length)],
        category,
        publishedAt,
        url: `https://example.com/news/${category}/${index}`
      })
    })
  })

  return articles.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function GET() {
  try {
    const news = generateMockNews()
    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
