import { AppBar } from "../components/appbar"
import { BarGraph } from "../components/bargraph"
import MySelect from "../components/selectcomponent";

export const Trends = () => {
    return (
        <div className="h-dvh w-full">
            <AppBar />
            {/* banner */}
            <div className="bg-gray-100 w-full h-1/3 p-10">
                <div className="flex justify-center items-center">
                    <h1 className="text-5xl font-medium flex justify-content itmes-center">
                        "PLANTING KNOWLEDGE HARVESTING EMPOWERMENT"
                    </h1>
                </div>
                <div className="p-10 text-xl">
                    <h1 className="flex justify-center items-center">
                        Welcome to the Market Trends page, your gateway to a wealth of insights that can revolutionize your farming strategy.
                    </h1>
                    <h1 className="flex justify-center items-center">
                        Stay ahead of the curve by delving into historical data and understanding the dynamic shifts in crop prices
                    </h1>
                </div>
            </div>
            {/* bargraph */}
            <div className="w-full h-5/6">
                <BarGraph />
            </div>
            <MySelect/>
            {/* <div className="flex items-center justify-around">
               
                <div>
                    Monthly crop production data in tons.
                </div>
            </div> */}


          
            

        </div>
    )
}
