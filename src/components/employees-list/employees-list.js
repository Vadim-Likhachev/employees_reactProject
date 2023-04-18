import EmployeeListItem from "../employees-list-item/employees-list-item"
import './employees-list.css'

const EmployeesList = ({data, onDelete, onPropToggle, onUpdateSalary}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item
        return (
            <EmployeeListItem 
                key={id} { ...itemProps}
                onDelete = {() => onDelete(id)}
                onPropToggle = {(e) => onPropToggle(id, e.currentTarget.getAttribute('data-toggle'))}
                onUpdateSalary = {e => onUpdateSalary(id, e.target.value)}/>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;