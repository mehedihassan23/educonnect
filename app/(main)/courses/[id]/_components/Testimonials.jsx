import { SectionTitle } from "@/components/section-title";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import Star from "./Star";


const Testimonials = ({testimonials}) => {
    return (
        <>
          <section className="pb-8 md:pb-12 lg:pb-24">
          <div className="container">
                <SectionTitle className="mb-6">Testimonials</SectionTitle>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="max-2xl:w-[90%] w-full mx-auto"
                >
                    <CarouselPrevious />
                    <CarouselNext />
                    <CarouselContent className="py-4">
                        {testimonials.map((testimonial) => (
                            <CarouselItem
                                key={testimonial.id}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="sm:break-inside-avoid">
                                    <blockquote className="rounded-lg bg-gray-50 p-6  sm:p-8 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <img
                                                alt=""
                                                src="https://i.pravatar.cc/56"
                                                width="56"
                                                height="56"
                                                className="size-14 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="mt-0.5 text-lg font-medium text-gray-900">
                                                    {testimonial?.user?.first_name}  {testimonial?.user?.last_name}
                                                </p>
                                                <div className="flex justify-center gap-0.5 text-yellow-600">
                                                    
                                                     <Star star={testimonial?.rating}/>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-gray-700">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing
                                            elit. Culpa sit rerum incidunt, a consequuntur
                                            recusandae ab saepe illo est quia obcaecati neque
                                            quibusdam eius accusamus error officiis atque voluptates
                                            magnam!
                                        </p>
                                    </blockquote>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
          </section>          
        </>
    )
}

export default Testimonials
