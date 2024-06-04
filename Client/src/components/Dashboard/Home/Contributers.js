const Todos = () => {
    return (
        <div className="order">
            <div className="head">
                <h3>Top 10 Contributers</h3>
            </div>
            <table>
                <thead>
                </thead>
                <tbody>
                    {['ravish@gmail.com', 'jack@gmai.com', 'john@gmail.com'].map(user => (
                        <tr key={user}>
                            <td>
                                <p>{user}</p>
                            </td>
                            <td className='count'>12</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Todos;
