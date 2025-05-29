import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingTemplate from '../components/LoadingTemplate';
import { MdOutlineSaveAlt } from "react-icons/md";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ContainerTemplate from '../components/ContainerTemplate';
import { useSelector } from 'react-redux';

const steps = [
  'Order Pending',
  'Order Processing',
  'Order At Local Facility',
  'Order Out For Delivery',
  'Order Completed'
];

const OrderInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(4);

  const ordersInfo = useSelector(state => state)
  console.log("Debug ordersInfo:", ordersInfo);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-base-10'>
        <LoadingTemplate />
      </div>
    );
  }
  const OrderInfo = [
    {
      title: "Order Details",
      content: [
        "1 Item",
        "Express Delivery",
        "Payment Method: STRIPE"
      ]
    },
    {
      title: "Billing Address",
      content: [
        "Customer",
        "2231 Kidd Avenue, Kipnuk, AK, 99614, United States",
        "+1 9365141641631"
      ]
    },
    {
      title: "Shipping Address",
      content: [
        "Customer",
        "2148 Straford Park, Winchester, KY, 40391, United States",
        "+1 9365141641631"
      ]
    }
  ];
  

  return (
    <ContainerTemplate>
      <div className='flex flex-col '>

        <div className="bg-base-300 flex justify-between items-center rounded-tl-md rounded-tr-md px-6 py-4">
          <p className='font-bold '>
            Order Status: <span className='bg-success text-base-content rounded-2xl px-2 py-1 text-xs font-semibold'>Completed</span>
          </p>
          <p className='font-bold'>
            Payment Status: <span className='bg-success text-base-content rounded-2xl px-2 py-1 text-xs font-semibold'>Cash on Delivery</span>
          </p>
        </div>

        <div className='bg-base-100 flex flex-col gap-4 px-6 py-6'>
          <div className='flex justify-end'>
            <button className='flex items-center btn btn-info h-12 '>
              <MdOutlineSaveAlt />
              Download Invoice
            </button>
          </div>
          <div className='flex  items-center justify-between  '>
            <div className='flex items-center justify-between '>
              <p className='text-xl font-medium f'>Order ID - {id}</p>
            </div>
            <div className='flex gap-4 w-[90%]'>
              <select
                defaultValue="Pick a text editor"
                className="select select-primary h-12  text-lg ml-auto"
              >
                <option disabled={true}>Order processing</option>
                <option>Order processing</option>
                <option>VScode fork</option>
                <option>Another VScode fork</option>
              </select>
              <div>
                <button className='btn btn-success  h-12'>
                  Change Status
                </button>
              </div>
            </div>
          </div>

          <div className='mt-18'>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                '& .MuiStepIcon-root': {
                  color: '#10b981',
                  fontSize: '2.4rem',
                },
                '& .MuiStepIcon-root.Mui-completed': {
                  color: '#10b981',
                  fontSize: '2.4rem',
                },
                '& .MuiStepIcon-root.Mui-active': {
                  color: '#10b981',
                  fontSize: '2.4rem',
                },

                '& .MuiStepLabel-label': {
                  fontSize: '0.875rem',
                  fontWeight: 500,
                },


                '& .MuiStepConnector-line': {
                  borderTopWidth: 4,
                  borderColor: '#10b981',
                },

                '& .MuiStepConnector-root': {
                  top: '22px',
                  left: 'calc(-54% + 16px)',
                  right: 'calc(45% + 16px)',
                },

                '& .MuiStep:last-child .MuiStepConnector-root': {
                  display: 'none',
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <div className='mt-8 bg-base-200 flex items-center justify-between p-2 rounded-xl'>
            <p className='pl-4 font-medium'>Products</p>
            <p className='pr-4 font-medium'>Total</p>
          </div>

          <div className='flex items-center gap-4 mt-4   justify-between'>
            <div className='flex items-center gap-3'>
              <img src={`../../public/handback.png`} alt="Product" className='w-[5%]' />
              <p className='font-semibold'>See by Chloe x1</p>
            </div>

            <div className='mt-8 pt-4 border-t border-base-300'>
              <div className='space-y-4 mt-4'>

                <div className='flex justify-between w-full max-w-2xl mx-auto gap-20'>
                  <p className='text-sm text-base-content truncate'>Sub total</p>
                  <p className='text-sm text-base-content'>$280.00</p>
                </div>

                <div className='flex justify-between w-full max-w-2xl mx-auto'>
                  <p className='text-sm text-base-content truncate'>Discount</p>
                  <p className='text-sm text-base-content'>50%</p>
                </div>

                <div className='flex justify-between w-full max-w-2xl mx-auto'>
                  <p className='text-sm text-base-content truncate'>Tax</p>
                  <p className='text-sm text-base-content'>$5.60</p>
                </div>

                <div className='flex justify-between w-full max-w-2xl mx-auto pt-2 border-t border-dashed border-base-300'>
                  <p className='font-bold text-sm truncate'>Total</p>
                  <p className='font-bold text-sm'>$335.60</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-start justify-between mt-10 gap-6'>
  {OrderInfo.map((section, index) => (
    
    <div key={index} className='w-full max-w-xs'>
      <p className='font-medium text-xl mb-2'>{section.title}</p>
      <hr className='my-4 border-base-300' />

      <div className='space-y-1'>
        {section.content.map((line, i) => (
          <p key={i} className='text-sm text-base-content'>{line}</p>
        ))}
      </div>
    </div>
  ))}
</div>


        </div>

      </div>
    </ContainerTemplate>
  );
};

export default OrderInfo;
