import { memo, useEffect, useState } from 'react';
import { Card, Col, Progress, Row, theme } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import './index.less';
import { getNumericalValue } from './style';
import AreaChart from './components/AreaChart';
import RoseChart from './components/RoseChart';
import Comment from './components/Comment';
import WordCloudChart from './components/WordCloudChart';
import { getTicketsStatistics } from '@/api/tickets';
import { mapObjectToArray } from '@/views/Home/Helper';

const Home = memo(() => {
  const [dataAreaChart, setDataAreaChart] = useState<any>();
  useEffect(() => {
    getTicketsStatistics().then((e) => {
      console.log('static tickets', e.data);
      const container: any[] = [];
      e.data.map((ticket) => mapObjectToArray(ticket, container));
      console.log('mappedArray', container);
      if (e.code === 1) {
        setDataAreaChart(container);
      }
    });
  }, []);

  return (
    <div className="">
      <Row gutter={[12, 12]}>
        <Col lg={18} sm={24} xs={24}>
          <Card size="small" title="Tickets Analyst">
            <AreaChart data={dataAreaChart} />
          </Card>
        </Col>
        <Col lg={6} sm={24} xs={24}>
          {/*<Card size="small" title="task data">*/}
          {/*  <RoseChart />*/}
          {/*</Card>*/}
        </Col>
        <Col lg={18} sm={24} xs={24}>
          {/*<Card size="small" title="Comment List">*/}
          {/*  <Comment />*/}
          {/*</Card>*/}
        </Col>
        <Col lg={6} sm={24} xs={24}>
          {/*<Card size="small" title="word cloud">*/}
          {/*  <WordCloudChart />*/}
          {/*</Card>*/}
        </Col>
      </Row>
    </div>
  );
});

export default Home;
