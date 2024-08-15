
export const AppBar = () => {
  return (
    <>
        <div className="flex justify-between items-center p-5 bg-green-600">
            <div className="ml-4">
                AGRO
            </div>
            <div className="flex jutify-between items-center mr-5 text-white">
                    <a className="px-10" href="/home">HOME</a>
                    <a href="/trends">MARKET TRENDS</a>  
            </div>

        </div>
    </>
    
  )
}
