import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { joinClassNames } from '@/utils/classNamesStyle';
import { useAppDispatch } from '@/store/hooks';
import { fetchTrainersAsync } from '@/store/modules/trainers';
import { serviceTypes } from '@/viewsCustomer/Trainers/const/ServiceTypes';
const Index = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const groupName = location.state?.groupName;
  const [selected, setSelected] = useState(groupName || serviceTypes[0].name);
  const onClick = async (serviceType: { key: any; name?: any }) => {
    const { name } = serviceType;
    dispatch(fetchTrainersAsync(name));
    setSelected(name);
  };

  return (
    <div className="md:w-64 md:shrink-0 lg:block lg:pr-8">
      <div className="sticky top-[120px]">
        <nav className="mx-auto space-y-4 text-gray-400 max-h-96 overflow-y-auto">
          {serviceTypes.length ? (
            <ul>
              {serviceTypes.map((serviceType: { key: string; name: any }) => (
                <li>
                  <button
                    key={serviceType.key}
                    // to={`trainers/${serviceType.name}`}
                    className={joinClassNames(
                      serviceType.name === selected ? 'text-blue-500' : 'text-gray-400',
                      'flex items-center whitespace-nowrap rounded py-2 px-6 font-medium transition-colors duration-200 hover:text-black  lg:py-0 lg:px-0',
                    )}
                    onClick={() => {
                      onClick(serviceType);
                    }}
                  >
                    {serviceType.name ? <>{serviceType.name}</> : <i>empty</i>}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
    </div>
  );
};
export default Index;
