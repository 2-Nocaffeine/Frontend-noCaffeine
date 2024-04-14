import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { categoryType } from '@/types/categoryType';
// import SmallArrowIcon from '@/images/svgs/SmallArrowIcon';
import getMCategoryData from '@/app/api/category/getMCategoryData';
import getSCategoryData from '@/app/api/category/getsCategoryData';
import getDCategoryData from '@/app/api/category/getDcategoryData';

export default function SubCategorySlideButton() {

  const currentUrl = useSearchParams();

  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<categoryType[]>([]);

  const lCtgId = currentUrl.get('lCtgId');
  const mCtgId = currentUrl.get('mCtgId');
  const sCtgId = currentUrl.get('sCtgId');
  const dCtgId = currentUrl.get('dCtgId');

  let lastParamId = '';
  let lastParamName = '';
  // const url = new URL(window.location.href);
  const params = currentUrl;

  const entries = Array.from(params.entries());
  for (let [name] of entries) {
    if (name.endsWith('CtgId')) {
      lastParamId = name;
    }
    if (name.endsWith('CtgName')) {
      lastParamName = name;
    }
  }


  const lastCtgName = params.get(lastParamName) || '';

  const getCtgData = async () => {
    if (lCtgId && mCtgId && sCtgId && dCtgId) {
      const dCtgData: categoryType[] = await getDCategoryData(Number(sCtgId)) as categoryType[];
      setCategoryList(dCtgData);
    } else if (lCtgId && mCtgId && sCtgId) {
      const sCtgData: categoryType[] = await getSCategoryData(Number(mCtgId)) as categoryType[];
      setCategoryList(sCtgData);
    } else if (lCtgId && mCtgId) {
      const mCtgData: categoryType[] = await getMCategoryData(Number(lCtgId)) as categoryType[];
      setCategoryList(mCtgData);
    }
  };

  useEffect(() => {
    getCtgData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lCtgId, mCtgId, sCtgId, dCtgId]);

  useEffect(() => {
    const selectedCategory = categoryList.find(category => category.name === lastCtgName);
    if (selectedCategory) {
      setIsSelected(selectedCategory.id);
      const index = categoryList.findIndex(category => category.id === selectedCategory.id);
      if (index !== -1 && buttonRefs.current[index]) {
        buttonRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryList]);

  const handleCategoryClick = (categoryName: string, index: number) => {
    const selectedCategory = categoryList.find(category => category.name === categoryName);

    if (selectedCategory) {
      setIsSelected(selectedCategory.id);

      if (buttonRefs.current[index]) {
        buttonRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    if (lastParamId) {
      params.set();
    }
    if (lastParamName) {
      params.set();
    }

    window.history.pushState({}, '', currentUrl.toString());
  };

  return (
    <div className='w-full col-start-2 col-end-auto ms-[(1rem)*-1] me-[(1rem)*-1] top-[46px] bg-white'>
      <div className='flex-start flex-shrink-0 align-middle relative'>
        <div className='h-[56px] overflow-hidden text-nowrap flex'>
          <div className='flex-nowrap pt-[10px] pb-[10px] ps-3 pe-1 overflow-scroll'>
            {categoryList.map((category, idx) => (
              <button
                key={idx}
                ref={el => buttonRefs.current[idx] = el!}
                onClick={() => { handleCategoryClick(category.name, idx) }}
                className={`min-w-min h-[36px] text-xs font-semibold mr-[5px] pl-2 pr-2
                ${isSelected === category.id ? 'bg-black text-white border-black' : 'bg-gray-100  text-black'}`}>
                {category.name}
              </button>
            ))}
          </div>
          {/* <div className='bg-white top-[10px] absolute bottom-[10px] right-0 pr-4'>
            <button
              className='min-w-9 min-h-9 rotate-90 inline-flex items-center justify-center text-sm border border-gray-200'>
              <div className='w-[18px] h-[18px] text-black font-bold'>
                <SmallArrowIcon />
              </div>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}