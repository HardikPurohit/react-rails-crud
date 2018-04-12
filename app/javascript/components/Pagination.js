import React, { findDOMNode, Component, PropTypes } from 'react';

class Pagination extends Component {
  render() {
    const { current_page, total_pages, total_count } = this.props;

    var windowSize = 4;

    if (current_page > 1) {
      var firstPage = (
        <li className="first">
          <a href='#' rel='first' onClick={(e) => this.props.onPaginationClick(1, e)}>&laquo; First
            <span/>
          </a>
        </li>
      )
    } else {
      var firstPage = '';
    }

    if (!(current_page - 1) <= 0) {
      var previousPage = (
        <li className="previous">
          <a href='#' rel='previous' onClick={(e) => this.props.onPaginationClick(current_page - 1, e)}>&lsaquo; Prev
            <span/>
          </a>
        </li>
      )
    } else {
      var previousPage = '';
    }

    var pageWindow = [];
    var i = current_page - windowSize;

    while(i < current_page) {
      if (i >= 1) {
        pageWindow.push(i);
      }
      i++;
    }

    pageWindow.push(current_page);

    var i = current_page+1;
    while((i <= (current_page + windowSize)) && (i <= total_pages)) {
      pageWindow.push(i);
      i++;
    }

    if (current_page > windowSize + 1) {
      var leftEllipsis = <li><span className="page gap">&hellip;</span></li>
    } else {
      var leftEllipsis = ''
    }

    var currentWindow = [];

    pageWindow.map(function(page) {
      if (current_page == page) {
        var link = <li key={'page-' + page} className="active">
                    <span>
                      {page}{' '}
                      <span className="page sr-only" key={'page-' + page} />
                    </span>
                  </li>
      } else {
        var link = <li key={'page-' + page}>
                    <a href='#' onClick={(e) => this.props.onPaginationClick(page, e)}>{page}
                      <span className="page sr-only" key={'page-' + page} />
                    </a> {' '}
                  </li>
      }
      currentWindow.push(
        link
      )
    }, this)

    if (current_page + 1 <= total_pages) {
      var nextPage = (
        <li className="next">
          <a href='#' rel='next' onClick={(e) => this.props.onPaginationClick(current_page + 1, e)}>Next &rsaquo;
            <span>
              <span aria-hidden="true" />
            </span>
          </a>
        </li>
      )
    } else {
      var nextPage = '';
    }

    if (current_page != total_pages) {
      var lastPage = (
        <li className="last">
          <a href='#' rel='last' onClick={(e) => this.props.onPaginationClick(total_pages, e)}>Last &raquo;
            <span>
              <span aria-hidden="true" />
            </span>
          </a>
        </li>
      )
    } else {
      var lastPage = '';
    }

    if (current_page + windowSize < total_pages) {
      var rightEllipsis = <li><span className="page gap">&hellip;</span></li>
    } else {
      var rightEllipsis = ''
    }

    return (
      <ul className="pagination pull-right">
        {firstPage}
        {' '}
        {previousPage}
        {' '}
        {leftEllipsis}
        {' '}
        {currentWindow}
        {' '}
        {rightEllipsis}
        {' '}
        {nextPage}
        {' '}
        {lastPage}
      </ul>
    );
  }
}

export default Pagination;
