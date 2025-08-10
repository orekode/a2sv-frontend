import { Bike, Search, ShoppingBag } from "lucide-react";


const SearchBox = () => {

  const tabItems = [
    {
      name: "Delivery",
      icon:  <Bike size={20}/>
    },
    {
      name: "Pickup",
      icon:  <ShoppingBag size={20}/>
    },
  ]

  return (
    <div className="search-box max-w-[800px]">
      <div className="content-area rounded-xl bg-white text-gray-700">
        <div className="top-tab flex items-center p-4 border-b">
          {tabItems.map( (item, index) => 
            <div key={index} className="tab flex items-center gap-1.5 px-6 py-2 rounded-xl button hover:bg-orange-200 bg-white hover:text-orange-600">
              <div className="icon">{item.icon}</div>
              <div className="name font-bold">{item.name}</div>
            </div>
          )}
        </div>

        <div className="input-area p-4 ">
          <div className="flex gap-3 h-[50px]">
            <div className="flex-grow flex h-full relative">
              <input type="text" name="search" className="input h-full p-3 pl-10" />
              <div className="absolute top-1/2  -translate-y-1/2 px-3 left-0 text-orange-600">
                <Search size={20}/>
              </div>
            </div>
            <div className=" h-full">
              <button className="button bg-gradient-to-r from-orange-400 to-orange-600 text-white flex items-center justify-center gap-1.5 h-full w-full interact">
                <Search size={20}/>
                <span className='font-bold text-lg'>Find Meal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default SearchBox;