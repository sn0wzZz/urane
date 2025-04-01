
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel'
import { Button } from '../../components/ui/button'

const cards = [
  {
    title: 'Придобиване на професия',
    description:
      ' Всеки завършил някои от професионалните ни курсове получава държавен Сертификат за правоспособност по завършената специалност.',
    href: 'contacts',
  },
  {
    title: 'Курсове',
    description:
      ' Всеки завършил някои от професионалните ни курсове получава държавен Сертификат за правоспособност по завършената специалност.',
    href: 'contacts',
  },
  {
    title: 'Стажове',
    description:
      ' Всеки завършил някои от професионалните ни курсове получава държавен Сертификат за правоспособност по завършената специалност.',
    href: 'contacts',
  },
  {
    title: 'Документи',
    description:
      ' Всеки завършил някои от професионалните ни курсове получава държавен Сертификат за правоспособност по завършената специалност.',
    href: 'contacts',
  },
]

export default function Services() {
  return (
    <div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full '
      >
        <div className='flex my-8 justify-between '>
          <div className='space-y-4'>
            <h3 className='headline-h2'>Услуги</h3>
            <p className='body-16-medium text-muted-foreground'>
              Богата гама от подбрани услуги за вашият бизнес.
            </p>
          </div>

          <div className='relative flex  gap-4'>
            <CarouselPrevious className='relative' />
            <CarouselNext className='relative' />
          </div>
        </div>
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem key={index} className='md:basis-1/2 lg:basis-2/7'>
              <div className='card h-[338px] w-full  '>
                <div className='flex flex-col h-full items-start gap-4'>
                  <h4 className='body-24-semibold'>{card.title}</h4>
                  <p className='body-16-regular text-muted-foreground'>
                    {card.description}
                  </p>

                  <Button variant='secondary' className='mt-auto'>
                    Виж още
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
