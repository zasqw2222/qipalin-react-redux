import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, ActivityIndicator } from 'antd-mobile'
import {cutstr} from '../../utils/utils'
import fonts from '../../assets/font/font.css'
import styles from '../ArticlesListView/style.css'

export default class HomeListView extends Component {
  render() {
    console.log(this.props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(this.props.articles.list)
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
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
          <div className={styles['articles-row']}>
            <img src={rowData.thumbnail} alt="" />
            <div className={styles['right']}>
              <div className={styles['articles-title']}>
                {rowData.title.rendered}
              </div>
              <div className={styles.meta}>
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
      <div>
        <ActivityIndicator
          toast
          text="加载中..."
          animating={this.props.articles.isFetching}
        />
        <ListView
          dataSource={dataSource}
          initialListSize={6}
          renderFooter={fonter}
          renderRow={row}
          useBodyScroll
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
        />
      </div>
    )
  }
}

HomeListView.propTypes = {
  articles: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired
}
