import { Nav, ProductGrid, Search } from '@/components'



const Home = () => {


  return (
    <div>
      <Nav />



      <section className="header bg-orange-400 overflow-hidden relative z-10">
        <div className="max-w max-content relative">


          <div className="content-area text-white relative z-50">

            <h1 className="title text-7xl font-semibold">
              Are you starving?
            </h1>

            <p className='my-6'>Within a few clicks, find meals that are accessible near you</p>

            <Search />
          </div>


          <div className="absolute -bottom-10 right-0 h-[400px] w-[400px]">
            <img src="/images/image.png" className="h-full w-full object-contain " />
          </div>

          
        </div>
      </section>

      <section>
        <div className="max-w max-content relative">
          <div className="title text-center">
            <h2 className='text-3xl font-medium'>Featured Meals</h2>
          </div>

          <ProductGrid />
        </div>
      </section>

    </div>
  )
}

export default Home