import React ,{Component} from 'react'
import Btn from '../Button'
const Sort = ({sortKey , onSort ,children}) =>
{
    return (
<btn onClick= {() => onSort(sortKey)}
className ="button-inline"
>
  {children}
</btn>
    )};
    export default Sort;