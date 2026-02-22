import React, { useEffect, useState } from 'react'
import Player from '../components/Player'
import { IoSearch } from "react-icons/io5";
import { songsData } from '../songs';
import Card from '../components/Card';
function Search() {

  let [input, setInput] = useState("")
  let [newList, setnewList] = useState([])

  useEffect(() => {
  const value = input.toLowerCase()

  const filtered = songsData.filter(song =>
    song.name.toLowerCase().includes(value) ||
    song.singer.toLowerCase().includes(value)
  )

  setnewList(filtered)
}, [input])


  return (
    <div className=' w-[100%] h-[100vh] bg-black flex justify-start items-center flex-col pt-[20px] md:pt-[100px] gap-[30px]'>
      <Player />
      <form action="" className='w-[90%] md:w-[60%] h-[60px] bg-gray-800 flex justify-center items-center gap-5 rounded-lg overflow-hidden p-[15px] md:p-0' onSubmit={(e) => {
        e.preventDefault()
      }}>


        <IoSearch className='text-gray-200 text-[18px]' />
        <input type="text" className='w-[90%] h-[100%] bg-gray-800 outline-none border-0 text-white p-[10px] text-[18px]' placeholder='Search songs...' onChange={(e) => setInput(e.target.value)} value={input} />

      </form>

      {input ? <div className='w-[100%] h-[65%] md:h-[100%] flex flex-col justify-start p-[10px] items-center gap-5 overflow-auto'>

        {newList.map((song) => (
          <Card 
          key={song.id}
          name={song.name}
           image={song.image}
            singer={song.singer}
             songIndex={song.id - 1} />
        ))}

      </div> : <div className='text-gray-700 text-[30px] font-semibold'>Search Songs</div>}

    </div>
  )
}

export default Search
