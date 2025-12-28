import StarSvg from '@/components/star-svg'
import React from 'react'

const Star = ({star}) => {
    const stars = new Array(star).fill(0)
 
  return (
    <>
      {stars.map((star,index) => {
          
         return <StarSvg key={index} />
      })}
    </>
  )
}

export default Star
