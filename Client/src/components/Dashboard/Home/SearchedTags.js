const Orders = () => {
    return (
        <div className="order">
            <div className="head">
                <h3>Top 10 Searched Tags</h3>
            </div>
            <table>
                <tbody>
                    {['Manual Transmission', 'PhP Array', 'Scope Of Work'].map(user => (
                        <tr key={user}>
                            <td>
                                <p>{user}</p>
                            </td>
                            <td className='count'>21</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
