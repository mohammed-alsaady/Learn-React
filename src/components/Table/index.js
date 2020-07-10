import React from 'react'
import Btn from '../Button'
import {sortBy} from 'lodash';
import Sort from './Sort'
const SORTS = {
  NONE : list => list ,
  TITLE : list => sortBy (list ,'title'),
  AUTHOR : list => sortBy (list ,'author') 
}
class Table extends React.Component{

    render () {
      const {hits ,sortKey,onSort, Pattern ,onDelete ,isSortReverse} = this.props ;
      const sortedList = SORTS[sortKey](hits);
      const reverseSortedList = isSortReverse 
      ?sortedList.reverse() 
      :sortedList
      const largeColumn = {
        width: '60%'
      }
      const midColumn ={
        width :'30%'
      }
      const smallColumn = {
        width: '10%'
      }
      return (
        <div className='table'>
          <div className="table-header">
            <span style={{largeColumn}}>
              <Sort
              sortKey ={"TITLE"}
              onSort ={onSort}>
                Title
              </Sort>
            </span>
            <span style={{midColumn}}>
              <Sort
              sortKey ={"AUTHOR"}
              onSort ={onSort}>
                Author
              </Sort>
             </span> 
            <span style={smallColumn}>
              Action
            </span>
           </div>
          {reverseSortedList.map (item =>
          <div key={item.objectID} className ='table-row'>
            <span style={largeColumn}>{item.title}</span>
            &nbsp; By : <span style={midColumn}>
              <a href={item.url} >{item.author}</a>
            </span>
            &nbsp; <span style={smallColumn}>
              <Btn onClick ={() => onDelete(item.objectID)} >
                Remove
              </Btn>
            </span>
          </div>
            )}
        </div>
      )
    }
    }
    export default Table