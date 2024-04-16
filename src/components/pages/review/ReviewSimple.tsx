'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import FillStarIcon from '@/images/svgs/FillStarIcon';
import { commonResType } from '@/types/commonResType';


interface reviews {
  reviewId: number;
  content: string;
  createdAt: string;
  memberName: string;
  rate: number;

}


export default function ReviewSimple() {
  const params = useParams();
  console.log(params);

  const [reviews, setReviews] = useState<reviews[]>([]);
  const [reviewDetail, setReviewDetail] = useState<reviews>();
  

  async function fetchReviewData() {


    try {
      const response = await fetch(`https://nocaffein.shop/api/v1/review/product/${params.productId}`, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: commonResType = await response.json() as commonResType;
      const reviews: reviews[] = data.data as reviews[];
      setReviews(reviews);
      // console.log('data:', data.data[0].reviewId)
      return data.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  console.log(reviews)

// const reviewArr: reviews[] = [];
const [reviewArr, setReviewArr] = useState<reviews[]>([]);

  async function fetchReviewDetail(reviewId: number) {
    const reviewResponse = await fetch(`https://nocaffein.shop/api/v1/review/${reviewId}`);
    const reviewData: commonResType = await reviewResponse.json() as commonResType;
    const reviewDetailData: reviews = reviewData.data as reviews;
    // reviewArr.push(reviewDetailData);
    setReviewArr(prevReviewArr => [...prevReviewArr, reviewDetailData]);
  }

  // console.log(fetchReviewDetail(reviews[1].reviewId));
  

  useEffect(() => {
    fetchReviewData();
  }, [])

  useEffect(() => {
    {reviews.map((review) => {
      fetchReviewDetail(review.reviewId);
    })}
  }, [reviews])
  console.log(reviews)
  console.log("revoewArr",reviewArr)


  // useEffect(() => {
  // const fetchReviewData = async () => {
  //   'use server'
  //   const response = await fetch('https://nocaffein.shop/api/v1/review/product/1',
  //     { cache: 'no-cache' }
  //   );
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');

  //   }),
  //   )
  // }
  // }
  // )

  // const exampleData = [
  //   {
  //     rating: 4,
  //     type: '일반',
  //     date: '2022.01.01',
  //     id: 'user1',
  //     images: ['image1_url', 'image2_url'],
  //     content: '옷이 너무 예뻐요!!'
  //   },
  //   {
  //     rating: 5,
  //     type: '일반',
  //     date: '2022.01.02',
  //     id: 'user2',
  //     images: ['image3_url', 'image4_url'],
  //     content: '배송이 빨라요!! 잘 입을게요'
  //   },
  //   {
  //     rating: 3,
  //     type: '일반',
  //     date: '2022.01.03',
  //     id: 'user3',
  //     images: ['image5_url', 'image6_url'],
  //     content: '좋네요. 무난하게 입을만 한거 같아요.'
  //   },
  //   {
  //     rating: 4,
  //     type: '일반',
  //     date: '2022.01.04',
  //     id: 'user4',
  //     images: ['image7_url', 'image8_url'],
  //     content: '너무 마음에 들네요'
  //   },
  //   {
  //     rating: 5,
  //     type: '일반',
  //     date: '2022.01.05',
  //     id: 'user5',
  //     images: ['image9_url', 'image10_url'],
  //     content: '굿'
  //   }
  // ];

  return (
    <>
      <div className='mt-[30px] py-0 px-4 leading-none'>
        <div className='inline-block  text-right whitespace-nowrap'>
          <span className='float-left text-base font-bold leading-normal clear-both whitespace-nowrap text-right'>
            전체 리뷰
          </span>
        </div>
        <ul className='relative border-t-[1px]'>
        {reviewArr.map((review, index) => (
              <li className='mt-5 pl-0 border-t-0 border-b-[1px] pb-5'>
                <div className='pr-5 block'>
                  <div className='flex items-center'>
                    <div className='flex items-center relative align-middle text-[12px]'>
                      <div className='w-[12px] mr-1'>
                        <FillStarIcon />
                      </div>
                      <em className='not-italic pr-1 text-xs font-bold'>{review.rate}</em>
                    </div>
                    <span className='border-l-[1px] border-r-[1px] border-zinc-100 px-2 text-xs'>일반</span>
                    <div className='flex flex-row items-center justify-start text-[11px] whitespace-nowrap text-gray-400'>
                      <span className='w-[67.813px] h-[15.2px] pr-[5px] pl-[6px] py-0 whitespace-nowrap border-r-[1px] border-zinc-100'>{review.createdAt}</span>
                      <span className='w-[67.813px] h-[15.2px] pr-[5px] pl-[6px] whitespace-nowrap'>{review.memberName}</span>
                    </div>
                  </div>
                  {/* <div className='mt-3 -mr-5 mb-3 ml-0'>
                    <ul className='flex p-0'>
                      {
                        data.images.map((image, index) => {
                          return (
                            <li key={index} className='bg-red-300 w-[90px] h-[90px] rounded-lg mr-3'>이미지{index + 1}</li>
                          )
                        })
                      }
                    </ul>
                  </div> */}
                  <Link
                    href={'#'}
                    className='text-inherit'
                  >
                    <p className='mt-[5px] whitespace-nowrap text-sm overflow-hidden break-all leading-normal'>
                      {review.content}
                    </p>
                  </Link>
                </div>
                <Link
                  href={'#'}
                  className='w-[30px] h-[30px] absolute -right-[14px] top-[14px]'
                >
                  <div className='absolute top-1/2 left-1/2 w-3 h-3 ml-0 bg-sp_product bg-[position:-509px_-262px] bg-[size:524px_479px]'></div>
                </Link>
              </li>
        ))}
        </ul>
      </div>
    </>
  )
}
