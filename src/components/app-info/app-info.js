import './app-info.css'

const AppInfo = ({totalEmpl, increaseEmpl}) => {
    return (
        <div className="app-info">
            <h1>Учет Сотрудников в компании</h1>
            <h2>Общее число сотрудников: {totalEmpl}</h2>
            <h2>Сотрудники с премией: {increaseEmpl}</h2>
        </div>
    )
}

export default AppInfo;