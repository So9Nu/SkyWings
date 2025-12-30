import React from 'react'
import { MapPin, Calendar, TrendingDown } from 'lucide-react'

function OfferCard({ image, destination, discount, price, validTill }) {
  return (
      <div className='rounded-2xl relative overflow-hidden min-w-[320px] md:min-w-[380px] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300'>
          {/* Image with overlay */}
          <div className='relative h-72 overflow-hidden'>
              <img
                  src={image}
                  alt={destination}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
              />
              {/* Gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>

              {/* Discount Badge */}
              <div className='absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-1'>
                  <TrendingDown className='w-4 h-4' />
                  {discount}% OFF
              </div>
          </div>

          {/* Content */}
          <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
              <div className='flex items-center gap-2 mb-2'>
                  <MapPin className='w-5 h-5 text-cyan-400' />
                  <h3 className='font-bold text-3xl'>{destination}</h3>
              </div>

              <div className='flex items-center gap-2 mb-3 text-gray-200'>
                  <Calendar className='w-4 h-4' />
                  <p className='text-sm'>Valid till {validTill}</p>
              </div>

              <div className='flex items-baseline gap-2'>
                  <p className='text-sm text-gray-300'>Starting from</p>
                  <h2 className='text-4xl font-bold text-cyan-400'>Nrs {price.toLocaleString()}</h2>
              </div>

              <button className='mt-4 w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all border border-white/30'>
                  Book Now
              </button>
          </div>
      </div>
  )
}

export default OfferCard

