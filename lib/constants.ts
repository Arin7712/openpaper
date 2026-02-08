export const navItems = [
    {
        title: 'Papers',
        href: '/papers'
    },
    {
        title: 'About',
        href: '/about'
    },
    {
        title: 'Contact',
        href: '/contact'
    }
]

export const dataItems = [
    {
        id: 1,
        title: "AI Research Papers",
        description:"These are AI research papers from various journals.",
        href: "/papers/1"
    },
    {
        id: 2,
        title: "Computer Science Papers",
        description:"These are computer science research papers from various journals.",
        href: "/papers/2"
    },
    {
        id: 3,
        title: "Physics Papers",    
        description:"These are physics research papers from various journals.",
        href: "/papers/3"

    },
    {
        id: 4,
        title: "Biology Papers",
        description:"These are biology research papers from various journals.",
        href: "/papers/4"

    },
    {
        id: 5,
        title: "Chemistry Papers",
        description:"These are chemistry research papers from various journals.",
        href: "/papers/5"

    },
    {
        id:6,
        title: "Computer Engineering",
        description:"These are computer engineering research papers from various journals, semiconductors.",
        href: "/papers/6"
    }

]



export function searchItems(items: any[], query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return items

  return items
    .map(item => {
      let score = 0

      if (item.title.toLowerCase().includes(q)) score += 2
      if (item.abstract.toLowerCase().includes(q)) score += 1

      return score > 0 ? { ...item, score } : null
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
}

export const categories = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
  "Computer Vision",
  "Natural Language Processing",
  "Robotics",
  "Physics",
  "Astrophysics",
  "Quantum Computing",
  "Mathematics",
  "Statistics",
  "Biology",
  "Neuroscience",
  "Chemistry",
  "Materials Science",
  "Healthcare",
  "Bioinformatics",
  "Economics",
  "Finance",
  "Climate Science",
]