

const Date = props => {
    const date = new Date().toLocaleString();
    props.setNewDate(date);
}

export default Date;