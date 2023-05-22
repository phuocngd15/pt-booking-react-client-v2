import { Card } from 'antd';
import { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTrainersAsync } from '@/store/modules/trainers';
const { Meta } = Card;
const GroupTrainers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const groupName = location.state?.groupName;
  const dispatch = useAppDispatch();
  const trainers = useAppSelector((state) => state.trainers.data);
  const status = useAppSelector((state) => state.trainers.status);
  const error = useAppSelector((state) => state.trainers.error);

  useEffect(() => {
    dispatch(fetchTrainersAsync(groupName || 'All'));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  if (!trainers) return null;

  const onClick = (trainer: any) => {
    navigate(`/customer/trainers/${trainer.uuid}`, { state: { trainerDetailUUID: trainer.uuid } });
  };

  return (
    <div className="grid grid-cols-4 gap-x-10">
      {trainers.map((trainer, i) => (
        <div id="contact" key={`trainer-${i}`}>
          <Card
            key={trainer.key}
            cover={<img alt="avatar" src={trainer.avatar || 'https://placekitten.com/g/200/200'} />}
            actions={[<div onClick={() => onClick(trainer)}>Show more</div>]}
          >
            <Meta
              title={trainer.fullName}
              description={
                <div>
                  <div>Skill: {trainer.skills?.join(', ')}</div>
                </div>
              }
            />
          </Card>
        </div>
      ))}
    </div>
  );
};
export default GroupTrainers;
