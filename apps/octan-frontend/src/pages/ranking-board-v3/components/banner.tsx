import { Container } from '@mui/material';
import { DefaultFcProps } from 'common';
import { FC } from 'react';
import { GradientButton } from 'shared-components';
import Slider from "react-slick";


const banners = [{
  image: '/assets/images/ranking-board/banner.png',
  title: 'Looking to know your users better?',
  description: 'Discover the power of user insights of your projects through our data-backed classification and ranking.',
  btnText: 'TRY FOR FREE',
  id: 1
}]

const settings = {
  customPaging: function() {
    return (
     <div className='ranking-banner-paging'/>
    );
  },
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

export type RankingBannerProps = DefaultFcProps;

export const Banner: FC<RankingBannerProps> = () => {
  return (
    <Slider {...settings}>
      { banners.map((banner) => (
        <div key={banner.id} >
          <div className='ranking-banner flex flex-col lg:justify-center pt-[40px] lg:pt-0'
            style={{
              backgroundImage: `url("${banner.image}")`
            }}
          >
            <Container maxWidth="xl">
              <div className='lg:px-[20px]'>
                <h2 className='text-[24px] text-center lg:text-left lg:text-[32px] lg:leading-[41px] font-black text-white mb-[8px] lg:mb-[34px]'>
                  {banner.title}
                </h2>
                <p className='text-center lg:text-left text-[18px] font-medium leading-[24px] label-text max-w-[460px] mb-[34px]'>
                  {banner.description}
                </p>
                <div className='flex justify-start'>
                  <GradientButton className='border-solid rounded border-white'>
                    {banner.btnText}
                  </GradientButton>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )) }
      
      
    </Slider>
    
  )
}

export default Banner
