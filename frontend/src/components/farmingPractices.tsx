import { useEffect, useRef, useState } from 'react'
import { Leaf } from "lucide-react"

interface FarmingPractice {
  title: string;
  description: string;
  link: string;
}

const farmingPractices: FarmingPractice[] = [
  {
    title: "Soil Preparation",
    description: "Prepare soil by tilling, adding organic matter, and balancing pH levels.",
    link: "/soil-preparation"
  },
  {
    title: "Crop Rotation",
    description: "Rotate crops to improve soil health and reduce pest and disease problems.",
    link: "/crop-rotation"
  },
  {
    title: "Water Management",
    description: "Implement efficient irrigation systems and water conservation techniques.",
    link: "/water-management"
  },
  {
    title: "Integrated Pest Management",
    description: "Use a combination of biological, cultural, and chemical methods to control pests.",
    link: "/pest-management"
  },
  {
    title: "Sustainable Fertilization",
    description: "Apply organic fertilizers and practice precision nutrient management.",
    link: "/fertilization"
  },
  {
    title: "Harvest and Post-Harvest Handling",
    description: "Properly time harvest and implement good post-harvest practices to reduce losses.",
    link: "/harvest-handling"
  }
]

export default function Component() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [leafPosition, setLeafPosition] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const practiceElements = timeline.querySelectorAll('.practice-point')
    const practicePositions = Array.from(practiceElements).map(el => el.getBoundingClientRect().top + window.scrollY - timeline.getBoundingClientRect().top)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2 - timeline.getBoundingClientRect().top
      let newPosition = practicePositions[0]
      let newActiveStep = 0

      for (let i = 0; i < practicePositions.length; i++) {
        if (scrollPosition >= practicePositions[i]) {
          newPosition = practicePositions[i]
          newActiveStep = i
        } else {
          break
        }
      }

      setLeafPosition(newPosition)
      setActiveStep(newActiveStep)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Best Farming Practices Timeline</h2>
      <div className="relative" ref={timelineRef}>
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
          <div className="w-1 bg-green-200 h-full"></div>
        </div>
        {farmingPractices.map((practice, index) => (
          <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <div className="order-1 w-5/12"></div>
            <div 
              className={`z-20 flex items-center order-1 shadow-xl w-8 h-8 rounded-full practice-point
                          ${activeStep >= index ? 'bg-green-600' : 'bg-green-200'}
                          transition-colors duration-300`}
              aria-current={activeStep === index ? 'step' : undefined}
            >
              <span className={`mx-auto font-semibold text-lg ${activeStep >= index ? 'text-white' : 'text-green-600'}`}>{index + 1}</span>
            </div>
            <div 
              className={`order-1 rounded-lg shadow-xl w-5/12 px-6 py-4
                          ${activeStep === index ? 'bg-green-50' : 'bg-white'}
                          transition-colors duration-300`}
            >
              <h3 className="mb-3 font-bold text-gray-800 text-xl">{practice.title}</h3>
              <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">{practice.description}</p>
              <a 
                href={practice.link}
                className="mt-4 inline-block text-green-500 hover:text-green-600 transition-colors duration-200"
                aria-label={`Learn more about ${practice.title}`}
              >
                Learn more
              </a>
            </div>
          </div>
        ))}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out"
          style={{ top: `${leafPosition}px` }}
          aria-hidden="true"
        >
          <Leaf className="w-12 h-12 text-green-500" />
        </div>
      </div>
    </div>
  )
}