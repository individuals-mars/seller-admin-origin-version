import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingTemplate from '../components/LoadingTemplate';
import TitleTemplate from '../components/TitleTemplate';
import { MdOutlineSaveAlt } from "react-icons/md";

import ContainerTemplate from '../components/ContainerTemplate';

const OrderInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <LoadingTemplate />
      </div>
    );
  }

  return (
    <ContainerTemplate>
      <div className=' flex flex-col'>
        <div className='bg-base-300 flex  justify-between items-center rounded-xl p-2'>
          <div className='flex gap-3'>
            <p>Order Status: <span className='bg-success text-base-content rounded-2xl p-1 text-xs'>Completed</span></p>
          </div>
          <div className='flex gap-3'>
            <p>Payment Status: <span className='bg-success text-base-content rounded-2xl p-1 text-xs'>Cash on Deliviry</span></p>
          </div>

        </div>
        <div className='bg-base-100 mt-4 h-full '>
          <div className='rounded-xl  flex items-center justify-between p-8'>
            <div>
              <p className='text-xl font-bold'> Order ID - {id}</p>
            </div>
            <div>
              <button className='flex items-center btn btn-info'> <MdOutlineSaveAlt />
                Dowload Invoce</button>
            </div>
          </div>
          <div className='pl-8 flex items-center gap-4'>
            <img src={`../../public/product.png`} alt="" className='w-[4%]' />
            <p>Product:    sdfsdf </p>
          </div>
          <div className='p-8 flex items-center justify-center '>
            <div>
              <img src={`../../public/totalMoney.png`} alt="money" className='w-[30%] relative left-3' />
              <p className='font-bold'>Subtotal: <span className='text-success font-bold'>$5.00</span></p>
            </div>
            <div>
              <img src={`../../public/totalMoney.png`} alt="money" className='w-[30%] relative left-3' />
              <p className='font-bold'>Shipping Charge: <span className='text-success font-bold'>$50.00</span></p>
            </div>
            <div>
              <img src={`../../public/totalMoney.png`} alt="money" className='w-[30%] relative left-3' />
              <p className='font-bold'>Tax <span className='text-success font-bold'>$0.00</span></p>
            </div>
            <div>
              <img src={`../../public/totalMoney.png`} alt="money" className='w-[30%] relative left-3' />
              <p className='font-bold'>Total <span className='text-success font-bold'>$55.00</span></p>
            </div>
          </div>
        </div>
      </div>
    </ContainerTemplate>
  );
};

export default OrderInfo;
