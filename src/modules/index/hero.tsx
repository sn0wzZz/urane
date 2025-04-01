import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Button } from '../../components/ui/button'
import { cn } from '../../lib/utils'


// Sample data for the bubbles
const testimonials = [
  { name: 'Камел Нюжар',
    country: 'Узебекистан', avatar: '/avatars/avatar1.jpg' },
  {
    name: 'Шахбоз Анвар',
    country: 'Непал',
    avatar: '/avatars/avatar2.jpg',
  },
  { name: 'Алтинай Жандатова', country: 'Манила', avatar: '/avatars/avatar3.jpg' },
  { name: 'Анара Агънай Кизи', country: 'Казакстан', avatar: '/avatars/avatar4.jpg' },
  {
    name: 'Сае-Ауи Колая',
    country: 'Узебекистан',
    avatar: '/avatars/avatar5.jpg',
  },
]

const bubbleColor = (index: number) => {
  const colors = [
    'bg-[#f5f5f5]',
    'bg-[#d8f7d3]',
    'bg-[#f2ff98]',
    'bg-[#f5f5f5]',
    'bg-[#f2ff98]',
  ]
  return colors[index % colors.length]
}

export default function Hero() {
  const containerRef = useRef(null)
  const orbitRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Transform scroll progress to rotation degrees (0 to 360)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const horizontal = useTransform(rotate, (value) => -value)

  return (
    <div className='relative w-full min-h-[600px] md:min-h-[750px] flex items-center justify-center overflow-hidden  z-10'>
      <div
        className='inset-0 absolute w-[245px] h-[245px] md:w-[350px] md:h-[350px] lg:w-[550px] lg:h-[550px] rounded-full border border-secondary-700 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    before:content-[""] before:absolute before:w-[350px] before:h-[350px] md:before:w-[500px] md:before:h-[500px] lg:before:w-[705px] lg:before:h-[705px] 
                    before:rounded-full before:border before:border-secondary-700 
                    before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                    after:absolute after:w-[140px] after:h-[140px] md:after:w-[200px] md:after:h-[200px] lg:after:w-[400px] lg:after:h-[400px] 
                    after:rounded-full after:border after:border-secondary-700 
                    after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2'
      >
        {/* Orbital animation container that rotates based on scroll */}
        <motion.div
          ref={orbitRef}
          className='absolute inset-0'
          style={{ rotate }}
        >
          {/* Testimonial bubbles positioned at different points on the orbit */}
          {testimonials.map((testimonial, index) => {
            // Calculate position on the circle
            const angle = (index / testimonials.length) * Math.PI * 2
            const radius = 340 // Adjust based on your circle size
            const x = Math.cos(angle) * radius *.9
            const y = Math.sin(angle) * radius *1.6

            

            return (
              <motion.div
                key={index}
                className='absolute'
                style={{
                  left: `calc(16% + ${x}px)`,
                  top: `calc(55% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                  rotate: horizontal,
                }}
                // Counter-rotate to keep bubbles horizontal
              >
                <div className={cn('flex items-center gap-2', index>2 ? 'flex-row-reverse' : 'flex-row')}>
                  {/* Bubble with name and country */}
                  <div className={cn(' bg-opacity-20 backdrop-blur-sm p-3 rounded-full w-max flex items-center', bubbleColor(index))}>
                    <div>
                      <span className='text-sm font-medium w-max whitespace-nowrap'>
                        {testimonial.name}
                      </span>{' - '}
                      <span className='text-sm '>
                        {testimonial.country}
                      </span>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-secondary-700 ml-2'>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Hero content */}
      <div className='relative z-10 text-center max-w-4xl mx-auto px-4 mt-36'>
        <motion.h1
          className='display-main mb-6'
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Професионални услуги за подбор на кадри.{' '}
        </motion.h1>
        <motion.p
          className='body-16-medium mb-8 max-w-2xl mx-auto text-muted-foreground'
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Вече 12 години помагаме на бизнеси в подборът на кадри от трети страни
          и помагаме за развитието на вашият бизнес покривайки целият процес.
        </motion.p>
        <motion.div
          className='flex flex-col sm:flex-row gap-4 justify-center'
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button>Заявка за вашата фирма</Button>
        </motion.div>
      </div>
    </div>
  )
}