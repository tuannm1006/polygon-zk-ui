import { DefaultFcProps } from "common"
import { useLayoutEffect, useState } from "react"

export const CountdownClock: React.FC<DefaultFcProps & {
  finnishAt: Date
}> = ({
  finnishAt
}) => {
    const [data, setData] = useState<{
      days: number,
      hours: number,
      minutes: number,
      seconds: number
    }>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })

    useLayoutEffect(() => {
      const handler = setInterval(() => {
        const now = new Date().getTime();
        const distance = finnishAt.getTime() - now;

        setData(preData => ({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        }))
      }, 1000)

      return () => clearInterval(handler)
    }, [finnishAt])

    return (
      <div>
        <span className='linear-text text-[18px]'>{data.days}</span><span className="text-[#8A939B] text-[18px]">D</span> <span className='linear-text text-[18px]'>{data.hours}</span><span className='text-[#8A939B] text-[18px]'>H</span> <span className='linear-text text-[18px]'>{data.minutes}</span><span className='text-[#8A939B] text-[18px]'>M</span> <span className='linear-text text-[18px]'>{data.seconds}</span><span className='text-[#8A939B] text-[18px]'>S</span>
      </div>
    )
  }
