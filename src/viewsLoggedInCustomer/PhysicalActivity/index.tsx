import { Card, Avatar, List } from 'antd';

const data = [
  {
    title: 'Activity 1',
    des: 'des active1',
  },
  {
    title: 'Activity 2',
    des: 'des active2',
  },
  {
    title: 'Activity 3',
    des: 'des active3',
  },
  {
    title: 'Activity 4',
    des: 'des active4',
  },
];
export default function PhysicalActivity() {
  return (
    <Card title="Activity List">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item actions={[<a href="/customer/DetectPose">do it</a>]}>
            <List.Item.Meta
              avatar={
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.des}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
