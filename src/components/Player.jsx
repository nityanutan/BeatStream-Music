import React, { useContext } from 'react'
import { songsData } from '../songs'
import { datacontext } from '../context/UserContext'
import { IoPlay } from "react-icons/io5";
import { MdOutlinePause } from "react-icons/md";
function Player() {
  let { playingSong, playSong, pauseSong, index } = useContext(datacontext)
  return (
    <div className='w-[100%] md:w-[60%] h-[100px] bg-white fixed  bottom-[55px] md:bottom-0 rounded-t-[30px] shadow-lg flex pt-[10px] md:items-center md:p-20px'>
      <div className='flex justify-start items-start gap-[20px] w-[80%] h-[100%] cursor-pointer pl-[30px] ' >
        <div>

          <img src={songsData[index].image} alt="" className='w-[60px] max-h-[60px]  md:max-h-[80px] md:w-[80px] rounded-lg object-fill' />
        </div>

        <div className='text-[20px] md:text-[25px]'>
          <div className='text-black text-[1.1em] font-semibold '>{songsData[index].name}</div>
          <div className='text-gray-800 text-[0.6em] font-semibold'>{songsData[index].singer}</div>
        </div>
      </div>
      
      <div className='w-[20%] h-[100%] md:flex justify-center items-center'>

        {
          !playingSong ?
            <div className='w-[50px] h-[50px] rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer' onClick={() => playSong()}><IoPlay className='w-[20px] h-[20px]' /></div>
            :
            <div className='w-[50px] h-[50px] rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer' onClick={() => pauseSong()}><MdOutlinePause className='w-[20px] h-[20px]' /></div>
        }
      </div>
    </div>
  )
}

export default Player
