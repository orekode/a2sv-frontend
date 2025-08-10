import { useState } from 'react'
import AddForm from './AddForm';

const Nav = () => {
    const [ add, setAdd ] = useState<boolean>(false);

  return (
    <div className='relative z-50'>
        <div className="flex items-center justify-between max-w py-3">
            <div className="logo flex items-center">
                <div className="icon"></div>
                <div className="name font-black text-xl">
                    <span className="text-orange-600">Food</span>
                    <span className="text-orange-400">Wagen</span>
                </div>
            </div>


            <button onClick={() => setAdd(!add)} className="button bg-orange-400 text-white">
                Add Meal
            </button>

        </div>
        <AddForm trigger={add} setTrigger={() => setAdd(!add)} />
    </div>
  )
}

export default Nav