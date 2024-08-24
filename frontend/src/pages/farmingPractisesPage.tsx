import { AppBar } from '@/components/appbar'
import FarmingPractices from '@/components/farmingPractices'
import { Footer } from '@/components/footer'


export const FarmingPracticesPage = () => {
  return (
    <div>
      <AppBar/>
      <div className="h-16 w-full">
                {/* empty space */}
            </div>
        <FarmingPractices/>
        <Footer/>
    </div>
  )
}
