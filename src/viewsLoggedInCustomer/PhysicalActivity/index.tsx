import { Card, Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import SquatSVG from "@/sgvIcon/squat";

const data = [
  {
    title: 'Basic Squat',
    des: '10 reps',
  },
  // {
  //   title: 'Activity 2',
  //   des: 'des active2',
  // },
  // {
  //   title: 'Activity 3',
  //   des: 'des active3',
  // },
  // {
  //   title: 'Activity 4',
  //   des: 'des active4',
  // },
];
export default function PhysicalActivity() {
  const navigate = useNavigate();
  return (
    <Card title="Daily Activity">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            style={{
              background: 'rgba(255, 168, 2, 0.44)',
            }}
            actions={[
              <button className="text-blue-500" onClick={() => navigate('/squatCounter')}>
                Do it!
              </button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={`https://freesvg.org/img/Squats.png`} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.des}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
