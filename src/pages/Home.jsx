import React, { useContext, useEffect, useRef, useState } from 'react'
import { songsData } from '../songs'
import musicImg from "../assets/musicanim.webp"
import { CgPlayTrackPrev } from "react-icons/cg";
import { IoPlay } from "react-icons/io5";
import { CgPlayTrackNext } from "react-icons/cg";
import { datacontext } from '../context/UserContext';
import { MdOutlinePause } from "react-icons/md";
import Card from '../components/Card';
import { MdKeyboardArrowDown } from "react-icons/md";
import Player from '../components/Player';
function Home() {

    let { audioRef, playingSong, playSong, pauseSong, nextSong, index, setIndex, prevSong } = useContext(datacontext)
    let [range, setRange] = useState(0)
    let progress = useRef(null)
    let [arrow, setArrow] = useState(false)

   useEffect(() => {
    const updateProgress = () => {
        let duration = audioRef.current.duration || 0
        let currentTime = audioRef.current.currentTime || 0
        let progressPercentage = (currentTime / duration) * 100 || 0
        setRange(progressPercentage)

        if (progress.current) {
            progress.current.style.width = `${progressPercentage}%`
        }
    }

    audioRef.current.addEventListener("timeupdate", updateProgress)

    return () => {
        audioRef.current.removeEventListener("timeupdate", updateProgress)
    }

}, [])

    function handleRange(e) {
        let newrange = e.target.value
        setRange(newrange)
        let duration = audioRef.current.duration
        audioRef.current.currentTime = (duration * newrange) / 100



    }

    return (
        <div className='w-full h-screen bg-black flex relative overflow-hidden'>
            <MdKeyboardArrowDown className={`absolute text-white top-[25px] left-[10%] text-[30px] md:hidden ${arrow ? "rotate-[-90deg]" : null} cursor-pointer`} onClick={() => setArrow(prev => !prev)} />

            {!arrow ? <><div className='w-full  md:w-[50%] h-full  flex justify-start items-center pt-[20px] md:pt-[120px] flex-col gap-[30px]'>


                <h1 className='text-white font-semibold text-[20px]'>Now Playing</h1>
                <div className='w-[80%]  max-w-[250px] h-[250px] object-fill rounded-md overflow-hidden relative'>
                    <img src={songsData[index].image} alt="" className='w-[100%] h-[100%]' />
                    {playingSong ? <div className='w-full h-full bg-black absolute top-0 opacity-[0.5] flex justify-center items-center'>
                        <img src={musicImg} alt="" className='w-[50%]' />
                    </div> : null}

                </div>

                <div>
                    <div className='text-white text-[30px] font-bold text-center'>{songsData[index].name}</div>
                    <div className='text-gray-400 text-[18px] text-center'>{songsData[index].singer}</div>
                </div>
                <div className='w-[50%] flex justify-center items-center relative rounded-md'>
                    <input type="range" className='appearance-none w-[100%] h-[7px] rounded-md bg-gray-600' id='range' value={range} onChange={handleRange} />
                    <div className={`bg-white  h-[100%] absolute left-0 rounded-md`} ref={progress}> </div>
                </div>

                <div className='text-white flex justify-center items-center gap-5'>
                    <CgPlayTrackPrev className='w-[28px] h-[28px] hover:text-gray-600 transition-all cursor-pointer' onClick={() => prevSong()} />
                    {
                        !playingSong ?
                            <div className='w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer' onClick={() => playSong()}><IoPlay className='w-[20px] h-[20px]' /></div>
                            :
                            <div className='w-[50px] h-[50px] rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-600 transition-all cursor-pointer' onClick={() => pauseSong()}><MdOutlinePause className='w-[20px] h-[20px]' /></div>
                    }


                    <CgPlayTrackNext className='w-[28px] h-[28px] hover:text-gray-600 transition-all cursor-pointer' onClick={() => nextSong()} />
                </div>

            </div>
                <div className='w-[100%] md:w-[50%] h-full hidden md:flex flex-col gap-5 pt-[120px] overflow-auto pb-[20px]'>
                    {songsData.map((song) => (
                        <Card 
                        key={song.id}
                        name={song.name}
                         image={song.image}
                          singer={song.singer}
                           songIndex={song.id - 1} />
                    ))}
                </div>
                </>
                :
                <div className='w-[100%] md:w-[50%]  items-center flex flex-col gap-5  mt-[70px] overflow-auto pb-[70px] relative h-[70%]'>
                    <Player />
                    {songsData.map((song) => (
                        <Card
                         key={song.id}
                         name={song.name}
                          image={song.image}
                           singer={song.singer}
                            songIndex={song.id - 1} 
                            />
                    ))}
                </div>}


        </div>
    )
}

export default Home
