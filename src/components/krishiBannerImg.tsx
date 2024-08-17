import BannerImage from "../assets/images/chalja.jpg.webp";
export const KrishiBannerImg = () => {
  return (
    <div className="w-full h-5/6 bg-gray-100">
        <div className="relative object-center w-full h-full flex justify-center items-center">
          <img className="h-full w-full" src={BannerImage} alt="/image" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-white text-xl font-semibold mb-20">
          <div className="flex items-center justify-center">
          <h1 className="text-9xl text-amber-200">Unlock </h1><h1 className="mt-5 text-6xl px-2">smarter farming</h1>
          </div>
          <div className="m-5 flex items-center justify-center">
            Let <h1 className="text-amber-300 text-3xl font-black p-1 mx-2">कृषि</h1> AI guide your crop choices, maximize your profits, and minimize risks.
          </div>
           
        </div>
    </div>
  )
}
