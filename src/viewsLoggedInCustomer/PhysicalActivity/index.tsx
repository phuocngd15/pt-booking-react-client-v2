import { Card, Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { IActivity } from '@/api/dailyActivitiesTask';
import { getActivitiesUnComplete } from '@/api/dailyActivitiesTask';

export default function PhysicalActivity() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<IActivity[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getActivitiesUnComplete();
      if (result.code) {
        setActivities(result.data);
      }
    })();
    return () => {};
  }, []);

  return (
    <Card title="Daily Activity">
      <List
        itemLayout="horizontal"
        dataSource={activities}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            style={{
              background: 'rgba(255, 168, 2, 0.44)',
            }}
            actions={[
              <button
                className="text-blue-500"
                onClick={() => navigate('/squatCounter', { state: { workout: item } })}
              >
                Do it!
              </button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={`https://freesvg.org/img/Squats.png`} />}
              title={<a href="https://ant.design">{item.name.toUpperCase()}</a>}
              description={
                <div>
                  <div>{item.des}</div>
                  <div>Reps: {item.reps}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
