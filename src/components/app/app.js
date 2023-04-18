import { Component } from 'react';
import nextId from "react-id-generator";

import AppInfo from '../app-info/app-info';
import SearchPannel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                {name: "John C.", salary: 1500, increase: false, like: false,  id: nextId()},
                {name: "Alex B.", salary: 800, increase: false, like: false, id: nextId()},
                {name: "Jimm H.", salary: 3000, increase: false, like: false, id: nextId()}
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newEmployee = {
            name: name, 
            salary: salary, 
            increase: false,
            like: false, 
            id: nextId() 
        }

        this.setState(({data}) => {
            const newArray = [...data, newEmployee]
            return {
                data: newArray
            }
        })
    }

    onPropToggle = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }))
    }

    serchEmpl = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterEmpl = (items, name) => {
        switch (name) {
            case 'update':
                return items.filter(item => item.like === true)
            
            case 'more1000':
                return items.filter(item => item.salary > 1000)

            default:
                return items
        }
    }

    onUpdateFilter = (filter) => {
        this.setState({filter})
    }

    onUpdateSalary = (id, salary) => {
        salary = salary.substr(0, salary.length - 1);
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: salary}
                }
                return item
            })
        }))
    }

    render() {
        const {data, term, filter} = this.state; 
        const totalEmpl = this.state.data.length;
        const increaseEmpl = this.state.data.filter(item => item.increase === true).length;
        const isVisibleData = this.filterEmpl(this.serchEmpl(data, term ), filter);
        return (
            <div className="app">
                <AppInfo
                    totalEmpl={totalEmpl}
                    increaseEmpl={increaseEmpl}/>

                <div className="search-panel">
                    <SearchPannel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onUpdateFilter={this.onUpdateFilter}/>
                </div>
    
                <EmployeesList 
                    data={isVisibleData} 
                    onDelete={this.deleteItem}
                    onPropToggle={this.onPropToggle}
                    onUpdateSalary={this.onUpdateSalary}/>

                <EmployeesAddForm onAdd={this.addItem}/>
            </div>   
        )
    }

}

export default App;