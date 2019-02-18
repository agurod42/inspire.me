import { Avatar, Button, Card, Icon, List } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Box, Flex } from 'reflexbox';
import TorreSearchForm from '@/components/torre/searchForm';
import { DATA_PROVIDERS } from '@/constants/dataProvider';
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
                  title={<a href={`https://torre.bio/${item.person.publicId}`} rel='noopener noreferrer' target='_blank'>{item.person.name}</a>}
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
            <Card key={dataProvider} title={<span><Icon type={DATA_PROVIDERS[dataProvider].icon} /> {DATA_PROVIDERS[dataProvider].type} (by {DATA_PROVIDERS[dataProvider].title})</span>} style={{ marginBottom: 24 }}>
              <List
                dataSource={this.props.inspireMeRes[dataProvider]}
                itemLayout='horizontal'
                loading={this.props.inspireMeLoading}
                renderItem={(item) => this.renderItem(dataProvider, item)}
              />
            </Card>
          )}
        </Box>
      </Flex>
    );
  }

  renderItem(dataProvider, item) {
    switch (dataProvider) {
      case 'data-coursera-service':
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape='square' size='large' src={item.imageUrl} />}
              title={<a href={item.url} rel='noopener noreferrer' target='_blank'>{item.title}</a>}
              description={item.partnerName}
            />
          </List.Item>
        );
      case 'data-openlibrary-service':
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar className='data-openlibrary-service-avatar' shape='square' size='large' src={`https://covers.openlibrary.org/w/id/${item.cover_id}-L.jpg`} />}
              title={<a href={`https://openlibrary.org/${item.key}`} rel='noopener noreferrer' target='_blank'>{item.title}</a>}
              description={item.authors.map(a => a.name).join(', ')}
            />
          </List.Item>
        );
      case 'data-ted-service':
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape='square' size='large' src={item.thumbnail_url} />}
              title={<a href={item.talk_url} rel='noopener noreferrer' target='_blank'>{item.name}</a>}
              description={item.speaker}
            />
          </List.Item>
        );
      default:
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape='square' size='large' src={'https://picsum.photos/200'} />}
              title={<a href='#'>{item.title}</a>}
            />
          </List.Item>
        );
    }
  }

}

export default IndexPage;