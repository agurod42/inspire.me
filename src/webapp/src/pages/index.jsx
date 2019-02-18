import { Avatar, Button, Card, Icon, List } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Box, Flex } from 'reflexbox';
import TorreSearchForm from '@/components/torre/searchForm';
import { inspireMe } from '@/redux/inspirer/inspirer.actions';
import { bio } from '@/redux/torre/torre.actions';

const mapStateToProps = ({ inspirerReducer, torreReducer }) => ({
  inspireMeLoading: inspirerReducer.loading,
  inspireMeRes: inspirerReducer.inspireMeRes,
  torreBio: torreReducer.torreBio,
  torreLoading: torreReducer.loading,
});

@connect(mapStateToProps, { bio, inspireMe })
class IndexPage extends React.Component {

  render() {
    return (
      <Flex>
        <Box w={1/3}>
          <TorreSearchForm onSubmit={form => this.props.bio(form.username)} />
          <List
            dataSource={this.props.torreBio ? [this.props.torreBio] : []}
            itemLayout='horizontal'
            loading={this.props.torreLoading}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.person.picture} />}
                  title={<a href="https://ant.design">{item.person.name}</a>}
                  description={item.person.professionalHeadline}
                />
                <Button icon='bulb' onClick={() => this.props.inspireMe(this.props.torreBio)}>Get inspired</Button>
              </List.Item>
            )}
          />
        </Box>
        <Box px={24} w={2/3}>
          {!this.props.inspireMeRes && this.props.inspireMeLoading && 
            <List loading />
          }
          {Object.keys(this.props.inspireMeRes || {}).map(dataProvider => 
            <Card key={dataProvider} title={dataProvider} style={{ marginBottom: 24 }}>
              <List
                dataSource={this.props.inspireMeRes[dataProvider]}
                itemLayout='horizontal'
                loading={this.props.inspireMeLoading}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={'https://picsum.photos/200'} />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={item.parterName}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </Box>
      </Flex>
    );
  }

}

export default IndexPage;