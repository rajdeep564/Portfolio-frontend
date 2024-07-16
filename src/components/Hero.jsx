import React from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { ComputersCanvas } from './canvas'
const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl m-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>Hi, I'm <span className='text-[#915eff]'>Rajdeep</span></h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>Creating cool websites with code and creativity, <br className='sm:block hidden' /> one pixel at a time</p>
        </div>
      </div>
      <ComputersCanvas/>
      {/* <ComputersCanvas /> */}
      <div className='absolute xs:bottom-4 bottom-3 w-full flex justify-center items-center'>
        <a href="#contact">
          <div className='xs:w-[30px] w-[26px] xs:h-[55px] h-[50px] rounded-3xl border-4 border-white flex justify-center items-start p-1'>
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 3, // Slow down the animation
                repeat: Infinity,
                repeatType: "loop"
              }}
              className='xs:w-3 w-2 xs:h-3 h-2 rounded-full bg-white mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero
