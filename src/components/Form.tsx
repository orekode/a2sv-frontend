import { type ReactNode } from "react"


const Form = ({title, trigger, setTrigger, children} : {title: string, trigger: boolean, setTrigger: any, children: ReactNode}) => {


if(trigger)
  return (

    <div className="fixed top-0 left-0 h-screen w-screen backdrop-blur z-50 max-content">
        <div onClick={setTrigger} className="absolute top-0 left-0 h-full w-full bg-white opacity-20 z-0"></div>

        <div className="relative bg-white rounded-xl z-10 p-10 max-w-[660px] mx-auto">
            <div className="h3 text-3xl text-center pb-6 font-medium text-orange-500">{title}</div>

            <div className="content flex flex-col gap-4">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Form