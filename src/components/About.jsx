import { motion } from 'framer-motion'
import React from 'react'
import { Tilt } from 'react-tilt'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from "../hoc";
import ReactParallaxTilt from 'react-parallax-tilt'



const ServiceCard = ({ index, title, icon }) => (
  <ReactParallaxTilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </ReactParallaxTilt>
);


const About = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>
        Introduction
      </p>
      <h2 className={styles.sectionHeadText}>
        Overview.
      </h2>
    </motion.div>

    <motion.p
     variants={fadeIn('','',0.1,1)}
     className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
    >
        An experienced full-stack developer with strong expertise in web and mobile development. 
        Proficient in Next.js, Node.js, Three.js, React.js, and Django, excel at building dynamic applications with a focus on custom stylings. 
        In mobile development, I'm skilled in React Native and Expo and deal with Real-time projects.
        I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
    </motion.p>

    <div className='mt-20 flex flex-wrap gap-10'>
      {services.map((service ,index)=>(
        <ServiceCard key={service.title} index={index} {...service}/>
      ))}
    </div>
    
    </>
  )
}

export default SectionWrapper(About, "about");