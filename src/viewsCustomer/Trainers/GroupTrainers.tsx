import { Card } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTrainersAsync } from '@/store/modules/trainers';
const { Meta } = Card;
const GroupTrainers = () => {
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

  console.log('GroupTrainers', trainers);
  if (!trainers) return null;
  return (
    <div className="grid grid-cols-4 gap-x-10">
      {trainers.map((trainer) => (
        <div id="contact" key={trainer.key}>
          {/*<div>*/}
          {/*  <img key={trainer.avatar} src={trainer.avatar || null} />*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <h1>{trainer.fullName}</h1>*/}

          {/*  {trainers.twitter && (*/}
          {/*    <p>*/}
          {/*      <a target="_blank" href={`https://twitter.com/${trainer.twitter}`} rel="noreferrer">*/}
          {/*        z{trainer.twitter}*/}
          {/*      </a>*/}
          {/*    </p>*/}
          {/*  )}*/}

          {/*  {trainer.notes && <p>{trainer.notes}</p>}*/}

          {/*  /!*<div>*!/*/}
          {/*  /!*    <Form action="edit">*!/*/}
          {/*  /!*        <button type="submit">Edit</button>*!/*/}
          {/*  /!*    </Form>*!/*/}
          {/*  /!*    <Form*!/*/}
          {/*  /!*        method="post"*!/*/}
          {/*  /!*        action="destroy"*!/*/}
          {/*  /!*        onSubmit={(event) => {*!/*/}
          {/*  /!*            if (!confirm('Please confirm you want to delete this record.')) {*!/*/}
          {/*  /!*                event.preventDefault();*!/*/}
          {/*  /!*            }*!/*/}
          {/*  /!*        }}*!/*/}
          {/*  /!*    >*!/*/}
          {/*  /!*        <button type="submit">Delete</button>*!/*/}
          {/*  /!*    </Form>*!/*/}
          {/*  /!*</div>*!/*/}
          {/*</div>*/}

          <Card
            key={trainer.key}
            cover={<img alt="avatar" src={trainer.avatar || 'https://placekitten.com/g/200/200'} />}
            actions={[<div>Show more</div>]}
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
