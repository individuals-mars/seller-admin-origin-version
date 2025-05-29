import React, { useEffect, useState } from 'react';
import ContainerTemplate from '../components/ContainerTemplate';
import TitleTemplate from '../components/TitleTemplate';
import { toast } from 'react-toastify';
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import LoadingTemplate from '../components/LoadingTemplate';
import { useDispatch } from 'react-redux';
import { setOrders } from '../store/orderSlice'; 

const Orders = () => {
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/orders`;
  const [orders, setOrdersLocal] = useState([]); 
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      const fetchedOrders = data.data || data || [];
      setOrdersLocal(fetchedOrders);
      setFilteredOrders(fetchedOrders);
      dispatch(setOrders(fetchedOrders)); 
    } catch (error) {
      toast.error("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = orders.filter(order =>
      order.customer?.username?.toLowerCase().includes(lowerQuery)
    );
    setFilteredOrders(filtered);
  };

  return (
    <ContainerTemplate>
      <div>
        <div className='flex justify-between items-center'>
          <div className='bg-base-100 border-2 border-base-300 flex justify-between px-2 py-8 w-full rounded-2xl items-center'>
            <p className='text-2xl font-bold text-base-content'><span className='text-success'>|</span> Orders</p>
            <label className="input w-[40%] h-10 input-primary mt-4">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                required
                placeholder="Search orders..."
                className='w-[150%]'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </label>
          </div>
        </div>

        <div className='mt-8 border-2 border-base-300 rounded-2xl bg-base-100'>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className='bg-base-200 '>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>City</th>
                  <th>Region</th>
                  <th>Street</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="10" className="text-center"><LoadingTemplate /></td></tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      <div className='flex items-center justify-center flex-col '>
                        <img src={`../../public/notfound.png`} alt="" sizes={10} />
                        <p className=' text-2xl'>No data found</p>
                        <p className='text-xs'>Sorry we couldn’t found any data</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => {
                    const customer = order.customer || {};
                    const location = order.location || {};
                    return (
                      <tr key={order._id}>
                        <th>{index + 1}</th>
                        <td>{customer?.username || "Noma'lum"}</td>
                        <td>{customer.phone || "Mavjud emas"}</td>
                        <td>{customer.age || "Mavjud emas"}</td>
                        <td>{customer.gender || "Mavjud emas"}</td>
                        <td>{location.city || "Mavjud emas"}</td>
                        <td>{location.region || "Mavjud emas"}</td>
                        <td>{location.street || "Mavjud emas"}</td>
                        <td className='text-success rounded-full'>
                          <span className='bg-base-300 text-success relative right-2 font-semibold p-2 rounded-full'>
                            {order.paymentStatus || "Mavjud emas"}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => navigate(`/order/${order._id}`)}
                            className='btn btn-success'
                          >
                            <IoEyeOutline />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ContainerTemplate>
  );
};

export default Orders;
