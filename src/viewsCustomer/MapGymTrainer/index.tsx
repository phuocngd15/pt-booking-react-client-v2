import { Select, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import type { GeneralLocationInfo } from '@/viewsCustomer/MapGymTrainer/MapLoader';
import MapLoader from '@/viewsCustomer/MapGymTrainer/MapLoader';
import { getCurrentLocationUser } from '@/viewsCustomer/MapGymTrainer/helper';
import { getAllGymCenters } from '@/api/gymCenter';

export default function MapGymTrainer() {
  const [userLocation, setUserLocation] = useState<GeneralLocationInfo>();
  const [trainingLocations, setTrainingLocations] = useState<GeneralLocationInfo[]>([]);
  const [gymCenters, setGymCenters] = useState<GymCenterInfo[]>();
  const [selectedGymCenterId, setSelectedGymCenterId] = useState();
  const handleLocationError = (error: any) => {
    console.error('Error getting current location:', error);
  };

  useEffect(() => {
    getCurrentLocationUser()
      .then((location: any) => {
        const userlocation: GeneralLocationInfo = {
          position: { lat: location.latitude, lng: location.longitude },
          contentString: 'Me',
          label: 'Me',
        };
        console.log('userlocation', userlocation);
        setUserLocation(userlocation);
      })
      .catch((error) => handleLocationError(error));

    getAllGymCenters().then((result) => {
      console.log('getAllGymCenters', result);
      const trainingLocations: GeneralLocationInfo[] = [];
      const gymCenters: GymCenterInfo[] = [];
      if (result.code === 1) {
        result.data?.forEach((e: any) => {
          if (e.centerName === 'Online') return;
          const location: GeneralLocationInfo = {
            label: e?.centerGGLabelMaker,
            contentString: e?.centerGGContent,
            position: { ...e?.centerGGLocation },
          };
          trainingLocations.push(location);
          gymCenters.push(e);
        });
        setGymCenters(gymCenters);
        setTrainingLocations(trainingLocations);
      }
    });
  }, []);

  if (!trainingLocations) {
    return <div />;
  }

  return (
    <div className="mx-auto mt-16 w-full max-w-container px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24 space-y-5">
      <div>
        <span className="text-5xl font-extrabold text-amber-600 sm:text-7xl xl:max-w-[43.5rem]">
          Gym Center
        </span>
      </div>
      <div>
        <label className="relative block">
          <span className={'sr-only'}>Gym Center</span>
          <Select
            placeholder={'Gym Center'}
            style={{ width: 450 }}
            onChange={(e) => {
              console.log(e);
              setSelectedGymCenterId(e);
            }}
            options={gymCenters?.map((e) => {
              return { value: e._id, label: e.centerName };
            })}
          />
        </label>
      </div>
      {selectedGymCenterId && (
        <>
          <div>
            <DetailGymCenter gymCenter={gymCenters?.find((e) => e._id === selectedGymCenterId)} />
          </div>
          <div>
            <div className="text-xl font-bold">Gym location</div>
            <div style={{ height: '400px', border: 'solid 2px gray' }}>
              <MapLoader
                locations={userLocation ? [userLocation, ...trainingLocations] : trainingLocations}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
interface GymCenterInfo {
  centerName: string;
  centerDes: string;
  centerAddressStr: string;
  centerImageMain: string;
  centerGGLocation: { lat: number; lng: number };
  centerGGContent: string;
  centerGGLabelMaker: string;
  centerOperatingDes: string;
  centerImages: string[];
}

function DetailGymCenter({ gymCenter }: { gymCenter?: GymCenterInfo }) {
  if (!gymCenter) return <div />;
  return (
    <div className="space-y-3">
      <div className="flex">
        <div className="space-y-3">
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold">{gymCenter?.centerName}</div>
            </div>
            <div>{gymCenter?.centerDes}</div>
            <div>
              <div className="font-medium">{gymCenter?.centerAddressStr}</div>
              <div>
                <div>Operating hours:</div>
                <div>{gymCenter?.centerOperatingDes}</div>
              </div>
            </div>
          </div>

          <div className="explore-contain">
            <div className="btn-submit">
              <a
                className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-amber-600 text-white hover:bg-amber-400"
                href="/login"
              >
                <span>Try for Free</span>
              </a>
            </div>
          </div>
        </div>
        <div className="">
          <img src={gymCenter?.centerImageMain} alt="image of club" width="100%" height="100%" />
        </div>
      </div>
      <div className="space-y-3">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <div className="text-xl font-bold">The gym's physical infrastructure</div>
        <div>
          <Carousel autoplay>
            {gymCenter?.centerImages.map((src) => (
              <div key={src}>
                <img src={src} alt={'image-gym'} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
