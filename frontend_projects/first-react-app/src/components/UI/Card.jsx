const Card = (props) => {
    const classes = "bg-gray-200 " + props.className;
    return <div className={classes}>{props.children}</div>;
};

export default Card;
