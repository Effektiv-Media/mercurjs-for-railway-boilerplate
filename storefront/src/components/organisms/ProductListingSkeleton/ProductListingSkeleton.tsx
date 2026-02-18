export const ProductListingSkeleton = () => {
  return (
    <div className='py-4'>
      <div className='lg:flex justify-between lg:h-10 items-center'>
        <div className='h-6 bg-secondary w-20 rounded-sm animate-pulse' />
        <div className='h-10 w-[200px] bg-secondary rounded-sm animate-pulse hidden lg:block' />
        <div className='flex lg:hidden gap-2 mt-4 mb-2'>
          <div className='w-1/2 h-[38px] bg-secondary rounded-sm animate-pulse' />
          <div className='w-1/2 h-[38px] bg-secondary rounded-sm animate-pulse' />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 mt-6'>
        <div>
          <div className='rounded-sm bg-secondary h-80 border border-white animate-pulse' />
          <div className='rounded-sm bg-secondary h-80 border border-white animate-pulse' />
          <div className='rounded-sm bg-secondary h-80 border border-white animate-pulse' />
        </div>
        <div className='col-span-3'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3'>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className='rounded-sm bg-secondary aspect-[3/4] border border-white animate-pulse' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
