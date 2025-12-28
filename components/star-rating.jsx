import Image from "next/image"


const StarRating = ({rating}) => {
    const stars = new Array(rating).fill(0)
  return (
    <>
      {
        stars.map((star, index) => {
            return <Image key={index} src={"/assets/images/star.svg"} width={20} height={20} />
        })
      }
    </>
  )
}

export default StarRating
