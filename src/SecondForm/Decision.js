const Decision = ({setFilter, filter}) => {

    const Change = (event) => {
        setFilter(prev => !prev);
        event.currentTarget.classList.toggle('select');
        event.currentTarget.firstElementChild.classList.toggle('circle_select');
    }

    return(
        <>
            <div className='sort_choose' id={filter} onClick={event => {Change(event)}}>
                <div className='circle'/>
            </div>
        </>
    )
}

export {Decision}