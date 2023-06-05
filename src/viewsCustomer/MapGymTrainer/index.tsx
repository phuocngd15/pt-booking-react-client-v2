import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import MapLoader from '@/viewsCustomer/MapGymTrainer/MapLoader';
import { getLocation } from '@/viewsCustomer/MapGymTrainer/helper';
import mapdemo from './mapdeco.png';
import styles from './MapGym.module.css'
export default function MapGymTrainer() {
  const [userLocation, setUserLocation] = useState<any>();
  useEffect(() => {
    const handleLocationError = (error) => {
      console.error('Error getting current location:', error);
    };

    getLocation()
      .then((location: any) => {
        const userlocation = {
          position: { lat: location.latitude, lng: location.longitude },
          contentString: 'You',
          label: 'You',
        };
        console.log('userlocation', userlocation);
        setUserLocation(userlocation);
      })
      .catch((error) => handleLocationError(error));
  }, []);
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={4}>
          <div>FIND YOUR GYM</div>
        </Col>
        <Col span={20}>

            <div className={styles.mapcontainer}>
                {/*<img src={mapdemo}/>*/}
                <MapLoader userLocation={userLocation} />
            </div>
        </Col>
      </Row>
    </div>
  );
}
