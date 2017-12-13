import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, PullToRefresh } from 'antd-mobile'
import fonts from '../../assets/font/font.css'
import styles from './style.css'
import { cutstr } from '../../utils/utils'

export default class ArticlesListView extends Component {
  constructor(props) {
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached = event => {
    if (this.props.articles.isFetching && !this.props.articles.isLoadMore) {
      return
    }
    const page = this.props.articles.page + 1
    this.props.getArticles({ page: page })
  }

  onRefresh = () => {
    this.props.getArticles({ isRefreshing: true })
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.articles.list)
    const separator = (sectionID, rowID) => (
      <div
        key={rowID}
        style={{
          backgroundColor: '#F5F5F9',
          borderBottom: '1px solid #ECECED'
        }}
      />
    )
    const row = (rowData, sectionID, rowID) => {
      return (
        <div
          onClick={() => {
            this.props.navigateTo('/article/' + rowData.id)
          }}
          key={rowID}
          style={{ padding: '0 15px' }}
        >
          <div className={styles['articles__row']}>
            <img src={rowData.thumbnail} alt="" />
            <div className={styles['articles__row--right']}>
              <div className={styles['articles__row-title']}>
                {rowData.title.rendered}
              </div>
              <div className="meta">
                <span>{cutstr(rowData.date, 10, 1)}</span>
                <span
                  className={
                    fonts.iconfont + ' ' + fonts['icon-attention_light']
                  }
                >
                  {' '}
                  {rowData.pageviews}
                </span>
                <span
                  className={fonts.iconfont + ' ' + fonts['icon-comment_light']}
                >
                  {' '}
                  {rowData.total_comments}
                </span>
                <span
                  className={
                    fonts.iconfont + ' ' + fonts['icon-appreciate_light']
                  }
                >
                  {' '}
                  {rowData.like_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    }
    const fonter = () => {
      return (
        <div style={{ padding: 5, textAlign: 'center' }}>
          {this.props.articles.isFetching ? '' : '到底了'}
        </div>
      )
    }
    return (
      <ListView
        dataSource={dataSource}
        renderFooter={fonter}
        renderRow={row}
        renderSeparator={separator}
        initialListSize={10}
        pageSize={10}
        style={{
          height: '100%',
          overflow: 'auto'
        }}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={100}
        pullToRefresh={
          <PullToRefresh
            refreshing={this.props.articles.isRefreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    )
  }
}

ArticlesListView.propTypes = {
  articles: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired
}
