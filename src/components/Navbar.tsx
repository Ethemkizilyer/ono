import {PhotoIcon,BellIcon} from '@heroicons/react/24/outline';

const Navbar = () => {

  return (
    <div className="mb-4 flex gap-4">
    <div className="flex w-3/4 flex-col">
      <p className="mb-4 ml-2  w-3/4 font-extrabold">Welcome Amanda</p>
      <p className="ml-2  w-3/4 text-xs font-extralight text-black/9">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
    <div className="flex w-1/4 justify-end gap-2">
      <BellIcon className="h-7 w-7 rounded-lg border border-slate-300 p-1 text-[#bdbcbc]" />
      <PhotoIcon className="h-7 w-7 rounded-lg bg-[#d9d9d9] p-1" />
    </div>
  </div>

   
  )
}

export default Navbar